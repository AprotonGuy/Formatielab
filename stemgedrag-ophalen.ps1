# Formatielab - echt stemgedrag ophalen uit de open data van de Tweede Kamer
#
# Haalt alle stemmingen (moties, amendementen, wetsvoorstellen) op sinds een datum en schrijft
# ze compact weg naar stemgedrag.js. De app rekent daar zelf mee (eensgezindheid per thema enz.).
#
# Gebruik (in PowerShell, in de map van de app):
#   powershell -ExecutionPolicy Bypass -File .\stemgedrag-ophalen.ps1
#   powershell -ExecutionPolicy Bypass -File .\stemgedrag-ophalen.ps1 -Vanaf 2025-11-12
#
# Bron: https://opendata.tweedekamer.nl (OData API van het Gegevensmagazijn, vrij te gebruiken).

param(
  # Standaard: vanaf de installatie van de huidige Tweede Kamer (12 november 2025).
  [string]$Vanaf = '2025-11-12',
  [string]$Uitvoer = (Join-Path $PSScriptRoot 'stemgedrag.js')
)

$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$basis = 'https://gegevensmagazijn.tweedekamer.nl/OData/v4/2.0/Besluit'
$filter = "Verwijderd eq false and StemmingsSoort ne null and Agendapunt/Activiteit/Datum ge ${Vanaf}T00:00:00Z"
$expand = 'Stemming($select=Soort,ActorFractie,FractieGrootte,Vergissing,Verwijderd,Persoon_Id),' +
          'Zaak($select=Nummer,Soort,Titel,Onderwerp),' +
          'Agendapunt($select=Id;$expand=Activiteit($select=Datum))'
$url = $basis + '?$filter=' + [Uri]::EscapeDataString($filter) +
       '&$select=Id,BesluitSoort,StemmingsSoort&$expand=' + [Uri]::EscapeDataString($expand)

# Fractienamen in de open data -> partij-ids in de app (data.js).
$fractieNaarId = @{
  'ChristenUnie' = 'CU'; 'FVD' = 'FvD'; 'Groep Markuszower' = 'DNA';
  'GroenLinks-PvdA' = 'PRO'; 'PRO' = 'PRO'
}

$besluiten = New-Object System.Collections.ArrayList
$pagina = 0
while ($url) {
  $pagina++
  Write-Host "Pagina $pagina ophalen..."
  $antwoord = Invoke-RestMethod -Uri $url -Headers @{ 'User-Agent' = 'formatielab/1.0' }
  foreach ($b in $antwoord.value) { [void]$besluiten.Add($b) }
  $url = $antwoord.'@odata.nextLink'
}
Write-Host "$($besluiten.Count) besluiten opgehaald."

$fracties = New-Object System.Collections.ArrayList
$titels = New-Object System.Collections.ArrayList
$titelIndex = @{}
$rijen = New-Object System.Collections.ArrayList

foreach ($b in $besluiten) {
  $uitslag = $null
  if ($b.BesluitSoort -match 'aangenomen') { $uitslag = 1 } elseif ($b.BesluitSoort -match 'verworpen') { $uitslag = 0 }
  if ($null -eq $uitslag -or -not $b.Zaak -or -not $b.Stemming) { continue }
  $zaak = @($b.Zaak)[0]
  $datum = ''
  if ($b.Agendapunt -and $b.Agendapunt.Activiteit) { $datum = ([string]$b.Agendapunt.Activiteit.Datum).Substring(0, 10) }

  # Stem per fractie. Bij hoofdelijke stemmingen (per persoon) telt de meerderheid van de fractie.
  $stem = @{}
  $perPersoon = @{}
  foreach ($s in $b.Stemming) {
    if ($s.Verwijderd -or $s.Vergissing -or -not $s.ActorFractie) { continue }
    if ($s.Soort -ne 'Voor' -and $s.Soort -ne 'Tegen') { continue }
    $f = [string]$s.ActorFractie
    if ($fractieNaarId.ContainsKey($f)) { $f = $fractieNaarId[$f] }
    if ($s.Persoon_Id) {
      if (-not $perPersoon.ContainsKey($f)) { $perPersoon[$f] = @{ V = 0; T = 0 } }
      if ($s.Soort -eq 'Voor') { $perPersoon[$f].V++ } else { $perPersoon[$f].T++ }
    } else {
      $stem[$f] = if ($s.Soort -eq 'Voor') { 'V' } else { 'T' }
    }
  }
  foreach ($f in $perPersoon.Keys) {
    $p = $perPersoon[$f]
    if ($p.V -gt $p.T) { $stem[$f] = 'V' } elseif ($p.T -gt $p.V) { $stem[$f] = 'T' }
  }
  if ($stem.Count -lt 2) { continue }
  foreach ($f in $stem.Keys) { if (-not $fracties.Contains($f)) { [void]$fracties.Add($f) } }

  $titel = [string]$zaak.Titel
  if (-not $titelIndex.ContainsKey($titel)) { $titelIndex[$titel] = $titels.Count; [void]$titels.Add($titel) }
  $soort = switch ([string]$zaak.Soort) { 'Motie' { 'M' } 'Amendement' { 'A' } 'Wetgeving' { 'W' } default { 'O' } }
  [void]$rijen.Add([pscustomobject]@{ d = $datum; s = $soort; u = $uitslag; t = $titelIndex[$titel];
    o = [string]$zaak.Onderwerp; n = [string]$zaak.Nummer; stem = $stem })
}

# Stemmen als tekst: één teken per fractie (V = voor, T = tegen, . = niet gestemd / geen fractie).
$fracties = @($fracties | Sort-Object)
$rijen = @($rijen | Sort-Object d -Descending)
$regels = foreach ($r in $rijen) {
  $v = -join ($fracties | ForEach-Object { if ($r.stem.ContainsKey($_)) { $r.stem[$_] } else { '.' } })
  $o = $r.o; if ($o.Length -gt 220) { $o = $o.Substring(0, 217) + '...' }
  '[' + (@($r.d, $r.s, $r.u, $r.t, $o, $r.n, $v) | ConvertTo-Json -Compress -Depth 2).Trim('[', ']') + ']'
}

$nu = (Get-Date).ToString('yyyy-MM-dd')
$inhoud = @"
// Formatielab - echt stemgedrag in de Tweede Kamer
// AUTOMATISCH GEMAAKT door stemgedrag-ophalen.ps1 op $nu. Niet met de hand aanpassen;
// draai het script opnieuw om bij te werken.
// Bron: open data van de Tweede Kamer (https://opendata.tweedekamer.nl).
// Per stemming: [datum, soort (M=motie, A=amendement, W=wet, O=overig), aangenomen (1/0),
//                titelnummer (zie titels), onderwerp, zaaknummer, stemmen per fractie (V/T/.)]
window.STEMGEDRAG = {
  opgehaald: '$nu',
  vanaf: '$Vanaf',
  fracties: $(ConvertTo-Json @($fracties) -Compress),
  titels: $(ConvertTo-Json @($titels) -Compress),
  stemmingen: [
$($regels -join ",`n")
  ]
};
"@
[IO.File]::WriteAllText($Uitvoer, $inhoud, (New-Object System.Text.UTF8Encoding($false)))
Write-Host "Klaar: $($rijen.Count) stemmingen, $($fracties.Count) fracties -> $Uitvoer"
