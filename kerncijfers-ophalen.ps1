# FormatieLab - officiële kerncijfers over Nederland per jaar ophalen (CBS en Eurostat)
#
# Schrijft kerncijfers.js. De app toont per kabinet hoe deze cijfers zich tijdens de kabinetsperiode
# ontwikkelden ("Effect op Nederland"). Alleen officiële statistiekbureaus, geen Wikipedia.
#
# Gebruik: powershell -ExecutionPolicy Bypass -File .\kerncijfers-ophalen.ps1

param(
  [string]$Uitvoer = (Join-Path $PSScriptRoot 'kerncijfers.js'),
  [int]$VanafJaar = 2001
)

$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$kop = @{ 'User-Agent' = 'formatielab/1.0' }

# Eurostat: jaarreeks voor Nederland uit een dataset met vaste filters.
function Eurostat($dataset, $filters) {
  $url = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/$dataset" +
         "?geo=NL&$filters&sinceTimePeriod=$VanafJaar&format=JSON&lang=EN"
  $j = Invoke-RestMethod -Uri $url -Headers $kop
  $reeks = [ordered]@{}
  foreach ($p in $j.dimension.time.category.index.PSObject.Properties) {
    $v = $j.value.($p.Value.ToString())
    if ($null -ne $v) { $reeks[$p.Name] = [double]$v }
  }
  return $reeks
}

# CBS StatLine (OData): jaarreeks uit een tabel, met een filter op de dimensies.
function Cbs($tabel, $filter, $kolom, $factor = 1) {
  $url = "https://opendata.cbs.nl/ODataApi/odata/$tabel/TypedDataSet?`$format=json&`$select=Perioden,$kolom&`$filter=" +
         [Uri]::EscapeDataString($filter)
  $j = Invoke-RestMethod -Uri $url -Headers $kop
  $reeks = [ordered]@{}
  foreach ($r in $j.value) {
    if ($r.Perioden -match '^(\d{4})JJ00$' -and [int]$Matches[1] -ge $VanafJaar -and $null -ne $r.$kolom) {
      $reeks[$Matches[1]] = [double]$r.$kolom * $factor
    }
  }
  return $reeks
}

