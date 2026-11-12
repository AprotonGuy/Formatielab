# Formatielab - alle automatische gegevens in één keer bijwerken
#
# Gebruik: powershell -ExecutionPolicy Bypass -File .\bijwerken.ps1
# Werkt bij: peilingen.js (Peilingwijzer) en stemgedrag.js (stemmingen Tweede Kamer).
# Niet automatisch: Peil.nl-peiling, standpunten, urgentie en eerdere kabinetten (data.js,
# standpunten.js, kabinetten.js); die vragen menselijke controle.

$ErrorActionPreference = 'Continue'
$fouten = 0
foreach ($script in @('peilingen-ophalen.ps1', 'stemgedrag-ophalen.ps1')) {
  Write-Host "=== $script ==="
  try {
    & (Join-Path $PSScriptRoot $script)
  } catch {
    Write-Warning "$script mislukt: $($_.Exception.Message)"
    $fouten++
  }
}
if ($fouten) { Write-Warning "$fouten onderdeel/onderdelen mislukt; de oude gegevens blijven dan staan."; exit 1 }
Write-Host 'Alles bijgewerkt.'
