# Formatielab - zoek per partij de passages die het best bij een thema passen (met paginanummer).
# Gebruik (in de map tools): .\fragmenten-zoeken.ps1 -Map .\programmas -Patroon 'asiel|migratie' -Aantal 3
param([string]$Map, [string]$Patroon, [int]$Aantal = 3, [int]$Lengte = 520, [string]$Partijen = '')
$ErrorActionPreference = 'Stop'
$re = New-Object Text.RegularExpressions.Regex($Patroon, 'IgnoreCase')
$bestanden = Get-ChildItem (Join-Path $Map '*.txt') | Where-Object { $_.Name -ne 'lijst.txt' }
if ($Partijen) { $sel = $Partijen.Split(','); $bestanden = $bestanden | Where-Object { $sel -contains $_.BaseName } }
foreach ($b in $bestanden) {
  $tekst = [IO.File]::ReadAllText($b.FullName, [Text.Encoding]::UTF8)
  $paginas = $tekst.Split([char]12)
  $kand = @()
  for ($i = 0; $i -lt $paginas.Length; $i++) {
    $alineas = [Text.RegularExpressions.Regex]::Split($paginas[$i], '\r?\n\s*\r?\n')
    foreach ($a in $alineas) {
      $schoon = ($a -replace '\s+', ' ').Trim()
      if ($schoon.Length -lt 60) { continue }
      $n = $re.Matches($schoon).Count
      if ($n -gt 0) { $kand += [pscustomobject]@{ p = $i + 1; n = $n; t = $schoon } }
    }
  }
  "===== $($b.BaseName) ($($kand.Count) treffers)"
  $kand | Sort-Object n -Descending | Select-Object -First $Aantal | ForEach-Object {
    $t = $_.t; if ($t.Length -gt $Lengte) { $t = $t.Substring(0, $Lengte) + '...' }
    "[p$($_.p)] $t"
  }
}
