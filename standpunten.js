// Formatielab — standpunten per thema
//
// Per thema:
//   naam      = titel
//   links     = wat een score van -2 betekent
//   rechts    = wat een score van +2 betekent
//   urgentie  = 0 (geen) t/m 3 (zeer urgent) in het huidige politieke klimaat
//   reden     = waarom het nu urgent is (met datum)
//   p         = per partij: [positie -2..+2, prioriteit 0..3, korte samenvatting]
//               positie:    waar de partij staat op de as links ↔ rechts
//               prioriteit: hoe belangrijk de partij dit thema vindt (0 = nauwelijks, 3 = speerpunt)
//
// ONDERBOUWING: elk standpunt heeft een letterlijk citaat met paginanummer uit het verkiezingsprogramma 2025
// van de partij (zie BRON_PROGRAMMAS). Controleer met tools/citaten-controleren.ps1.
// Positie en prioriteit zijn op basis van die passages bepaald door Claude (AI): dat blijft een oordeel.
// De urgentie is een inschatting op basis van het nieuws tot 12 november 2026.
// GL-PvdA en PRO delen hun standpunten (zie zelfdeAls in data.js).
// Groep Markuszower (DNA) is afgesplitst van de PVV en heeft nog geen eigen programma;
// de cijfers zijn daarom afgeleid van de PVV en het stemgedrag in 2026.

window.STANDPUNTEN_STAND = '12 november 2026';

