# Formatielab - nieuwste Peilingwijzer ophalen
#
# Downloadt het cijferbestand van de Peilingwijzer (Tom Louwerse) en schrijft peilingen.js.
# Dat bestand voegt in de app automatisch een scenario "Peilingwijzer (nieuwste)" toe, met marges.
#
# Gebruik: powershell -ExecutionPolicy Bypass -File .\peilingen-ophalen.ps1
# Bron: https://peilingwijzer.tomlouwerse.nl/

param(
  [string]$Uitvoer = (Join-Path $PSScriptRoot 'peilingen.js')
)

$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Add-Type -AssemblyName System.IO.Compression.FileSystem

$bron = 'https://peilingwijzer.tomlouwerse.nl/resources/Cijfers_Peilingwijzer.xlsx'
$tijdelijk = Join-Path ([IO.Path]::GetTempPath()) ('peilingwijzer-' + [Guid]::NewGuid().ToString('N') + '.xlsx')
Write-Host 'Peilingwijzer ophalen...'
Invoke-WebRequest -Uri $bron -OutFile $tijdelijk -UseBasicParsing -Headers @{ 'User-Agent' = 'formatielab/1.0' }

# Een .xlsx is een zip-bestand; de cijfers staan in xl/worksheets/sheet1.xml.
$zip = [IO.Compression.ZipFile]::OpenRead($tijdelijk)
try {
  $entry = $zip.GetEntry('xl/worksheets/sheet1.xml')
  $lezer = New-Object IO.StreamReader($entry.Open())
  [xml]$blad = $lezer.ReadToEnd()
  $lezer.Close()
} finally {
  $zip.Dispose()
  Remove-Item $tijdelijk -ErrorAction SilentlyContinue
}

$ns = New-Object Xml.XmlNamespaceManager($blad.NameTable)
$ns.AddNamespace('m', 'http://schemas.openxmlformats.org/spreadsheetml/2006/main')

function Celwaarde($cel) {
  if ($cel.t -eq 'inlineStr') { return $cel.SelectSingleNode('m:is/m:t', $ns).InnerText }
  $v = $cel.SelectSingleNode('m:v', $ns)
  if ($v) { return $v.InnerText }
  return ''
}

# Partijnamen in de Peilingwijzer -> partij-ids in de app (data.js).
$naarId = @{ 'Denk' = 'DENK'; 'ChristenUnie' = 'CU'; 'GroenLinks-PvdA' = 'PRO'; 'GL-PvdA' = 'PRO'; 'Forum voor Democratie' = 'FvD' }

$zetels = [ordered]@{}
$marge = [ordered]@{}
$veldwerk = ''; $update = ''
$rijen = $blad.SelectNodes('//m:sheetData/m:row', $ns)
foreach ($rij in $rijen) {
  if ($rij.r -eq '1') { continue }
  $cellen = @{}
  foreach ($c in $rij.SelectNodes('m:c', $ns)) { $cellen[($c.r -replace '\d', '')] = Celwaarde $c }
  $partij = $cellen['A']
  if (-not $partij) { continue }
  if ($naarId.ContainsKey($partij)) { $partij = $naarId[$partij] }
  $veldwerk = $cellen['B']; $update = $cellen['C']
  $zetels[$partij] = [int][double]::Parse($cellen['G'], [Globalization.CultureInfo]::InvariantCulture)
  $marge[$partij] = @(
    [int][double]::Parse($cellen['H'], [Globalization.CultureInfo]::InvariantCulture),
    [int][double]::Parse($cellen['I'], [Globalization.CultureInfo]::InvariantCulture))
}
if ($zetels.Count -lt 5) { throw "Te weinig partijen gevonden ($($zetels.Count)); is het bestandsformaat veranderd?" }

# dd-mm-jjjj -> jjjj-mm-dd
function Iso($d) { $p = $d.Split('-'); return "$($p[2])-$($p[1])-$($p[0])" }
$updateIso = Iso $update
$som = ($zetels.Values | Measure-Object -Sum).Sum

$zetelsJs = ($zetels.Keys | ForEach-Object { "'$_': $($zetels[$_])" }) -join ', '
$margeJs = ($marge.Keys | ForEach-Object { "'$_': [$($marge[$_][0]), $($marge[$_][1])]" }) -join ', '
$nu = (Get-Date).ToString('yyyy-MM-dd')

$inhoud = @"
// Formatielab - nieuwste Peilingwijzer
// AUTOMATISCH GEMAAKT door peilingen-ophalen.ps1 op $nu. Niet met de hand aanpassen.
// Bron: https://peilingwijzer.tomlouwerse.nl/ (cijferbestand $bron)
(function () {
  var scenario = {
    id: 'peilingwijzer-nieuwste',
    auto: true,
    titel: 'Peilingwijzer - nieuwste ($update, veldwerk t/m $veldwerk)',
    bron: 'https://peilingwijzer.tomlouwerse.nl/',
    datum: '$updateIso',
    zetels: { $zetelsJs },
    marge: { $margeJs }
  };
  window.SCENARIOS = [scenario].concat((window.SCENARIOS || []).filter(function (s) { return s.id !== scenario.id; }));
  window.ACTUALITEIT = window.ACTUALITEIT || {};
  window.ACTUALITEIT.peilingwijzer = { datum: '$updateIso', opgehaald: '$nu' };
})();
"@
[IO.File]::WriteAllText($Uitvoer, $inhoud, (New-Object System.Text.UTF8Encoding($false)))
Write-Host "Klaar: Peilingwijzer van $update, $($zetels.Count) partijen, $som zetels -> $Uitvoer"
