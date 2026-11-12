# FormatieLab - actuele fracties van de Tweede Kamer ophalen
#
# Leest de actieve fracties met hun zetelaantal uit de open data van de Tweede Kamer en schrijft
# tweedekamer.js. Dat bestand werkt in de app het scenario "Huidige Tweede Kamer" bij, inclusief
# afsplitsingen en eenmansfracties.
#
# Gebruik: powershell -ExecutionPolicy Bypass -File .\tweedekamer-ophalen.ps1
# Bron: https://opendata.tweedekamer.nl

param(
  [string]$Uitvoer = (Join-Path $PSScriptRoot 'tweedekamer.js')
)

$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$url = 'https://gegevensmagazijn.tweedekamer.nl/OData/v4/2.0/Fractie?' +
       '$filter=' + [Uri]::EscapeDataString('DatumInactief eq null and Verwijderd eq false') +
       '&$select=Afkorting,NaamNL,AantalZetels'
Write-Host 'Tweede Kamer ophalen...'
$antwoord = Invoke-RestMethod -Uri $url -Headers @{ 'User-Agent' = 'formatielab/1.0' }

# Fractienamen in de open data -> partij-ids in de app (data.js).
$naarId = @{ 'ChristenUnie' = 'CU'; 'FVD' = 'FvD'; 'Groep Markuszower' = 'DNA'; 'GroenLinks-PvdA' = 'PRO' }

$zetels = [ordered]@{}
$extra = [ordered]@{}
foreach ($f in ($antwoord.value | Where-Object { $_.AantalZetels -gt 0 } | Sort-Object AantalZetels -Descending)) {
  $naam = [string]$f.Afkorting
  $id = if ($naarId.ContainsKey($naam)) { $naarId[$naam] } else { $naam }
  $zetels[$id] = [int]$f.AantalZetels
  if ($naam -like 'Lid *') { $extra[$id] = @{ kort = ($naam -replace '^Lid ', ''); naam = [string]$f.NaamNL } }
}

$som = ($zetels.Values | Measure-Object -Sum).Sum
if ($som -ne 150) { throw "Totaal is $som in plaats van 150; niets weggeschreven." }

$nu = (Get-Date).ToString('yyyy-MM-dd')
$zetelsJs = ($zetels.Keys | ForEach-Object { "'$_': $($zetels[$_])" }) -join ', '
$extraJs = ($extra.Keys | ForEach-Object {
  "    '$_': { kort: '$($extra[$_].kort)', naam: '$($extra[$_].naam) (eenmansfractie, afgesplitst)', kleur: '#9a9a9a', volgorde: 999, zelfdeAls: ['$($extra[$_].kort)'] }"
}) -join ",`n"

$inhoud = @"
// FormatieLab - actuele fracties van de Tweede Kamer
// AUTOMATISCH GEMAAKT door tweedekamer-ophalen.ps1 op $nu. Niet met de hand aanpassen.
// Bron: open data van de Tweede Kamer (https://opendata.tweedekamer.nl)
(function () {
  var eenmansfracties = {
$extraJs
  };
  window.PARTIJEN = window.PARTIJEN || {};
  Object.keys(eenmansfracties).forEach(function (id) {
    if (!window.PARTIJEN[id]) window.PARTIJEN[id] = eenmansfracties[id];
  });
  var nu = {
    id: 'kamer-nu',
    titel: 'Huidige Tweede Kamer - fracties volgens de Tweede Kamer ($nu)',
    bron: 'https://www.tweedekamer.nl/kamerleden_en_commissies/fracties',
    datum: '$nu',
    zetels: { $zetelsJs }
  };
  var lijst = window.SCENARIOS || [];
  var i = lijst.findIndex(function (s) { return s.id === nu.id; });
  if (i >= 0) lijst[i] = nu; else lijst.push(nu);
  window.SCENARIOS = lijst;
  window.ACTUALITEIT = window.ACTUALITEIT || {};
  window.ACTUALITEIT.tweedekamer = { datum: '$nu', opgehaald: '$nu' };
})();
"@
[IO.File]::WriteAllText($Uitvoer, $inhoud, (New-Object System.Text.UTF8Encoding($false)))
Write-Host "Klaar: $($zetels.Count) fracties, $som zetels -> $Uitvoer"