window.THEMAS = [
  {
    id: 'migratie',
    naam: 'Asiel & migratie',
    links: 'ruimer en humaner',
    rechts: 'veel strenger',
    urgentie: 3,
    reden: 'Overvolle azc\'s en protesten (o.a. Loosdrecht, Apeldoorn); het kabinet zette een "vliegend team" in. Het EU-migratiepact en het tweestatusstelsel moeten worden uitgevoerd.',
    // ONDERBOUWD met de verkiezingsprogramma's 2025 (zie PROGRAMMAS onderaan). Vierde element: bron
    // { p: paginanummer in de pdf, c: letterlijk citaat }. De prioriteit volgt uit hoe prominent het thema
    // in het programma staat (eigen hoofdstuk, aantal passages). Uitgezocht door Claude (AI), nov. 2026.
    onderbouwd: true,
    p: {
      'SP':      [0.5,  2, 'Migratiesaldo van 40.000 per jaar, minder arbeidsmigratie', { p: 26, c: 'streven we naar een migratiesaldo van 40 duizend per jaar' }],
      'PvdD':    [-2,   1, 'Veilige vluchtwegen, vluchtelingen op zee redden', { p: 133, c: 'het faciliteren van meer veilige en legale vluchtwegen en het gebruik van humanitaire doorgangen' }],
      'PRO':     [-1.5, 2, 'EU-migratiepact uitvoeren, kritisch op strengere asielregels', { p: 109, c: 'We staan zeer kritisch tegenover de verruiming van de ‘Veiligederdelandenregeling’' }],
      'DENK':    [-2,   2, 'Strenge asielwetten terugdraaien, humaan asielbeleid', { p: 17, c: 'De strenge asielwetten van de extreemrechtse regering gaan de prullenbak in.' }],
      'Volt':    [-1.5, 2, 'Europese herverdeling, recht op gezinshereniging', { p: 78, c: 'Iedereen die recht heeft op asiel heeft het recht zich te herenigen met zijn of haar gezin' }],
      'D66':     [-1,   1, 'Snel meedoen voor nieuwkomers, wettelijk kinderpardon', { p: 83, c: 'We stellen een wettelijk kinderpardon in' }],
      '50PLUS':  [1.5,  2, 'Streng migratiebeleid, spreidingswet intrekken', { p: 11, c: '50PLUS kiest voor een streng migratiebeleid' }],
      'CU':      [0.5,  1, 'Aanmelden buiten Europa, menswaardige opvang', { p: 41, c: 'We pleiten voor een systeem waarbij asielzoekers zich buiten Europa kunnen aanmelden.' }],
      'CDA':     [1.5,  2, 'Instroom verminderen, steun voor asielnoodmaatregelen', { p: 84, c: 'Door duidelijk te zijn over wie kans maakt op asiel en wie niet, kunnen we de instroom verminderen.' }],
      'NSC':     [1.5,  3, 'Streng en realistisch migratiebeleid, maximaal migratiesaldo', { p: 41, c: 'We staan voor een streng en realistisch migratiebeleid.' }],
      'VVD':     [1.75, 3, 'Vluchtelingen alleen nog via hervestiging', { p: 62, c: 'vluchtelingen kunnen alleen nog via hervestiging naar Nederland komen' }],
      'BBB':     [1.5,  2, 'Beheersbaar migratiebeleid, asielnoodmaatregelenwet invoeren', { p: 49, c: 'De Asielnoodmaatregelenwet invoeren.' }],
      'SGP':     [1.5,  2, 'Begrensd asielbeleid, asiel is tijdelijk', { p: 34, c: 'De SGP wil daarom terug naar het uitgangspunt dat asiel van tijdelijke aard is.' }],
      'JA21':    [2,    3, 'Forse instroombeperking, permanente grenscontroles', { p: 12, c: 'permanente grenscontroles aan de binnengrenzen' }],
      'PVV':     [2,    3, 'Totale asielstop, grenzen dicht', { p: 8, c: 'Totale asielstop: alle asielzoekers worden aan de grens geweigerd' }],
      'FvD':     [2,    3, 'Volledig stoppen met asielopvang, remigratie', { p: 8, c: 'We stoppen volledig met asielopvang in Nederland' }],
      'DNA':     [2,    3, 'Afgeleid van de PVV (nog geen eigen programma)']
    }
  },
  {
    id: 'begroting',
    naam: 'Begroting & belastingen',
    links: 'meer investeren, rijkste groepen meer belasten',
    rechts: 'bezuinigen, kleinere overheid',
    urgentie: 3,
    reden: 'De stemming over het belastingplan (12 november 2026) kan het minderheidskabinet laten vallen. Het coalitieakkoord bevat forse bezuinigingen op zorg en uitkeringen.',
    // ONDERBOUWD met de verkiezingsprogramma's 2025: vierde element = { p: pagina, c: letterlijk citaat }.
    onderbouwd: true,
    p: {
      'SP':      [-1.5, 2, 'Belastingstelsel herzien, lasten eerlijker verdelen', { p: 58, c: 'Door het belastingstelsel grondig te herzien kunnen we de lasten eerlijk verdelen' }],
      'PvdD':    [-1.5, 1, 'Grootkapitaal en bedrijfswinsten zwaarder belasten', { p: 56, c: 'Inkoop van eigen aandelen door bedrijven wordt belast.' }],
      'PRO':     [-1.5, 2, 'Grote vermogens laten bijdragen, niet bezuinigen bij tegenvallers', { p: 13, c: 'grote vermogens ook echt eerlijk bijdragen' }],
      'DENK':    [-2,   1, 'Staatsschuld laten oplopen voor investeringen', { p: 56, c: 'staatsschuld te laten oplopen, om investeringen in onze samenleving mogelijk te maken' }],
      'Volt':    [-1,   1, 'Sterkste schouders dragen de zwaarste lasten', { p: 104, c: 'de sterkste schouders dragen de zwaarste lasten' }],
      'D66':     [-0.5, 1, 'Begroten voor brede welvaart, oneerlijke belastingvoordelen schrappen', { p: 90, c: 'D66 wil oneerlijke belastingvoordelen verminderen.' }],
      '50PLUS':  [0.5,  1, 'Minder rijksambtenaren, efficiëntere overheid', { p: 17, c: 'Sinds 2018 zijn er maar liefst 44.000 Rijksambtenaren bijgekomen' }],
      'CU':      [0.5,  1, 'Gerichte keuzes met houdbare overheidsfinanciën', { p: 32, c: 'tegelijkertijd ook voor houdbare overheidsfinanciën' }],
      'CDA':     [0.5,  2, 'Houdbare overheidsfinanciën', { p: 87, c: 'Het CDA staat voor houdbare overheidsfinanciën.' }],
      'NSC':     [0.5,  2, 'Degelijk en realistisch financieel beleid', { p: 90, c: 'We staan voor een degelijk, transparant en realistisch financieel beleid.' }],
      'VVD':     [1.5,  2, 'Minder overheid; keuzes in zorg en sociale zekerheid', { p: 74, c: 'keuzes zullen moeten maken in de zorg en de sociale zekerheid' }],
      'BBB':     [0.5,  1, 'Solide begroting met ruimte voor investeringen', { p: 123, c: 'BBB zorgt voor een solide meerjarenbegroting met ruimte voor noodzakelijke investeringen' }],
      'SGP':     [1,    1, 'Kleinere, daadkrachtige overheid', { p: 63, c: 'Om de overheidsuitgaven te kunnen beteugelen, is een kleinere en daadkrachtige overheid nodig.' }],
      'JA21':    [2,    2, 'Lagere lasten en een kleine overheid', { p: 29, c: 'Lagere lasten en een kleine overheid.' }],
      'PVV':     [1,    1, 'Eigen plannen betalen door elders (asiel, EU) te bezuinigen', { p: 40, c: 'We dekken onze voorstellen door elders de uitgaven te beperken.' }],
      'FvD':     [2,    2, 'Rijksuitgaven elk jaar 3% laten krimpen, vlaktaks', { p: 36, c: 'De Rijksoverheidsuitgaven moeten verplicht ieder jaar 3% krimpen' }],
      'DNA':     [1,    1, 'Afgeleid van de PVV (nog geen eigen programma)']
    }
  },
  {
    id: 'stikstof',
    naam: 'Stikstof & landbouw',
    links: 'natuurherstel, kleinere veestapel',
    rechts: 'boeren ontzien, normen versoepelen',
    urgentie: 3,
    reden: 'Op 3 november 2026 diende het kabinet een wet in die stikstofdoelen vervangt door emissiedoelen (€20 mld). De vergunningsimpasse remt woningbouw en infrastructuur.',
    // ONDERBOUWD met de verkiezingsprogramma's 2025: vierde element = { p: pagina, c: letterlijk citaat }.
    onderbouwd: true,
    p: {
      'SP':      [-1,   2, 'Stikstof stevig omlaag, niet over de rug van boeren', { p: 46, c: 'De SP wil de stikstofuitstoot stevig terugdringen, maar niet over de rug van boeren.' }],
      'PvdD':    [-2,   3, 'Veel minder vee-industrie, natuur gaat voor', { p: 42, c: 'Het is niet uit te leggen dat we kostbaar voedsel gebruiken om de vee-industrie in stand te houden' }],
      'PRO':     [-1.5, 2, 'Afdwingbare stikstofdaling voor natuurherstel', { p: 58, c: 'Om ruimte te creëren is natuurherstel nodig' }],
      'DENK':    [-1.5, 1, 'Natuur herstellen, gedwongen uitkoop als laatste middel', { p: 47, c: 'gedwongen uitkoop niet door ons wordt uitgesloten' }],
      'Volt':    [-1.5, 1, 'Grondbank, grond van stoppende boeren opkopen voor natuur', { p: 33, c: 'Zo kan grond van boeren die met hun bedrijf stoppen, worden opgekocht' }],
      'D66':     [-1.5, 2, 'Natuur herstellen en stikstofdoelen halen', { p: 70, c: 'We herstellen natuur, verbeteren biodiversiteit en halen de doelen voor stikstof en waterkwaliteit.' }],
      '50PLUS':  [1,    1, 'Kritisch op stikstof- en natuurbeleid', { p: 13, c: 'Slecht doordachte en slecht uitgevoerde plannen op het terrein van energie, klimaat, stikstof en natuurbeleid' }],
      'CU':      [-0.5, 2, 'Geborgde stikstofreductie voor natuurherstel', { p: 10, c: 'dat beleid en maatregelen leiden tot een zekere reductie van schadelijke emissies' }],
      'CDA':     [0.5,  2, 'Perspectief voor boeren, ruimere mestnorm op grasland', { p: 60, c: 'Het CDA wil toewerken naar een hogere norm voor stikstof uit dierlijke mest op grasland.' }],
      'NSC':     [0,    2, 'Stikstof omlaag via alle sectoren, gebiedsgericht', { p: 72, c: 'De stikstofuitstoot moet omlaag door beleid dat zich op alle sectoren richt' }],
      'VVD':     [0,    2, 'Forse, generieke stikstofreductie door alle sectoren', { p: 16, c: 'We gaan zorgen voor concrete, generieke stikstofreductie door te sturen op emissies waarbij alle sectoren evenredig bijdragen.' }],
      'BBB':     [2,    3, 'Geen gedwongen maatregelen, voedselzekerheid eerst', { p: 33, c: 'BBB kiest voor realistisch beleid zonder gedwongen maatregelen' }],
      'SGP':     [1.5,  2, 'Rekenmodellen niet leidend, geen gedwongen opkoop', { p: 40, c: 'Kritische depositiewaarden en modelberekeningen zijn dienend, en niet leidend.' }],
      'JA21':    [1.5,  2, 'Af van de kritische depositiewaarde (KDW)', { p: 42, c: 'JA21 wil af van de kritische depositiewaarde (KDW)' }],
      'PVV':     [2,    2, 'Stikstof is geen probleem, boeren de ruimte', { p: 23, c: 'We moeten af van alle bangmakerij dat onze natuur door stikstof op omvallen zou staan.' }],
      'FvD':     [2,    3, 'Stikstofbeleid volledig van tafel', { p: 40, c: 'Het stikstofbeleid gaat volledig van tafel.' }],
      'DNA':     [2,    2, 'Afgeleid van de PVV (nog geen eigen programma)']
    }
  },
  {
    id: 'koopkracht',
    naam: 'Koopkracht & bestaanszekerheid',
    links: 'meer herverdeling, hoger minimumloon',
    rechts: 'lagere lasten, minder uitkeringen',
    urgentie: 2,
    reden: 'Hogere energie- en brandstofprijzen door de instabiliteit in het Midden-Oosten; het kabinet trok bijna €1 mld uit voor steun.',
    // ONDERBOUWD met de verkiezingsprogramma's 2025: vierde element = { p: pagina, c: letterlijk citaat }.
    onderbouwd: true,
    p: {
      'SP':      [-2,   3, 'Einde aan armoede, werken moet lonen', { p: 6, c: 'een einde maakt aan armoede en werken laat lonen' }],
      'PvdD':    [-1.5, 2, 'Inkomen waarvan je fatsoenlijk kunt leven, minder voorwaarden', { p: 58, c: 'Iedereen verdient een inkomen dat genoeg is om fatsoenlijk van te leven' }],
      'PRO':     [-2,   3, 'Kinderarmoede uitbannen, hogere minima', { p: 83, c: 'Daarom strijden we net zo lang totdat in Nederland geen kind meer in armoede opgroeit.' }],
      'DENK':    [-2,   3, 'Bestaanszekerheid en armoedebestrijding topprioriteit', { p: 26, c: 'DENK wil dat het vergroten van de bestaanszekerheid en het bestrijden van armoede een topprioriteit wordt van de nieuwe regering.' }],
      'Volt':    [-1,   2, 'Nationaal schuldenpardon, eenvoudiger stelsel', { p: 47, c: 'We willen een nationaal schuldenpardon voor mensen met problematische schulden.' }],
      'D66':     [-1,   2, 'Minimumloon omhoog, bijstand stijgt mee', { p: 27, c: 'We verhogen het minimumloon en het minimumjeugdloon.' }],
      '50PLUS':  [-1,   3, 'Koopkracht van ouderen, indexatie pensioenen', { p: 3, c: 'Indexatie voor gepensioneerden.' }],
      'CU':      [-1,   2, 'Geen kinderen in armoede', { p: 34, c: 'Het is onacceptabel dat veel kinderen in armoede, met schaamte en tekorten, opgroeien.' }],
      'CDA':     [0,    2, 'Zekerheid als werken niet kan, wel uitdagen tot werk', { p: 72, c: 'Het stelsel biedt mensen onvoldoende zekerheid als werken echt niet meer kan' }],
      'NSC':     [-0.5, 3, 'Bestaanszekerheid als grondwettelijke taak', { p: 6, c: 'Bestaanszekerheid is een grondwettelijke taak van de overheid.' }],
      'VVD':     [1.5,  2, 'Werken moet meer opleveren dan niet werken', { p: 29, c: 'Wie werkt moet beloond worden door er meer op vooruit te gaan dan mensen die niet willen werken.' }],
      'BBB':     [0,    1, 'Arbeidsmarkt hervormen, inzetbaarheid bevorderen', { p: 57, c: 'BBB wil de arbeidsmarkt hervormen richting een arbeidsmarkt die gezondheid, autonomie en inzetbaarheid bevordert.' }],
      'SGP':     [1,    2, 'Strengere bijstand voor wie niet wil werken', { p: 52, c: 'Voor wie wel kan maar niet wil werken, vervalt het recht op bijstand.' }],
      'JA21':    [1.5,  2, 'Lagere lastendruk, eenvoudiger belastingen', { p: 23, c: 'De lastendruk is te hoog geworden' }],
      'PVV':     [-1,   3, 'Sociaal op koopkracht, lagere lasten voor burgers', { p: 3, c: 'maar sociaal op koopkracht, zorg en volkshuisvesting' }],
      'FvD':     [1.5,  1, 'Lastenverlichting, uitkeringen pas na lange tijd voor migranten', { p: 8, c: 'De bespaarde 1.000 miljard euro geven we terug aan de Nederlander via lastenverlichting.' }],
      'DNA':     [-0.5, 2, 'Afgeleid van de PVV (nog geen eigen programma)']
    }
  },
  {
    id: 'wonen',
    naam: 'Wonen',
    links: 'meer overheidsregie, sociale huur',
    rechts: 'meer markt, regels schrappen',
    urgentie: 2,
    reden: 'Het woningtekort blijft groot; het coalitieakkoord mikt op 100.000 extra woningen per jaar, maar de stikstofimpasse remt de bouw.',
    // ONDERBOUWD met de verkiezingsprogramma's 2025: vierde element = { p: pagina, c: letterlijk citaat }.
    onderbouwd: true,
    p: {
      'SP':      [-2,   3, 'Betaalbaar huis voor iedereen, overheid bouwt', { p: 8, c: 'Stel je voor: een land waar iedereen een goed en betaalbaar huis heeft.' }],
      'PvdD':    [-1.5, 2, 'Huren omlaag, woningwaardering aanpassen', { p: 96, c: 'Huren gaan zo omlaag.' }],
      'PRO':     [-2,   3, 'Overheid pakt regie, ongekende investeringen in betaalbare woningbouw', { p: 38, c: 'Daarom komt GroenLinks-PvdA met ongekende investeringen in woningbouw.' }],
      'DENK':    [-1.5, 3, 'Woonoffensief met een Rijkswoningbouwfonds', { p: 22, c: 'Er komt een Rijkswoningbouwfonds' }],
      'Volt':    [-1.5, 2, 'Landelijke regie, structureel budget voor volkshuisvesting', { p: 18, c: 'Het ministerie van Volkshuisvesting en Ruimtelijke Ordening krijgt een structureel budget' }],
      'D66':     [-1,   2, 'Tien nieuwe steden, belastingvoordeel woningbezit afbouwen', { p: 23, c: 'We bouwen het belastingvoordeel van woningbezit af en gaan beleggers meer belasten.' }],
      '50PLUS':  [-1,   2, 'Ministerie van Volkshuisvesting terug, seniorenwoningen', { p: 7, c: 'Het Ministerie voor Volkshuisvesting wordt weer in het leven geroepen.' }],
      'CU':      [-1,   2, 'Betaalbaar bouwen, sociale huur ook voor starters', { p: 6, c: 'Gemeenten kunnen een deel van de nieuw te bouwen sociale huurwoningen reserveren voor starters.' }],
      'CDA':     [0,    3, 'Sneller bouwen door minder bezwaarprocedures', { p: 35, c: 'De Raad van State gaat door met het behandelen van woningbouwzaken met voorrang' }],
      'NSC':     [-0.5, 2, 'Rijk neemt regie als gemeenten en provincies vastlopen', { p: 13, c: 'dan neemt de minister van Volkshuisvesting en Ruimtelijke Ordening de regie en hakt de knoop door' }],
      'VVD':     [1,    2, 'Hypotheekrenteaftrek behouden, starters helpen kopen', { p: 34, c: 'Daarbij blijft de huidige dertig-jaarstermijn van de hypotheekrenteaftrek behouden.' }],
      'BBB':     [0.5,  2, 'Ook bouwen in dorpen en op het platteland', { p: 43, c: 'Niet alleen in steden, maar ook in kleine dorpen moeten er woningen bijkomen.' }],
      'SGP':     [0.5,  1, 'Woningnood aanpakken, ook aan de vraagkant', { p: 53, c: 'Een woning zou geen luxegoed moeten zijn' }],
      'JA21':    [1.5,  2, 'Huurmarkt ontgrendelen, minder regels en fiscale druk', { p: 33, c: 'Het op korte termijn ontgrendelen van de huurmarkt door bijvoorbeeld het toestaan van tijdelijke contracten voor bredere doelgroepen' }],
      'PVV':     [0.5,  3, 'Sneller bouwen, minder bezwaar, woningen voor Nederlanders', { p: 15, c: 'een dak boven je hoofd is een grondrecht' }],
      'FvD':     [2,    2, 'Wet betaalbare huur afschaffen, verhuurders vrij', { p: 23, c: 'Wij schaffen deze wet af, zodat verhuurders weer durven investeren en middenhuurwoningen terugkeren.' }],
      'DNA':     [0.5,  2, 'Afgeleid van de PVV (nog geen eigen programma)']
    }
  },
  {
    id: 'defensie',
    naam: 'Defensie',
    links: 'niet (veel) meer uitgeven',
    rechts: 'fors meer uitgeven',
    urgentie: 2,
    reden: 'De NAVO-norm stijgt naar 3,5% van het bbp; het coalitieakkoord trekt ca. €19 mld uit voor defensie.',
    // ONDERBOUWD met de verkiezingsprogramma's 2025: vierde element = { p: pagina, c: letterlijk citaat }.
    onderbouwd: true,
    p: {
      'SP':      [-1.5, 2, 'Vrede via samenwerking, niet via meer wapens', { p: 22, c: 'Onze veiligheid wordt nu te veel gebaseerd op meer wapens' }],
      'PvdD':    [-1,   1, 'Defensie-uitgaven alleen samen met investeringen in klimaat en vrede', { p: 125, c: 'uitgaven voor Europese defensie gepaard gaan met extra maatregelen voor de bescherming van klimaat, dieren en natuur' }],
      'PRO':     [1.5,  2, 'NAVO-norm halen, Europese pijler versterken', { p: 100, c: 'We committeren ons aan de NAVO-norm' }],
      'DENK':    [-2,   2, 'Tegen extra miljarden, huidige uitgaven volstaan', { p: 50, c: 'DENK vindt de huidige defensie-uitgaven voldoende' }],
      'Volt':    [1.5,  2, 'Europese krijgsmacht, EU beschermt zichzelf', { p: 115, c: 'De Europese Unie (EU) moet zichzelf beter beschermen.' }],
      'D66':     [1.5,  2, 'Europese defensie, koploper in drones, AI en cyber', { p: 79, c: 'D66 wil dat Nederland in 2030 Europees koploper is op het gebied van AI, drones, ruimtevaart en cybersecurity voor defensie.' }],
      '50PLUS':  [1,    1, 'Veranderde dreiging door de oorlog in Oekraïne', { p: 16, c: 'De geopolitieke situatie in Europa is door de oorlog in Oekraïne sterk veranderd' }],
      'CU':      [1.5,  2, 'Krijgsmacht beschermt vrijheid, dienstplicht', { p: 19, c: 'Vrijheid kan niet zonder bescherming.' }],
      'CDA':     [2,    2, 'Meer defensie, militaire opkomstplicht terug', { p: 83, c: 'Door de toenemende militaire dreigingen willen wij een heractivering van de militaire opkomstplicht' }],
      'NSC':     [1.5,  2, 'NAVO als hoeksteen, meer Europese verantwoordelijkheid', { p: 29, c: 'Het lidmaatschap van de NAVO is de hoeksteen van ons veiligheidsbeleid.' }],
      'VVD':     [2,    3, 'Sterke en moderne krijgsmacht', { p: 39, c: 'Wie vrede wil, bereidt zich voor op oorlog.' }],
      'BBB':     [1.5,  2, 'Vrede door kracht tegen de dreiging uit het Oosten', { p: 87, c: 'De dreiging uit het Oosten groeit' }],
      'SGP':     [2,    2, 'Nieuwe NAVO-norm halen (5% in 2035)', { p: 23, c: 'De SGP wil gaan voldoen aan de nieuwe NAVO-norm voor defensie-uitgaven.' }],
      'JA21':    [2,    3, 'Fors investeren in de krijgsmacht', { p: 55, c: 'JA21 wil fors investeren in een krijgsmacht' }],
      'PVV':     [1,    1, 'Defensie-uitgaven stapsgewijs laten groeien', { p: 31, c: 'Wij hebben de ambitie om de Defensie uitgaven te laten groeien' }],
      'FvD':     [0.5,  1, 'Investeren naar eigen inzicht, niet volgens NAVO-norm', { p: 74, c: 'niet volgens een opgelegde NAVO-norm, maar naar eigen inzicht' }],
      'DNA':     [1,    1, 'Afgeleid van de PVV (nog geen eigen programma)']
    }
  },
  {
    id: 'zorg',
    naam: 'Zorg',
    links: 'eigen risico omlaag, meer publiek',
    rechts: 'kosten beheersen, eigen bijdragen',
    urgentie: 2,
    reden: 'Het coalitieakkoord bezuinigt fors op zorg (o.a. hogere eigen bijdragen); de zorgkosten blijven stijgen.',
    // ONDERBOUWD met de verkiezingsprogramma's 2025: vierde element = { p: pagina, c: letterlijk citaat }.
    onderbouwd: true,
    p: {
      'SP':      [-2,   3, 'Nationaal ZorgFonds zonder eigen risico', { p: 5, c: 'een Nationaal ZorgFonds zonder eigen risico' }],
      'PvdD':    [-1,   1, 'Meer preventie en leefstijl in de zorg', { p: 85, c: 'We geven leefstijlinterventies een stevigere plek in de zorg' }],
      'PRO':     [-2,   2, 'Eigen risico stapsgewijs afschaffen, minder marktwerking', { p: 153, c: 'We schaffen het eigen risico stapsgewijs af.' }],
      'DENK':    [-2,   2, 'Eigen risico volledig afschaffen, lagere premie', { p: 36, c: 'Het volledig afschaffen van het eigen risico in de zorg.' }],
      'Volt':    [-0.5, 1, 'Toegankelijke en betaalbare zorg als afdwingbaar recht', { p: 57, c: 'Volt maakt van kwalitatieve, toegankelijke en betaalbare zorg een afdwingbaar recht voor elke EU-burger' }],
      'D66':     [0,    2, 'Gezondheid verbeteren via preventie en bestaanszekerheid', { p: 31, c: 'de beste manier om gezondheid te verbeteren, is door armoede en schulden aan te pakken' }],
      '50PLUS':  [-1,   2, 'Betaalbare zorgverzekering met goede dekking', { p: 3, c: 'Betaalbare zorgverzekering met afdoende dekking.' }],
      'CU':      [-0.5, 2, 'De zorg is geen markt', { p: 24, c: 'De zorg is geen markt' }],
      'CDA':     [0.5,  2, 'Zorg richten op wie het echt nodig heeft', { p: 29, c: 'op mensen die het echt nodig hebben' }],
      'NSC':     [-1,   2, 'Zorg is geen markt, solidair verzekeringsstelsel', { p: 66, c: 'We willen een solidair systeem voor zorgverzekeringen.' }],
      'VVD':     [1.5,  2, 'Kritisch kijken wat wel en niet vergoed wordt', { p: 78, c: 'De VVD kijkt daarom kritisch welke zorg wel en niet vergoed moet' }],
      'BBB':     [0.5,  2, 'Niet-werkzame zorg uit het basispakket', { p: 74, c: 'Alle bewezen niet werkzame zorg gaat uit de basisverzekering.' }],
      'SGP':     [-0.5, 2, 'Basiszorg toegankelijk houden voor iedereen', { p: 14, c: 'De SGP wil dat iedereen gebruik kan blijven maken van basiszorg zoals de huisarts, tandarts of kraamhulp.' }],
      'JA21':    [1,    2, 'Kostenefficiënt zorgsysteem', { p: 37, c: 'Het is tijd voor een dienstbaar, kostenefficiënt systeem dat klaar is voor de toekomst.' }],
      'PVV':     [-2,   3, 'Eigen risico volledig afschaffen', { p: 17, c: 'Daarom schaffen wij het eigen risico volledig af' }],
      'FvD':     [-1,   2, 'Eigen risico verlagen naar €200', { p: 55, c: 'We verlagen het eigen risico naar €200' }],
      'DNA':     [-2,   2, 'Afgeleid van de PVV (nog geen eigen programma)']
    }
  },
  {
    id: 'klimaat',
    naam: 'Klimaat & energie',
    links: 'sneller en ambitieuzer',
    rechts: 'afremmen, doelen loslaten',
    urgentie: 2,
    reden: 'Verstoorde olie- en gasaanvoer (crisisplan olie fase 1) zet leveringszekerheid en energieprijzen hoog op de agenda.',
    // ONDERBOUWD met de verkiezingsprogramma's 2025: vierde element = { p: pagina, c: letterlijk citaat }.
    onderbouwd: true,
    p: {
      'SP':      [-1.5, 2, 'Grootschalige aanpak klimaatcrisis, publieke energie', { p: 38, c: 'kiezen wij voor een grootschalige reddingsoperatie om de klimaatcrisis te bestrijden' }],
      'PvdD':    [-2,   3, 'Radicale klimaatkeuzes', { p: 7, c: 'Met halfslachtige maatregelen gaan we het niet redden.' }],
      'PRO':     [-2,   3, 'Versneld klimaatneutraal, grote vervuilers aanpakken', { p: 50, c: 'Versneld naar een klimaatneutraal Nederland.' }],
      'DENK':    [-1,   1, 'Rechtvaardig en betaalbaar klimaatbeleid', { p: 46, c: 'Om de opwarming van de aarde tegen te gaan en ons klimaat te beschermen moeten wij maatregelen nemen.' }],
      'Volt':    [-2,   3, 'Klimaatneutraal in 2040', { p: 12, c: 'Nederland en de Europese Unie (EU) zijn in 2040 klimaatneutraal.' }],
      'D66':     [-2,   3, 'Klimaataanpak versnellen', { p: 51, c: 'Maar dan moeten we nu versnellen, want de aarde warmt op en de gevolgen voelen we al.' }],
      '50PLUS':  [1,    1, 'Kritisch op het klimaat- en energiebeleid', { p: 13, c: 'Slecht doordachte en slecht uitgevoerde plannen op het terrein van energie, klimaat, stikstof en natuurbeleid' }],
      'CU':      [-1.5, 2, 'Ambitieus klimaatbeleid om de schepping te bewaren', { p: 27, c: 'Om de schepping te bewaren is ambitieus klimaatbeleid noodzakelijk.' }],
      'CDA':     [-0.5, 2, 'Europees klimaatbeleid, klimaatneutraal in 2050', { p: 52, c: 'klimaatneutraliteit in 2050' }],
      'NSC':     [0,    2, 'Energiezekerheid en onafhankelijkheid voorop', { p: 73, c: 'Energie-onafhankelijkheid is door de huidige politieke situatie in de wereld belangrijker dan ooit.' }],
      'VVD':     [0,    2, 'Schone én groeiende economie, net uitbreiden', { p: 15, c: 'We kiezen voor een groeiende, schone en onafhankelijke economie' }],
      'BBB':     [1.5,  2, 'Geen onrealistische uitfasering fossiel, geen extra CO2-heffing', { p: 69, c: 'Stoppen met extra CO2-heffing voor industrie.' }],
      'SGP':     [0,    1, 'Realistische verduurzaming, zon op daken', { p: 45, c: 'Op langere termijn zijn meer zonnepanelen op daken nodig.' }],
      'JA21':    [1.5,  2, 'Kernenergie in plaats van wind en zon', { p: 53, c: 'Voor kernenergie kiezen in plaats van windturbines en zonneparken.' }],
      'PVV':     [2,    2, 'Geen klimaatbetutteling, energie goedkoper', { p: 20, c: 'Met een steeds hogere energiebelasting heeft de overheid gas bewust heel duur gemaakt.' }],
      'FvD':     [2,    3, 'Stoppen met de energietransitie, uit Parijsakkoord', { p: 16, c: 'We stoppen volledig met de energietransitie' }],
      'DNA':     [2,    2, 'Afgeleid van de PVV (nog geen eigen programma)']
    }
  },
  {
    id: 'aow',
    naam: 'AOW & pensioen',
    links: 'AOW-leeftijd omlaag of bevriezen',
    rechts: 'AOW-leeftijd koppelen aan levensverwachting',
    urgentie: 1,
    reden: 'Het kabinet wil de AOW-leeftijd vanaf 2033 één-op-één koppelen aan de levensverwachting; vakbonden en oppositie zijn kritisch.',
    // ONDERBOUWD met de verkiezingsprogramma's 2025: vierde element = { p: pagina, c: letterlijk citaat }.
    onderbouwd: true,
    p: {
      'SP':      [-1.5, 2, 'Tegen hogere pensioenleeftijd, AOW omhoog', { p: 17, c: 'De afgelopen jaren verhoogden regeringen de pensioenleeftijd en maakten zij arbeid steeds onzekerder.' }],
      'PvdD':    [-1,   1, 'Eerder AOW voor zware beroepen', { p: 59, c: 'Wie in een zwaar beroep heeft gewerkt, krijgt vanaf 65 jaar AOW.' }],
      'PRO':     [-0.5, 1, 'Hogere AOW, gekoppeld aan het minimumloon', { p: 82, c: 'gekoppeld aan het minimumloon, zodat ouderen rond kunnen komen' }],
      'DENK':    [0,    0, 'Geen standpunt over de AOW-leeftijd; wel AOW-gat Surinaamse ouderen', { p: 17, c: 'Het AOW-gat voor Surinaamse ouderen wordt gerepareerd.' }],
      'Volt':    [0,    1, 'Basispensioen voor alle werkenden naast de AOW', { p: 98, c: 'We introduceren een basispensioen voor alle werkenden naast de AOW' }],
      'D66':     [0.5,  1, 'Vrijwillig doorwerken na de AOW-leeftijd mogelijk', { p: 27, c: 'Het wordt mogelijk om, als je dat wilt, na de AOW-leeftijd (gedeeltelijk) te blijven doorwerken.' }],
      '50PLUS':  [-1.5, 3, 'AOW is onaantastbaar', { p: 4, c: 'De AOW is het onaantastbare fundament van onze welvaartsstaat' }],
      'CU':      [0,    1, 'Ouderen met alleen AOW gaan erop vooruit', { p: 12, c: 'Ouderen met alleen AOW of met een klein aanvullend pensioen gaan erop vooruit.' }],
      'CDA':     [0,    1, 'AOW blijft het basispensioen', { p: 5, c: 'De AOW is en blijft het basispensioen voor alle ouderen.' }],
      'NSC':     [-0.5, 2, 'Koppeling AOW aan het minimumloon behouden', { p: 6, c: 'We handhaven de koppeling van AOW en andere uitkeringen met het minimumloon' }],
      'VVD':     [2,    2, 'Pensioenleeftijd stijgt mee met de levensverwachting', { p: 14, c: 'We vinden daarom dat bij een stijgende levensverwachting, de pensioenleeftijd mee moet stijgen.' }],
      'BBB':     [-0.5, 1, 'Handen af van de AOW, onderzoek deeltijd-AOW', { p: 60, c: 'Handen af van de AOW.' }],
      'SGP':     [0.5,  1, 'Toekomstbestendige AOW ondanks vergrijzing', { p: 52, c: 'De SGP wil een toekomstbestendig AOW-stelsel, maar dit staat door de vergrijzing onder druk.' }],
      'JA21':    [0.5,  1, 'Doorwerken na de AOW-leeftijd makkelijker maken', { p: 25, c: 'Doorwerken na AOW-leeftijd zonder fiscale of financiële belemmeringen mogelijk maken.' }],
      'PVV':     [-2,   3, 'AOW-leeftijd terug naar 65', { p: 39, c: 'We verlagen de AOW-leeftijd naar 65 jaar.' }],
      'FvD':     [-2,   2, 'AOW-leeftijd naar 66, eerder voor zware beroepen', { p: 39, c: 'We verlagen de AOW-leeftijd naar 66 jaar' }],
      'DNA':     [-2,   2, 'Afgeleid van de PVV (nog geen eigen programma)']
    }
  },
  {
    id: 'veiligheid',
    naam: 'Criminaliteit & politie',
    links: 'preventie en rechtsbescherming',
    rechts: 'harder straffen, meer politie',
    urgentie: 1,
    reden: 'Extra geld voor politie (o.a. €95 mln in de deal over het belastingplan) en aanpak van ondermijning staan op de agenda.',
    // ONDERBOUWD met de verkiezingsprogramma's 2025: vierde element = { p: pagina, c: letterlijk citaat }.
    onderbouwd: true,
    p: {
      'SP':      [-1,   1, 'Zorg en opvang in plaats van alleen politie', { p: 12, c: 'Bij een crisis komt er altijd professionele opvang, niet gelijk de politie.' }],
      'PvdD':    [-1,   1, 'Vooral milieucriminaliteit harder aanpakken', { p: 12, c: 'Ook moeten er meer mogelijkheden komen om mensen of bedrijven die de natuur ernstig beschadigen te straffen.' }],
      'PRO':     [0,    1, 'Meer politie en rechtspraak, effectieve straffen', { p: 113, c: 'zorgen we voor effectieve straffen en krijgen slachtoffers meer ruimte' }],
      'DENK':    [-1,   1, 'Discriminatie aanpakken, ook met alternatieve straffen', { p: 15, c: 'Met een Educatieve Maatregel Discriminatie en een Contacttaakstraf pakken we discriminatie effectiever aan.' }],
      'Volt':    [-0.5, 1, 'Europese samenwerking, milieucriminaliteit aanpakken', { p: 40, c: 'We versterken de aanpak van milieucriminaliteit' }],
      'D66':     [-0.5, 2, 'Preventie waar het kan, slim straffen waar het moet', { p: 13, c: 'D66 pakt onveiligheid aan bij de bron: met preventie waar het kan, slim straffen waar het moet.' }],
      '50PLUS':  [1,    1, 'Zware straffen voor geweld tegen hulpverleners', { p: 9, c: 'Zware straffen voor plegers van fysiek, verbaal en ook digitaal geweld en agressie tegen hulpverleners' }],
      'CU':      [0.5,  1, 'Streng tegen witwassen en ondermijning', { p: 13, c: 'Streng optreden tegen witwassen en ondermijning is essentieel.' }],
      'CDA':     [0,    2, 'Preventie met gezag, jongeren uit de criminaliteit houden', { p: 21, c: 'dat helpt jongeren die in de criminaliteit dreigen te belanden' }],
      'NSC':     [0,    1, 'Slimmer straffen', { p: 84, c: 'Dat betekent dat we slimmer om moeten gaan met straffen.' }],
      'VVD':     [1.5,  3, 'Hard optreden, meer handhaving op straat', { p: 22, c: 'zodat de straat weer veilig wordt' }],
      'BBB':     [0.5,  1, 'Niet bezuinigen op politie en uitvoering', { p: 22, c: 'met uitzondering van uitvoerende diensten zoals, politie' }],
      'SGP':     [1,    2, 'Krachtig optreden tegen ondermijning', { p: 8, c: 'Ondermijning en bedreiging van de rechtsorde verdienen een krachtig antwoord.' }],
      'JA21':    [2,    3, 'Zware criminelen strenger straffen', { p: 16, c: 'Zware criminelen strenger straffen.' }],
      'PVV':     [2,    3, 'Strenger straffen, geen taakstraffen', { p: 11, c: 'Geen onzinnige taakstraffen, geen tbs, maar de bak in.' }],
      'FvD':     [2,    2, 'Minimumstraffen voor geweld en zedendelicten', { p: 10, c: 'Minimumstraffen voor gewelds- en zedendelicten.' }],
      'DNA':     [2,    3, 'Afgeleid van de PVV (nog geen eigen programma)']
    }
  },
  {
    id: 'eu',
    naam: 'Europa',
    links: 'meer Europese samenwerking',
    rechts: 'minder EU, terug naar nationaal',
    urgentie: 1,
    reden: 'Uitvoering van het EU-migratiepact en Europese defensiesamenwerking lopen.',
    // ONDERBOUWD met de verkiezingsprogramma's 2025: vierde element = { p: pagina, c: letterlijk citaat }.
    onderbouwd: true,
    p: {
      'SP':      [0.5,  1, 'Europese samenwerking met behoud van soevereiniteit', { p: 24, c: 'Wij geloven in Europese samenwerking waarbij soevereiniteit van de lidstaten behouden blijft.' }],
      'PvdD':    [0.5,  1, 'Europese samenwerking, wel nationale zeggenschap', { p: 126, c: 'het Nederlandse parlement dient volledige zeggenschap te behouden over de inzet van Nederlandse militairen' }],
      'PRO':     [-1.5, 2, 'Sterke EU als waardengemeenschap', { p: 96, c: 'De Europese Unie is een waardengemeenschap van democratische rechtsstaten.' }],
      'DENK':    [0,    1, 'Meer Europese samenwerking zonder verlies van soevereiniteit', { p: 49, c: 'zonder het verlies van onze eigen soevereiniteit' }],
      'Volt':    [-2,   3, 'Federaal en slagvaardig Europa', { p: 5, c: 'De EU moet zichzelf kunnen verdedigen.' }],
      'D66':     [-2,   3, 'Een vrij, veilig en verenigd Europa', { p: 3, c: 'In een vrij, veilig en verenigd Europa.' }],
      '50PLUS':  [1,    1, 'Takenpakket van de EU beperken', { p: 18, c: 'Het takenpakket van de EU wordt beperkt.' }],
      'CU':      [0,    2, 'Europese samenwerking op kerntaken, oog voor soevereiniteit', { p: 42, c: 'Europese samenwerking begint met duidelijkheid over bevoegdheden.' }],
      'CDA':     [-1,   2, 'Sterk Europa voor de grote uitdagingen', { p: 6, c: 'vragen om een sterk Europa' }],
      'NSC':     [0.5,  2, 'Actief in Europa, maar waken voor soevereiniteit', { p: 4, c: 'We dragen actief bij in Europa, maar waken voor uitholling van de nationale soevereiniteit.' }],
      'VVD':     [-0.5, 2, 'Sterk Europa en sterke NAVO', { p: 2, c: 'De VVD kiest voor een ongekend sterke krijgsmacht, een sterk Europa en sterke NAVO.' }],
      'BBB':     [0.5,  1, 'EU beperkt tot interne markt, voedselzekerheid en buitengrenzen', { p: 9, c: 'De kernopgave van de Europese Unie ligt bij het versterken van de interne markt' }],
      'SGP':     [1,    2, 'EU moet lidstaten meer ruimte laten', { p: 7, c: 'De Europese Unie (EU) heeft bevoegdheden nodig voor de aanpak van grensoverschrijdende problemen, maar moet lidstaten meer ruimte laten.' }],
      'JA21':    [1.5,  2, 'Minder EU, meer referenda', { p: 5, c: 'JA21 wil dus meer referenda, minder EU, meer economische vrijheid en meer invloed op ons grensbeleid.' }],
      'PVV':     [2,    2, 'Soeverein Nederland, opt-outs afdwingen', { p: 30, c: 'De PVV kiest voor een soeverein Nederland.' }],
      'FvD':     [2,    3, 'Nexit: uittreden uit de EU', { p: 8, c: 'We sturen daarom aan op intelligente uittreding uit de EU' }],
      'DNA':     [2,    2, 'Afgeleid van de PVV (nog geen eigen programma)']
    }
  }
];

