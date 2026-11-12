# FormatieLab - actuele fracties van de Eerste Kamer ophalen
#
# Leest https://www.eerstekamer.nl/fracties en schrijft eerstekamer.js. Dat bestand vervangt in de app
# de (handmatige) Eerste Kamer-cijfers uit data.js. Eenmansfracties na een afsplitsing tellen mee in het
# totaal van 75, maar kunnen niet in een coalitie.
#
# Gebruik: powershell -ExecutionPolicy Bypass -File .\eerstekamer-ophalen.ps1

param(
  [string]$Uitvoer = (Join-Path $PSScriptRoot 'eerstekamer.js')
)

$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$bron = 'https://www.eerstekamer.nl/fracties'
Write-Host 'Eerste Kamer ophalen...'
$html = (Invoke-WebRequest -Uri $bron -UseBasicParsing -Headers @{ 'User-Agent' = 'formatielab/1.0' }).Content

# Fractienamen op eerstekamer.nl -> partij-ids in de app (data.js).
$naarId = @{ 'ChristenUnie' = 'CU'; 'FVD' = 'FvD'; 'GroenLinks-PvdA' = 'PRO' }

$zetels = [ordered]@{}
$extra = [ordered]@{}
# Elke fractie staat als link: ...>NAAM (N zetels)</a>
foreach ($m in [regex]::Matches($html, '>\s*([^<>]{1,60}?) \((\d+) zetels?\)\s*</a>')) {
  $naam = [Net.WebUtility]::HtmlDecode($m.Groups[1].Value).Trim()
  $id = if ($naarId.ContainsKey($naam)) { $naarId[$naam] } else { $naam }
  if ($zetels.Contains($id)) { continue }
  $zetels[$id] = [int]$m.Groups[2].Value
  if ($id -like 'Fractie-*') { $extra[$id] = $id -replace '^Fractie-', '' }
}

$som = ($zetels.Values | Measure-Object -Sum).Sum
if ($som -ne 75) { throw "Totaal is $som in plaats van 75; is de pagina veranderd? Niets weggeschreven." }

$nu = (Get-Date).ToString('yyyy-MM-dd')
$zetelsJs = ($zetels.Keys | ForEach-Object { "'$_': $($zetels[$_])" }) -join ', '
$extraJs = ($extra.Keys | ForEach-Object {
  "    '$_': { kort: '$($extra[$_])', naam: '$_ (eenmansfractie in de Eerste Kamer, afgesplitst)', kleur: '#9a9a9a', volgorde: 999 }"
}) -join ",`n"

$inhoud = @"
// FormatieLab - actuele fracties van de Eerste Kamer
// AUTOMATISCH GEMAAKT door eerstekamer-ophalen.ps1 op $nu. Niet met de hand aanpassen.
// Bron: $bron
(function () {
  var eenmansfracties = {
$extraJs
  };
  window.PARTIJEN = window.PARTIJEN || {};
  Object.keys(eenmansfracties).forEach(function (id) {
    if (!window.PARTIJEN[id]) window.PARTIJEN[id] = eenmansfracties[id];
  });
  window.EERSTE_KAMER = {
    titel: 'Eerste Kamer - fracties volgens eerstekamer.nl ($nu)',
    bron: '$bron',
    datum: '$nu',
    zetels: { $zetelsJs }
  };
  window.ACTUALITEIT = window.ACTUALITEIT || {};
  window.ACTUALITEIT.eerstekamer = { datum: '$nu', opgehaald: '$nu' };
})();
"@
[IO.File]::WriteAllText($Uitvoer, $inhoud, (New-Object System.Text.UTF8Encoding($false)))
Write-Host "Klaar: $($zetels.Count) fracties, $som zetels -> $Uitvoer"
