# Formatielab - verkiezingsprogramma's 2025 ophalen en omzetten naar tekst
#
# Downloadt de definitieve programma's (archief DNPP, Rijksuniversiteit Groningen; zie programmas.txt)
# naar tools/programmas/ en maakt er per partij een .txt van (pagina's gescheiden door een form feed),
# zodat je kunt zoeken en citaten kunt controleren. De map tools/programmas/ staat niet in git.
#
# Nodig: pdftotext (zit bij Git for Windows: C:\Program Files\Git\mingw64\bin\pdftotext.exe).
#
# Daarna:
#   Passages zoeken:   .\fragmenten-zoeken.ps1 -Map .\programmas -Patroon 'asiel|migratie'
#   Citaten checken:   .\citaten-controleren.ps1 -Map .\programmas -Bestand ..\standpunten.js

$ErrorActionPreference = 'Stop'
$map = Join-Path $PSScriptRoot 'programmas'
New-Item -ItemType Directory -Force $map | Out-Null
$pdftotext = 'C:\Program Files\Git\mingw64\bin\pdftotext.exe'
if (-not (Test-Path $pdftotext)) { $pdftotext = 'pdftotext' }

foreach ($regel in Get-Content (Join-Path $PSScriptRoot 'programmas.txt')) {
  if (-not $regel.Trim()) { continue }
  $partij, $url = $regel.Split('|', 2)
  $pdf = Join-Path $map "$partij.pdf"
  if (-not (Test-Path $pdf)) {
    Write-Host "Ophalen: $partij"
    Invoke-WebRequest -Uri $url -OutFile $pdf -UseBasicParsing -Headers @{ 'User-Agent' = 'formatielab/1.0' }
  }
  & $pdftotext -enc UTF-8 $pdf (Join-Path $map "$partij.txt")
}
Write-Host "Klaar: programma's staan in $map"