// ---------------------------------------------------------------------------
// BRONNEN
// ---------------------------------------------------------------------------
// Waar komen de gegevens vandaan? Wordt in de app getoond onder "Bronnen" per thema.
//
// BRON_PROGRAMMAS: per partij het definitieve verkiezingsprogramma 2025 (archief DNPP, Rijksuniversiteit Groningen).
// Thema's met "onderbouwd: true" hebben per partij een letterlijk citaat met paginanummer uit dit
// programma. De andere thema's zijn nog inschattingen van Claude (AI) en moeten nog worden onderbouwd.
window.BRON_PROGRAMMAS = {
  'SP':      { titel: 'SP — verkiezingsprogramma 2025 "Super sociaal"', url: 'https://dnpprepo.ub.rug.nl/88738/7/SP-verkiezingsprogramma-TK2025.pdf' },
  'PvdD':    { titel: 'PvdD — verkiezingsprogramma 2025 "Natuurlijk."', url: 'https://dnpprepo.ub.rug.nl/88761/7/PvdD%20Verkiezingsprogramma%20TK%202025.pdf' },
  'GL-PvdA': { titel: 'GroenLinks-PvdA — verkiezingsprogramma 2025 "Een nieuwe start voor Nederland"', url: 'https://dnpprepo.ub.rug.nl/88754/7/GL-PvdA%20Verkiezingsprogramma%20TK%202025-2029.pdf' },
  'PRO':     { titel: 'GroenLinks-PvdA (nu PRO) — verkiezingsprogramma 2025 "Een nieuwe start voor Nederland"', url: 'https://dnpprepo.ub.rug.nl/88754/7/GL-PvdA%20Verkiezingsprogramma%20TK%202025-2029.pdf' },
  'DENK':    { titel: 'DENK — verkiezingsprogramma 2025 "Nu is het moment meer dan ooit!"', url: 'https://dnpprepo.ub.rug.nl/88779/1/DENK%20Verkiezingsprogramma%20TK%202025.pdf' },
  'Volt':    { titel: 'Volt — verkiezingsprogramma 2025 "Doe iets nieuws"', url: 'https://dnpprepo.ub.rug.nl/88740/13/Volt%20Verkiezingsprogramma%20TK%202025.pdf' },
  'D66':     { titel: 'D66 — verkiezingsprogramma 2025 "Het kan wél"', url: 'https://dnpprepo.ub.rug.nl/88770/43/D66%20Verkiezingsprogramma%20TK%202025-2030.pdf' },
  '50PLUS':  { titel: '50PLUS — verkiezingsprogramma 2025 "Wij doen mee"', url: 'https://dnpprepo.ub.rug.nl/88767/7/50PLUS%20Verkiezingsprogramma%202025-2029.pdf' },
  'CU':      { titel: 'ChristenUnie — verkiezingsprogramma 2025 "Opstaan voor het goede"', url: 'https://dnpprepo.ub.rug.nl/88763/1/CU%20Verkiezingsprogramma%20TK%202025.pdf' },
  'CDA':     { titel: 'CDA — verkiezingsprogramma 2025 "Bouwen op vertrouwen"', url: 'https://dnpprepo.ub.rug.nl/88765/7/CDA%20Verkiezingsprogramma%20TK%202025%20Definitief.pdf' },
  'NSC':     { titel: 'NSC — verkiezingsprogramma 2025 "Zorgen voor zekerheid!"', url: 'https://dnpprepo.ub.rug.nl/88758/7/NSC%20Verkiezingsprogramma%20TK%202025%20definitief.pdf' },
  'VVD':     { titel: 'VVD — verkiezingsprogramma 2025 "Sterker uit de storm"', url: 'https://dnpprepo.ub.rug.nl/88735/1/VVD%20Verkiezingsprogramma%20TK%202025.pdf' },
  'BBB':     { titel: 'BBB — verkiezingsprogramma 2025 "BBB levert"', url: 'https://dnpprepo.ub.rug.nl/88739/7/BBB%20Verkiezingsprogramma%20TK2025.pdf' },
  'SGP':     { titel: 'SGP — verkiezingsprogramma 2025 "Stem christelijk voor Nederland"', url: 'https://dnpprepo.ub.rug.nl/88768/7/SGP%20Verkiezingsprogramma%20TK%202025-2029.pdf' },
  'JA21':    { titel: 'JA21 — verkiezingsprogramma 2025 "De juiste aanpak voor Nederland"', url: 'https://dnpprepo.ub.rug.nl/88762/7/JA21%20Verkiezingsprogramma%20TK%202025%20definitief.pdf' },
  'PVV':     { titel: 'PVV — verkiezingsprogramma 2025 "Dit is uw land!"', url: 'https://dnpprepo.ub.rug.nl/88766/1/PVV%20Verkiezingsprogramma%20TK%202025.pdf' },
  'DNA':     { titel: 'Groep Markuszower begint nieuwe partij (Welingelichte Kringen) — nog geen programma', url: 'https://www.welingelichtekringen.nl/samenleving/groep-markuszower-begint-nieuwe-partij-verdonk-sluit-zich-aan' },
  'FvD':     { titel: 'FvD — verkiezingsprogramma 2025 "Een nieuwe kans voor Nederland"', url: 'https://dnpprepo.ub.rug.nl/88769/1/FVD%20Verkiezingsprogramma%20TK%202025.pdf' }
};

