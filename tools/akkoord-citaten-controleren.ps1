# FormatieLab - controleer of elk citaat in akkoord-citaten.js letterlijk op de genoemde pagina
# van het akkoord staat. Haalt de akkoorden zo nodig zelf op (naar tools/akkoorden/, niet in git).
#
# Gebruik (in de map tools): powershell -ExecutionPolicy Bypass -File .\akkoord-citaten-controleren.ps1
# Nodig: pdftotext (zit bij Git for Windows).

$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [Text.Encoding]::UTF8
$app = Split-Path $PSScriptRoot -Parent
$map = Join-Path $PSScriptRoot 'akkoorden'
New-Item -ItemType Directory -Force $map | Out-Null
$pdftotext = 'C:\Program Files\Git\mingw64\bin\pdftotext.exe'
if (-not (Test-Path $pdftotext)) { $pdftotext = 'pdftotext' }

# Welk document hoort bij welk kabinet (zelfde als AK in kabinetten.js).
$docs = @{ jetten = 'blg-1233855.pdf'; schoof = 'blg-1143003.pdf'; rutte4 = 'blg-1009826.pdf'; rutte3 = 'blg-820240.pdf';
           rutte2 = 'kst-33410-15.pdf'; rutte1 = 'kst-32417-15.pdf'; balkenende4 = 'kst-30891-4.pdf';
           balkenende2 = 'kst-28637-19.pdf'; balkenende1 = 'kst-28375-5.pdf' }
foreach ($k in $docs.Keys) {
  $txt = Join-Path $map "$k.txt"
  if (-not (Test-Path $txt)) {
    $pdf = Join-Path $map "$k.pdf"
    Invoke-WebRequest -Uri "https://zoek.officielebekendmakingen.nl/$($docs[$k])" -OutFile $pdf -UseBasicParsing -Headers @{ 'User-Agent' = 'formatielab/1.0' }
    & $pdftotext -enc UTF-8 $pdf $txt
  }
}

$enkel = '[' + [char]0x2018 + [char]0x2019 + '`]'
function Norm($s) { return ((($s -replace $enkel, "'") -replace '\s+', ' ').ToLower().Trim()) -replace '- ', '' }

$js = [IO.File]::ReadAllText((Join-Path $app 'akkoord-citaten.js'), [Text.Encoding]::UTF8)
$kabinet = $null; $ok = 0; $fout = 0
foreach ($regel in $js -split "`n") {
  if ($regel -match '^\s{2}([a-z0-9]+): \{\s*$') { $kabinet = $Matches[1]; continue }
  if ($regel -match "^\s+([a-z]+):\s+\{ p: (\d+),\s+c: '(.*)' \}") {
    $thema = $Matches[1]; $p = [int]$Matches[2]; $c = $Matches[3] -replace "\\'", "'"
    $pags = [IO.File]::ReadAllText((Join-Path $map "$kabinet.txt"), [Text.Encoding]::UTF8).Split([char]12)
    if ((Norm $pags[$p - 1]).Contains((Norm $c))) { $ok++ }
    else {
      $elders = @(); for ($i = 0; $i -lt $pags.Length; $i++) { if ((Norm $pags[$i]).Contains((Norm $c))) { $elders += ($i + 1) } }
      "FOUT  $kabinet/$thema p$p (wel op: $($elders -join ','))  ->  $c"; $fout++
    }
  }
}
"OK: $ok, fout: $fout"
