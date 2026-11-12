# Formatielab - controleer of elk citaat in standpunten.js letterlijk op de genoemde pagina staat.
# Gebruik (in de map tools): .\citaten-controleren.ps1 -Map .\programmas -Bestand ..\standpunten.js
param([string]$Map, [string]$Bestand)
[Console]::OutputEncoding = [Text.Encoding]::UTF8
$js = [IO.File]::ReadAllText($Bestand, [Text.Encoding]::UTF8)
$re = New-Object Text.RegularExpressions.Regex("'([A-Za-z0-9-]+)':\s*\[[^\]]*?\{ p: (\d+), c: '(.*?)' \}\]")
$enkel = '[' + [char]0x2018 + [char]0x2019 + '`]'
$dubbel = '[' + [char]0x201C + [char]0x201D + ']'
function Norm($s) { return ((($s -replace $enkel, "'") -replace $dubbel, '"') -replace '\s+', ' ').ToLower().Trim() }
$cache = @{}
foreach ($m in $re.Matches($js)) {
  $partij = $m.Groups[1].Value; $pag = [int]$m.Groups[2].Value; $cit = $m.Groups[3].Value -replace "\\'", "'"
  $f = Join-Path $Map "$partij.txt"
  if (-not (Test-Path $f)) { "GEEN BESTAND  $partij"; continue }
  if (-not $cache[$partij]) { $cache[$partij] = [IO.File]::ReadAllText($f, [Text.Encoding]::UTF8).Split([char]12) }
  $pags = $cache[$partij]
  $c = Norm $cit
  $op = (Norm $pags[$pag - 1]) -replace '- ', ''
  if ($op.Contains($c)) { "OK      $partij p$pag" }
  else {
    $gevonden = @()
    for ($i = 0; $i -lt $pags.Length; $i++) { if (((Norm $pags[$i]) -replace '- ', '').Contains($c)) { $gevonden += ($i + 1) } }
    "FOUT    $partij p$pag  (wel gevonden op: $($gevonden -join ','))  ->  $cit"
  }
}