// Algemene bron voor alle verkiezingsprogramma's (archief van het DNPP, Rijksuniversiteit Groningen).
window.BRON_ALGEMEEN = [
  { titel: 'DNPP — archief van verkiezingsprogramma\'s', url: 'https://dnpp.nl' },
  { titel: 'Parlement.com — kabinet-Jetten (overzicht en actualiteit)', url: 'https://www.parlement.com/kabinet-jetten-2026-heden' }
];

// THEMA_BRONNEN: nieuwsbronnen voor de "Actualiteit" en urgentie van elk thema.
// Laat de lijst leeg ([]) als er geen bron is; de app meldt dat dan.
window.THEMA_BRONNEN = {
  migratie: [
    { titel: 'Parlement.com — kabinet-Jetten: asiel, protesten en "vliegend team"', url: 'https://www.parlement.com/kabinet-jetten-2026-heden' },
    { titel: 'Hart van Nederland — belangrijkste punten coalitieakkoord', url: 'https://www.hartvannederland.nl/politiek/beleid/artikelen/minderheidskabinet-aan-de-slag-belangrijkste-punten-coalitieakkoord' }
  ],
  begroting: [
    { titel: 'RD — Kabinet-Jetten zou vandaag zomaar kunnen kapseizen', url: 'https://www.rd.nl/a/kabinet-jetten-zou-vandaag-zomaar-kunnen-kapseizen' },
    { titel: 'RD — Debat over belastingplan kabinet-Jetten van start', url: 'https://www.rd.nl/artikel/debat-over-belastingplan-kabinet-jetten-van-start' },
    { titel: 'Welingelichte Kringen — Markuszower ziet geen argument om tegen belastingplan te stemmen', url: 'https://www.welingelichtekringen.nl/samenleving/markuszower-ziet-geen-argument-om-tegen-belastingplan-te-stemmen' },
    { titel: 'NOS — Coalitieakkoord: 19 miljard voor defensie, forse bezuinigingen', url: 'https://nos.nl/l/2600274' },
    { titel: 'CPB/PBL — analyse coalitieakkoord 2026-2030 (pdf)', url: 'https://www.pbl.nl/downloads/cpb-pbl-2026-publicatie-analyse-coalitieakkoord-2026-2030-6171pdf' }
  ],
  stikstof: [
    { titel: 'Parlement.com — kabinet-Jetten: stikstofwet van 3 november', url: 'https://www.parlement.com/kabinet-jetten-2026-heden' }
  ],
  koopkracht: [
    { titel: 'Parlement.com — kabinet-Jetten: steun na instabiliteit Midden-Oosten', url: 'https://www.parlement.com/kabinet-jetten-2026-heden' },
    { titel: 'NOS — Vakbonden boos, scepsis over zorgplannen van coalitie', url: 'https://nos.nl/l/2600312' }
  ],
  wonen: [
    { titel: 'Hart van Nederland — belangrijkste punten coalitieakkoord', url: 'https://www.hartvannederland.nl/politiek/beleid/artikelen/minderheidskabinet-aan-de-slag-belangrijkste-punten-coalitieakkoord' }
  ],
  defensie: [
    { titel: 'NOS — Coalitieakkoord: 19 miljard voor defensie', url: 'https://nos.nl/l/2600274' }
  ],
  zorg: [
    { titel: 'NOS — Coalitieakkoord: forse bezuinigingen op zorg', url: 'https://nos.nl/l/2600274' },
    { titel: 'NOS — Vakbonden boos, scepsis over zorgplannen van coalitie', url: 'https://nos.nl/l/2600312' }
  ],
  klimaat: [],
  aow: [
    { titel: 'NOS — Vakbonden boos over plannen van coalitie', url: 'https://nos.nl/l/2600312' },
    { titel: 'Hart van Nederland — belangrijkste punten coalitieakkoord', url: 'https://www.hartvannederland.nl/politiek/beleid/artikelen/minderheidskabinet-aan-de-slag-belangrijkste-punten-coalitieakkoord' }
  ],
  veiligheid: [
    { titel: 'Welingelichte Kringen — Markuszower en het belastingplan (o.a. extra geld politie)', url: 'https://www.welingelichtekringen.nl/samenleving/markuszower-ziet-geen-argument-om-tegen-belastingplan-te-stemmen' },
    { titel: 'Parlement.com — kabinet-Jetten', url: 'https://www.parlement.com/kabinet-jetten-2026-heden' }
  ],
  eu: [
    { titel: 'Hart van Nederland — belangrijkste punten coalitieakkoord', url: 'https://www.hartvannederland.nl/politiek/beleid/artikelen/minderheidskabinet-aan-de-slag-belangrijkste-punten-coalitieakkoord' }
  ]
};

