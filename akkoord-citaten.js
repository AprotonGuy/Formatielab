// FormatieLab - wat stond er in het akkoord van elk eerder kabinet?
//
// Per kabinet en thema een letterlijk citaat uit het regeer-, coalitie- of hoofdlijnenakkoord
// (zie AK in kabinetten.js) met het paginanummer in de pdf. Gecontroleerd met
// tools/akkoord-citaten-controleren.ps1 tegen de officiële pdf's van officielebekendmakingen.nl.
//
// Staat een thema hier niet, dan is de samenvatting in kabinetten.js iets wat pas later in de
// kabinetsperiode gebeurde (bijvoorbeeld door een crisis) of in de begroting is uitgewerkt.
// De app toont dat dan ook zo.
window.AKKOORD_CITATEN = {
  jetten: {
    begroting:  { p: 43, c: 'De WW-uitkering wordt daarom hoger in het begin en en verkort naar één jaar.' },
    defensie:   { p: 31, c: 'We schalen de defensie-uitgaven op om de NAVO-norm van 3,5% van het BBP te halen.' },
    migratie:   { p: 36, c: 'Indien de Asielnoodmaatregelenwet en/of de Wet Invoering Tweestatusstelsel zijn aangenomen door de Eerste Kamer voeren we deze wetten onverkort uit.' },
    stikstof:   { p: 2,  c: 'Wij willen eindelijk doorbraken bereiken in het stikstofbeleid en op de woningmarkt.' },
    wonen:      { p: 17, c: 'het lukt al jaren niet om de bouwproductie naar de gewenste 100.000 woningen per jaar te krijgen' },
    zorg:       { p: 54, c: 'verhogen we het eigenrisico met €60 per 2027' },
    aow:        { p: 44, c: 'koppelen we de AOW-leeftijd per 1 januari 2033 direct aan het stijgen van de levensverwachting' }
  },
  schoof: {
    migratie:   { p: 3,  c: 'onder meer door intrekking van de Spreidingswet' },
    zorg:       { p: 1,  c: 'Meer dan halveren van het eigen risico in de zorg tot het niveau van 165 euro in 2027' },
    defensie:   { p: 23, c: 'worden in lijn gebracht met de NAVO-norm van' },
    stikstof:   { p: 1,  c: 'We willen dat boeren, tuinders en vissers weer een toekomst hebben.' },
    eu:         { p: 4,  c: 'zal een opt-out clausule voor het Europees asiel' },
    wonen:      { p: 7,  c: 'de afspraak om structureel 100.000 woningen per jaar erbij te bouwen' }
  },
  rutte4: {
    defensie:   { p: 47, c: 'Met de extra intensiveringen in defensie brengen we de defensie-uitgaven op het EU-NAVO-gemiddelde.' },
    stikstof:   { p: 14, c: 'We versnellen de doelstellingen in de wet stikstofreductie en natuurverbetering van 2035 naar 2030' },
    klimaat:    { p: 9,  c: 'scherpen we het doel voor 2030 in de Klimaatwet aan tot tenminste 55% CO2 reductie' },
    koopkracht: { p: 26, c: 'We verhogen het minimumloon stapsgewijs met 7,5%' },
    wonen:      { p: 16, c: 'Een minister voor Volkshuisvesting & Ruimtelijk Ordening (VRO) ondersteunt gemeenten en provincies' },
    migratie:   { p: 44, c: 'zetten het draagvlak voor opvang van echte vluchtelingen en de leefbaarheid voor omwonenden onder druk' },
    zorg:       { p: 37, c: 'Het eigen risico maken we slimmer en betaalbaarder.' },
    aow:        { p: 27, c: 'Hiermee houden we rekening met de randvoorwaarden uit het pensioenakkoord.' },
    eu:         { p: 40, c: 'Door de opstelling van landen als China en Rusland en de sterkere focus van de VS op Azië moeten we onze vrijheid, veiligheid en welvaart actiever beschermen.' },
    begroting:  { p: 2,  c: 'forse investeringen in onze veiligheid' },
    veiligheid: { p: 19, c: 'De snelle verharding van de georganiseerde en ondermijnende criminaliteit tast in toenemende mate de rechtsstaat aan' }
  },
  rutte3: {
    klimaat:    { p: 41, c: 'In Nederland nemen we maatregelen die ons voorbereiden op een reductie van 49 procent in 2030.' },
    migratie:   { p: 58, c: 'De permanente regeling voor langdurig in Nederland verblijvende kinderen (kinderpardon) blijft in haar huidige vorm gehandhaafd.' },
    zorg:       { p: 19, c: 'De hoogte van het maximale verplichte eigen risico wordt deze kabinetsperiode bevroren op 385 euro per jaar.' },
    eu:         { p: 54, c: 'De Europese begroting dient te worden gemoderniseerd' }
  },
  rutte2: {
    begroting:  { p: 8,  c: 'Op maatschappelijk draagvlak voor de door ons voorgestane bezuinigingen mogen we alleen rekenen als we rechtvaardige keuzes maken' },
    wonen:      { p: 64, c: 'Daarnaast wordt de heffing voor verhuurders verhoogd' },
    zorg:       { p: 24, c: 'De jeugdzorg zal daarom de komende jaren sterk worden verbeterd.' },
    koopkracht: { p: 10, c: 'Oogmerk is het stelsel te vereenvoudigen, de arbeidsparticipatie te verhogen' },
    aow:        { p: 9,  c: 'De AOW-leeftijd wordt geleidelijk verhoogd tot 66 jaar in 2018 en 67 jaar in 2021' },
    klimaat:    { p: 12, c: 'Wij streven internationaal naar een volledig duurzame energievoorziening in 2050.' }
  },
  rutte1: {
    begroting:  { p: 6,  c: 'het overeengekomen bezuinigingspakket' },
    migratie:   { p: 20, c: 'Het migratiebeleid, met name het beleid inzake de gezinsmigratie, is gericht op beperking en terugdringing van de komst van migranten met weinig perspectief.' },
    aow:        { p: 6,  c: 'het besluit de AOW-leeftijd op te trekken' },
    zorg:       { p: 17, c: 'Buiten de EU zal geen werelddekking voor zorg meer gelden uit het basispakket.' },
    klimaat:    { p: 13, c: 'De Europese doelen voor een duurzame energievoorziening zijn leidend.' }
  },
  balkenende4: {
    migratie:   { p: 35, c: 'op grond van de oude vreemdelingenwet' },
    wonen:      { p: 7,  c: 'Er komt een offensief om probleemwijken te ontwikkelen naar prachtwijken.' },
    klimaat:    { p: 16, c: 'een reductie van de uitstoot van broeikasgassen, bij voorkeur in Europees verband, van 30% in 2020' },
    zorg:       { p: 32, c: 'De no-claim wordt per 1.1.08 afgeschaft.' }
  },
  balkenende2: {
    migratie:   { p: 14, c: 'Een effectief terugkeerbeleid voor afgewezen asielzoekers' },
    begroting:  { p: 6,  c: 'De overheidsfinanciën komen in de Europese gevarenzone.' },
    zorg:       { p: 30, c: 'de nieuwe zorgverzekering' },
    aow:        { p: 7,  c: 'levensloopregeling' },
    koopkracht: { p: 7,  c: 'voor hervorming van de WAO' }
  },
  balkenende1: {
    migratie:   { p: 3,  c: 'het voeren van een restrictief vreemdelingenbeleid' },
    begroting:  { p: 2,  c: 'Bijlage 2 Ombuigingen' }
  }
};