$indicatoren = @(
  @{ id = 'groei'; naam = 'Economische groei'; eenheid = '%'; decimalen = 1; beter = 'hoog'
     bron = 'Eurostat (nama_10_gdp)'; url = 'https://ec.europa.eu/eurostat/databrowser/view/nama_10_gdp/default/table'
     uitleg = 'Groei van het bruto binnenlands product (volume) ten opzichte van het jaar ervoor.'
     reeks = { Eurostat 'nama_10_gdp' 'unit=CLV_PCH_PRE&na_item=B1GQ' } },
  @{ id = 'werkloosheid'; naam = 'Werkloosheid'; eenheid = '%'; decimalen = 1; beter = 'laag'
     bron = 'Eurostat (une_rt_a)'; url = 'https://ec.europa.eu/eurostat/databrowser/view/une_rt_a/default/table'
     uitleg = 'Werklozen als percentage van de beroepsbevolking (15-74 jaar).'
     reeks = { Eurostat 'une_rt_a' 'age=Y15-74&unit=PC_ACT&sex=T' } },
  @{ id = 'inflatie'; naam = 'Inflatie'; eenheid = '%'; decimalen = 1; beter = $null
     bron = 'Eurostat (prc_hicp_aind)'; url = 'https://ec.europa.eu/eurostat/databrowser/view/prc_hicp_aind/default/table'
     uitleg = 'Gemiddelde prijsstijging (HICP) ten opzichte van het jaar ervoor.'
     reeks = { Eurostat 'prc_hicp_aind' 'unit=RCH_A_AVG&coicop=CP00' } },
  @{ id = 'schuld'; naam = 'Staatsschuld'; eenheid = '% bbp'; decimalen = 1; beter = 'laag'
     bron = 'Eurostat (gov_10dd_edpt1)'; url = 'https://ec.europa.eu/eurostat/databrowser/view/gov_10dd_edpt1/default/table'
     uitleg = 'Schuld van de overheid (EMU-schuld) als percentage van het bbp.'
     reeks = { Eurostat 'gov_10dd_edpt1' 'unit=PC_GDP&sector=S13&na_item=GD' } },
  @{ id = 'saldo'; naam = 'Begrotingssaldo'; eenheid = '% bbp'; decimalen = 1; beter = 'hoog'
     bron = 'Eurostat (gov_10dd_edpt1)'; url = 'https://ec.europa.eu/eurostat/databrowser/view/gov_10dd_edpt1/default/table'
     uitleg = 'Overschot (+) of tekort (-) van de overheid (EMU-saldo) als percentage van het bbp.'
     reeks = { Eurostat 'gov_10dd_edpt1' 'unit=PC_GDP&sector=S13&na_item=B9' } },
  @{ id = 'asiel'; naam = 'Asielverzoeken en nareizigers'; eenheid = 'personen'; decimalen = 0; beter = $null
     bron = 'CBS StatLine (80059ned)'; url = 'https://opendata.cbs.nl/statline/#/CBS/nl/dataset/80059ned/table'
     uitleg = 'Totaal aantal asielverzoeken (eerste en volgende) plus nareizigers per jaar.'
     reeks = { Cbs '80059ned' "Nationaliteit eq 'T001059  '" 'TotaalAsielverzoekenEnNareizigers_1' } },
  @{ id = 'nieuwbouw'; naam = 'Nieuwbouwwoningen'; eenheid = 'woningen'; decimalen = 0; beter = 'hoog'
     bron = 'CBS StatLine (82235NED)'; url = 'https://opendata.cbs.nl/statline/#/CBS/nl/dataset/82235NED/table'
     uitleg = 'Aantal nieuw gebouwde woningen per jaar.'
     reeks = { Cbs '82235NED' "Perioden ne ''" 'Nieuwbouw_2' } },
  @{ id = 'co2'; naam = 'CO2-uitstoot'; eenheid = 'mln ton'; decimalen = 1; beter = 'laag'
     bron = 'CBS StatLine (85668NED)'; url = 'https://opendata.cbs.nl/statline/#/CBS/nl/dataset/85668NED/table'
     uitleg = 'Uitstoot van kooldioxide op Nederlands grondgebied (stationaire en mobiele bronnen).'
     reeks = { Cbs '85668NED' "Emissiebronnen eq 'T001176  ' and EmissiesNaarLucht eq 'A044109'" 'EmissiesNaarLucht_1' 0.001 } }
)

$blokken = foreach ($ind in $indicatoren) {
  Write-Host "Ophalen: $($ind.naam)"
  $reeks = & $ind.reeks
  if ($reeks.Count -lt 5) { throw "Te weinig jaren voor $($ind.naam) ($($reeks.Count)); is de bron veranderd?" }
  $jaren = ($reeks.Keys | ForEach-Object { "'$_': $([Math]::Round($reeks[$_], $ind.decimalen).ToString([Globalization.CultureInfo]::InvariantCulture))" }) -join ', '
  $beter = if ($ind.beter) { "'$($ind.beter)'" } else { 'null' }
  "    { id: '$($ind.id)', naam: '$($ind.naam)', eenheid: '$($ind.eenheid)', decimalen: $($ind.decimalen), beter: $beter,`n" +
  "      bron: '$($ind.bron)', url: '$($ind.url)',`n      uitleg: '$($ind.uitleg)',`n      jaren: { $jaren } }"
}

$nu = (Get-Date).ToString('yyyy-MM-dd')
$inhoud = @"
// FormatieLab - officiële kerncijfers over Nederland per jaar
// AUTOMATISCH GEMAAKT door kerncijfers-ophalen.ps1 op $nu. Niet met de hand aanpassen.
// Bronnen: Eurostat (statistiekbureau van de EU) en CBS StatLine. Recente jaren kunnen nog voorlopig zijn.
window.KERNCIJFERS = {
  opgehaald: '$nu',
  indicatoren: [
$($blokken -join ",`n")
  ]
};
"@
[IO.File]::WriteAllText($Uitvoer, $inhoud, (New-Object System.Text.UTF8Encoding($false)))
Write-Host "Klaar: $($indicatoren.Count) indicatoren -> $Uitvoer"