// ---------------------------------------------------------------------------
// TREFWOORDEN voor echt stemgedrag (stemgedrag.js)
// ---------------------------------------------------------------------------
// Een stemming hoort bij een thema als de titel van het dossier of het onderwerp van de motie
// een van deze woorden bevat (hoofdletters maken niet uit). Een stemming kan bij meerdere
// thema's horen. Woorden met \b eromheen tellen alleen als los woord.
window.THEMA_TREFWOORDEN = {
  migratie:   ['asiel', 'migratie', 'migrant', 'vreemdeling', '\bazc', 'statushouder', 'spreidingswet', 'gezinshereniging',
               'nareiz', 'vluchteling', 'ter apel', '\bcoa\b', '\bind\b', 'uitgeprocedeerd', 'terugkeer'],
  begroting:  ['belastingplan', 'belasting', 'fiscal', '\bbtw', 'box 3', 'vermogensrendement', 'staatsschuld',
               'begrotingstekort', 'bezuinig', 'ministerie van financi', 'miljoenennota', 'voorjaarsnota', 'najaarsnota'],
  stikstof:   ['stikstof', 'landbouw', '\bboer', 'veehouder', 'natura 2000', 'mest', 'visserij', 'voedselzekerheid'],
  koopkracht: ['koopkracht', 'minimumloon', 'toeslag', 'bijstand', 'armoede', 'uitkering', 'sociale zaken',
               'energierekening', 'energieprijs', 'schuldhulp', 'schulden', 'participatiewet', 'bestaanszekerheid'],
  wonen:      ['woning', '\bhuur', 'huurder', 'volkshuisvesting', 'hypothe', 'dakloos', 'woningbouw', 'corporatie'],
  defensie:   ['defensie', '\bnavo', 'krijgsmacht', 'militair', 'oekra', 'wapen', 'munitie', 'dienstplicht'],
  zorg:       ['\bzorg', 'eigen risico', 'ziekenhuis', 'volksgezondheid', 'gezondheid', '\bggz', 'huisarts',
               'zorgverzeker', 'verpleeg', 'medicijn', 'geneesmiddel'],
  klimaat:    ['klimaat', 'energie', '\bco2', 'co₂', 'duurzame', 'windpark', 'wind op zee', 'zonne', 'kernenergie',
               'kerncentrale', 'groene groei', 'gaswinning', 'warmte', 'groen gas', 'fossiel'],
  aow:        ['\baow', 'pensioen', 'ouderdom'],
  veiligheid: ['politie', 'criminaliteit', 'crimineel', 'justitie', '\bstraf', 'veiligheid', 'ondermijning', 'drugs',
               'gevangenis', 'openbaar ministerie', 'terroris', 'rechtspraak'],
  eu:         ['europese unie', '\beu\b', 'europees', 'europese commissie', 'brussel', 'europese zaken', 'europese raad']
};
