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
// LET OP: dit zijn vereenvoudigde inschattingen op basis van de verkiezingsprogramma's van 2025
// en het nieuws tot 12 november 2026. Ze zijn bedoeld als startpunt: pas ze gerust aan.
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
    p: {
      'SP':      [0,    1, 'Minder arbeidsmigratie, humane asielopvang'],
      'PvdD':    [-1,   1, 'Humane opvang, oorzaken van vluchten aanpakken'],
      'PRO':     [-1.5, 1, 'Humane opvang, spreidingswet, veilige routes'],
      'DENK':    [-2,   2, 'Ruimhartige opvang, tegen strengere asielregels'],
      'Volt':    [-1,   1, 'Europese aanpak, humane opvang'],
      'D66':     [-0.5, 1, 'EU-asielpact uitvoeren, snelle en eerlijke procedures'],
      '50PLUS':  [1,    1, 'Instroom beperken'],
      'CU':      [0,    1, 'Grip op migratie, met barmhartige opvang'],
      'CDA':     [1,    2, 'Meer grip op asiel en arbeidsmigratie, spreidingswet behouden'],
      'NSC':     [1.5,  3, 'Migratiesaldo terug naar ca. 50.000 per jaar'],
      'VVD':     [1.5,  3, 'Streng asielbeleid, tweestatusstelsel, minder instroom'],
      'BBB':     [1.5,  2, 'Minder instroom, geen opvang tegen de wil van gemeenten'],
      'SGP':     [1.5,  2, 'Asielinstroom fors beperken'],
      'JA21':    [2,    3, 'Instroom naar minimum, opt-out van EU-asielregels'],
      'PVV':     [2,    3, 'Asielstop, grenscontroles, geen nieuwe azc\'s'],
      'FvD':     [2,    3, 'Asielstop en terugkeer'],
      'DNA':     [2,    3, 'Asielstop, zeer streng migratiebeleid']
    }
  },
  {
    id: 'begroting',
    naam: 'Begroting & belastingen',
    links: 'meer investeren, rijkste groepen meer belasten',
    rechts: 'bezuinigen, kleinere overheid',
    urgentie: 3,
    reden: 'De stemming over het belastingplan (12 november 2026) kan het minderheidskabinet laten vallen. Het coalitieakkoord bevat forse bezuinigingen op zorg en uitkeringen.',
    p: {
      'SP':      [-2,   2, 'Meer publieke investeringen, grote vermogens belasten'],
      'PvdD':    [-1,   1, 'Investeren in natuur, vervuiling belasten'],
      'PRO':     [-1.5, 2, 'Investeren in publieke voorzieningen, vermogen belasten'],
      'DENK':    [-1,   1, 'Investeren in sociale voorzieningen'],
      'Volt':    [-1,   1, 'Investeren in de toekomst'],
      'D66':     [0.5,  2, 'Investeren in onderwijs, gezonde overheidsfinanciën'],
      '50PLUS':  [-1,   1, 'Niet bezuinigen op ouderen'],
      'CU':      [0,    1, 'Solide financiën met oog voor sociale gevolgen'],
      'CDA':     [1,    2, 'Solide overheidsfinanciën'],
      'NSC':     [1,    2, 'Solide financiën, goed bestuur'],
      'VVD':     [1.5,  3, 'Begrotingsdiscipline, bezuinigen op de overheid'],
      'BBB':     [0,    1, 'Minder bureaucratie'],
      'SGP':     [1,    1, 'Solide financiën'],
      'JA21':    [1.5,  2, 'Kleinere overheid, bezuinigen'],
      'PVV':     [-0.5, 2, 'Bezuinigen op asiel, klimaat en EU; meer naar burgers'],
      'FvD':     [1,    1, 'Kleinere overheid, lagere belastingen'],
      'DNA':     [0,    1, 'Bezuinigen op asiel en klimaat']
    }
  },
  {
    id: 'stikstof',
    naam: 'Stikstof & landbouw',
    links: 'natuurherstel, kleinere veestapel',
    rechts: 'boeren ontzien, normen versoepelen',
    urgentie: 3,
    reden: 'Op 3 november 2026 diende het kabinet een wet in die stikstofdoelen vervangt door emissiedoelen (€20 mld). De vergunningsimpasse remt woningbouw en infrastructuur.',
    p: {
      'SP':      [-0.5, 1, 'Natuur herstellen, eerlijke prijs voor boeren'],
      'PvdD':    [-2,   3, 'Veestapel sterk laten krimpen'],
      'PRO':     [-1.5, 2, 'Natuurherstel, kleinere veestapel, boeren ondersteunen'],
      'DENK':    [-0.5, 0, 'Weinig nadruk'],
      'Volt':    [-1.5, 2, 'Natuurherstel en kringlooplandbouw'],
      'D66':     [-1.5, 2, 'Stikstofuitstoot halveren, natuurherstel'],
      '50PLUS':  [0.5,  0, 'Weinig nadruk'],
      'CU':      [-0.5, 2, 'Natuur herstellen samen met boeren'],
      'CDA':     [0,    3, 'Perspectief voor boeren én natuur, vergunningen vlottrekken'],
      'NSC':     [0.5,  2, 'Realistische doelen, vergunningverlening op gang'],
      'VVD':     [0.5,  2, 'Vergunningen vlottrekken, innovatie'],
      'BBB':     [2,    3, 'Geen gedwongen krimp, normen herzien'],
      'SGP':     [1.5,  2, 'Boeren ontzien, geen gedwongen uitkoop'],
      'JA21':    [1.5,  2, 'Stikstofnormen versoepelen'],
      'PVV':     [1.5,  2, 'Geen onteigening van boeren, normen loslaten'],
      'FvD':     [2,    2, 'Stikstofbeleid schrappen'],
      'DNA':     [1.5,  1, 'Boeren ontzien']
    }
  },
  {
    id: 'koopkracht',
    naam: 'Koopkracht & bestaanszekerheid',
    links: 'meer herverdeling, hoger minimumloon',
    rechts: 'lagere lasten, minder uitkeringen',
    urgentie: 2,
    reden: 'Hogere energie- en brandstofprijzen door de instabiliteit in het Midden-Oosten; het kabinet trok bijna €1 mld uit voor steun.',
    p: {
      'SP':      [-2,   3, 'Minimumloon fors omhoog, huren en energie omlaag'],
      'PvdD':    [-1,   1, 'Bestaanszekerheid, vervuiler betaalt'],
      'PRO':     [-2,   3, 'Hoger minimumloon, vermogen zwaarder belasten'],
      'DENK':    [-1.5, 2, 'Armoede aanpakken, hogere uitkeringen'],
      'Volt':    [-1,   2, 'Bestaanszekerheid, eenvoudiger toeslagen'],
      'D66':     [-0.5, 2, 'Werken moet lonen, toeslagen vereenvoudigen'],
      '50PLUS':  [-1.5, 3, 'Koopkracht ouderen, pensioenen indexeren'],
      'CU':      [-1,   2, 'Bestaanszekerheid, gezinnen ondersteunen'],
      'CDA':     [-0.5, 2, 'Bestaanszekerheid voor gezinnen, werken moet lonen'],
      'NSC':     [-1,   3, 'Bestaanszekerheid, toeslagen hervormen'],
      'VVD':     [1.5,  2, 'Lagere lasten op werk, minder uitkeringen'],
      'BBB':     [0,    2, 'Lagere lasten, leefbaarheid in de regio'],
      'SGP':     [0,    1, 'Gezinnen ontzien'],
      'JA21':    [1.5,  2, 'Lastenverlaging, minder overheid'],
      'PVV':     [-1,   3, 'Lagere energierekening, huren omlaag, lagere belastingen'],
      'FvD':     [1,    1, 'Lagere belastingen'],
      'DNA':     [-0.5, 2, 'Lagere lasten, meer koopkracht']
    }
  },
  {
    id: 'wonen',
    naam: 'Wonen',
    links: 'meer overheidsregie, sociale huur',
    rechts: 'meer markt, regels schrappen',
    urgentie: 2,
    reden: 'Het woningtekort blijft groot; het coalitieakkoord mikt op 100.000 extra woningen per jaar, maar de stikstofimpasse remt de bouw.',
    p: {
      'SP':      [-2,   3, 'Veel sociale huur, huren bevriezen'],
      'PvdD':    [-1,   1, 'Betaalbaar en duurzaam bouwen, natuur sparen'],
      'PRO':     [-1.5, 3, 'Meer betaalbare huur, overheid neemt regie'],
      'DENK':    [-1,   2, 'Betaalbare huur, aanpak discriminatie op de woningmarkt'],
      'Volt':    [-1,   2, 'Meer betaalbare woningen'],
      'D66':     [-0.5, 3, 'Nieuwe steden bouwen, hypotheekrenteaftrek afbouwen'],
      '50PLUS':  [-0.5, 2, 'Seniorenwoningen bouwen voor doorstroming'],
      'CU':      [-1,   2, 'Meer sociale huur, gezinnen helpen'],
      'CDA':     [-0.5, 3, 'Volkshuisvesting terug, bouwen voor starters en gezinnen'],
      'NSC':     [-0.5, 3, 'Woningbouw met regie van de overheid'],
      'VVD':     [1.5,  3, 'Sneller bouwen, regels schrappen, hypotheekrenteaftrek behouden'],
      'BBB':     [0.5,  2, 'Bouwen in kleine kernen en op het platteland'],
      'SGP':     [0.5,  1, 'Gezinswoningen bouwen'],
      'JA21':    [1.5,  2, 'Regels schrappen, geen voorrang voor statushouders'],
      'PVV':     [0,    3, 'Huren omlaag, geen voorrang voor statushouders'],
      'FvD':     [1,    1, 'Minder regels'],
      'DNA':     [0,    2, 'Huren omlaag, geen voorrang voor statushouders']
    }
  },
  {
    id: 'defensie',
    naam: 'Defensie',
    links: 'niet (veel) meer uitgeven',
    rechts: 'fors meer uitgeven',
    urgentie: 2,
    reden: 'De NAVO-norm stijgt naar 3,5% van het bbp; het coalitieakkoord trekt ca. €19 mld uit voor defensie.',
    p: {
      'SP':      [-1,   1, 'Geen extra defensiegeld ten koste van sociale zekerheid'],
      'PvdD':    [-1.5, 1, 'Tegen hogere defensie-uitgaven'],
      'PRO':     [1,    2, 'Sterkere Europese defensie, steun aan Oekraïne'],
      'DENK':    [-1,   1, 'Kritisch op hogere uitgaven'],
      'Volt':    [1.5,  2, 'Europese defensie, steun aan Oekraïne'],
      'D66':     [1.5,  2, 'NAVO-norm halen, Europese defensie'],
      '50PLUS':  [0.5,  1, 'NAVO-norm halen'],
      'CU':      [1,    2, 'NAVO-norm, steun aan Oekraïne'],
      'CDA':     [1.5,  3, 'Fors investeren, NAVO-norm van 3,5%'],
      'NSC':     [1.5,  2, 'Investeren in defensie'],
      'VVD':     [2,    3, 'NAVO-norm van 3,5% of meer, steun aan Oekraïne'],
      'BBB':     [1,    1, 'Investeren in defensie'],
      'SGP':     [1.5,  2, 'Sterke krijgsmacht'],
      'JA21':    [2,    2, 'Fors investeren in defensie'],
      'PVV':     [0.5,  1, 'Defensie op orde, minder geld naar Oekraïne'],
      'FvD':     [-0.5, 1, 'Kritisch op NAVO-uitgaven en steun aan Oekraïne'],
      'DNA':     [1,    1, 'Defensie op orde']
    }
  },
  {
    id: 'zorg',
    naam: 'Zorg',
    links: 'eigen risico omlaag, meer publiek',
    rechts: 'kosten beheersen, eigen bijdragen',
    urgentie: 2,
    reden: 'Het coalitieakkoord bezuinigt fors op zorg (o.a. hogere eigen bijdragen); de zorgkosten blijven stijgen.',
    p: {
      'SP':      [-2,   3, 'Eigen risico afschaffen, nationaal zorgfonds'],
      'PvdD':    [-1,   1, 'Eigen risico omlaag, preventie'],
      'PRO':     [-1.5, 2, 'Eigen risico afschaffen, minder marktwerking'],
      'DENK':    [-1.5, 2, 'Eigen risico afschaffen'],
      'Volt':    [-0.5, 1, 'Preventie, toegankelijke zorg'],
      'D66':     [0.5,  2, 'Preventie, zorgkosten beheersen'],
      '50PLUS':  [-1.5, 3, 'Betere ouderenzorg, eigen risico omlaag'],
      'CU':      [-0.5, 2, 'Minder marktwerking, preventie'],
      'CDA':     [0.5,  2, 'Zorg betaalbaar houden, regionaal organiseren'],
      'NSC':     [-0.5, 2, 'Eigen risico verlagen'],
      'VVD':     [1,    2, 'Zorgkosten beheersen, eigen risico handhaven'],
      'BBB':     [-0.5, 2, 'Zorg dichtbij in de regio'],
      'SGP':     [0,    1, 'Zorg betaalbaar houden'],
      'JA21':    [1,    1, 'Doelmatigheid, minder bureaucratie'],
      'PVV':     [-2,   3, 'Eigen risico naar nul, meer geld voor ouderenzorg'],
      'FvD':     [-0.5, 1, 'Minder bureaucratie, meer eigen keuze'],
      'DNA':     [-2,   2, 'Eigen risico omlaag']
    }
  },
  {
    id: 'klimaat',
    naam: 'Klimaat & energie',
    links: 'sneller en ambitieuzer',
    rechts: 'afremmen, doelen loslaten',
    urgentie: 2,
    reden: 'Verstoorde olie- en gasaanvoer (crisisplan olie fase 1) zet leveringszekerheid en energieprijzen hoog op de agenda.',
    p: {
      'SP':      [-0.5, 1, 'Eerlijk klimaatbeleid: grote vervuilers betalen'],
      'PvdD':    [-2,   3, 'Veel sneller klimaatneutraal, fossiele subsidies stoppen'],
      'PRO':     [-2,   3, 'Ambitieus klimaatbeleid, fossiel afbouwen'],
      'DENK':    [-0.5, 1, 'Klimaatbeleid zonder lasten voor lage inkomens'],
      'Volt':    [-2,   3, 'Snelle, Europese energietransitie'],
      'D66':     [-1.5, 3, 'Klimaatdoelen halen, groene industrie'],
      '50PLUS':  [0.5,  1, 'Betaalbare energie boven ambitie'],
      'CU':      [-1,   2, 'Rentmeesterschap: klimaatdoelen halen'],
      'CDA':     [-0.5, 2, 'Klimaatdoelen, maar haalbaar en betaalbaar'],
      'NSC':     [0,    1, 'Realistisch tempo, betaalbaarheid'],
      'VVD':     [0.5,  2, 'Kernenergie, doelen met realisme'],
      'BBB':     [1.5,  2, 'Klimaatbeleid afzwakken, kernenergie'],
      'SGP':     [0.5,  1, 'Kernenergie, haalbaar beleid'],
      'JA21':    [1.5,  2, 'Klimaatwet versoberen, kernenergie'],
      'PVV':     [2,    2, 'Klimaatbeleid schrappen'],
      'FvD':     [2,    2, 'Uit klimaatakkoorden stappen'],
      'DNA':     [2,    2, 'Klimaatbeleid schrappen']
    }
  },
  {
    id: 'aow',
    naam: 'AOW & pensioen',
    links: 'AOW-leeftijd omlaag of bevriezen',
    rechts: 'AOW-leeftijd koppelen aan levensverwachting',
    urgentie: 1,
    reden: 'Het kabinet wil de AOW-leeftijd vanaf 2033 één-op-één koppelen aan de levensverwachting; vakbonden en oppositie zijn kritisch.',
    p: {
      'SP':      [-2,   2, 'AOW-leeftijd terug naar 65'],
      'PvdD':    [-0.5, 0, 'Weinig nadruk'],
      'PRO':     [-1,   1, 'Geen versnelde verhoging'],
      'DENK':    [-1,   1, 'Tegen een hogere AOW-leeftijd'],
      'Volt':    [0.5,  0, 'Weinig nadruk'],
      'D66':     [1.5,  2, 'AOW-leeftijd koppelen aan levensverwachting'],
      '50PLUS':  [-2,   3, 'AOW-leeftijd omlaag, AOW omhoog'],
      'CU':      [0,    1, 'Houdbaar en eerlijk stelsel'],
      'CDA':     [1,    1, 'Houdbaar stelsel'],
      'NSC':     [0,    1, 'Rekening houden met zware beroepen'],
      'VVD':     [1.5,  2, 'AOW-leeftijd koppelen aan levensverwachting'],
      'BBB':     [-0.5, 1, 'Rekening houden met zware beroepen'],
      'SGP':     [0.5,  0, 'Weinig nadruk'],
      'JA21':    [1,    1, 'Houdbaar stelsel'],
      'PVV':     [-2,   3, 'AOW-leeftijd terug naar 65'],
      'FvD':     [-1,   1, 'AOW-leeftijd bevriezen'],
      'DNA':     [-1.5, 2, 'AOW-leeftijd omlaag']
    }
  },
  {
    id: 'veiligheid',
    naam: 'Criminaliteit & politie',
    links: 'preventie en rechtsbescherming',
    rechts: 'harder straffen, meer politie',
    urgentie: 1,
    reden: 'Extra geld voor politie (o.a. €95 mln in de deal over het belastingplan) en aanpak van ondermijning staan op de agenda.',
    p: {
      'SP':      [0,    1, 'Meer wijkagenten, aanpak ondermijning'],
      'PvdD':    [-1,   0, 'Weinig nadruk'],
      'PRO':     [-0.5, 1, 'Preventie en meer wijkagenten'],
      'DENK':    [-1,   1, 'Etnisch profileren aanpakken'],
      'Volt':    [-0.5, 0, 'Weinig nadruk'],
      'D66':     [0,    1, 'Georganiseerde misdaad aanpakken, drugsbeleid reguleren'],
      '50PLUS':  [1,    1, 'Veiligheid van ouderen'],
      'CU':      [0.5,  1, 'Ondermijning aanpakken'],
      'CDA':     [1,    2, 'Meer politie, ondermijning aanpakken'],
      'NSC':     [1,    1, 'Rechtsstaat versterken'],
      'VVD':     [1.5,  2, 'Meer politie, hogere straffen'],
      'BBB':     [1,    1, 'Meer politie in de regio'],
      'SGP':     [1.5,  1, 'Harder straffen'],
      'JA21':    [2,    2, 'Hogere straffen, meer politie'],
      'PVV':     [2,    2, 'Hogere straffen, meer politie'],
      'FvD':     [1.5,  1, 'Harder straffen'],
      'DNA':     [2,    2, 'Meer politie, hogere straffen']
    }
  },
  {
    id: 'eu',
    naam: 'Europa',
    links: 'meer Europese samenwerking',
    rechts: 'minder EU, terug naar nationaal',
    urgentie: 1,
    reden: 'Uitvoering van het EU-migratiepact en Europese defensiesamenwerking lopen.',
    p: {
      'SP':      [1,    1, 'Minder macht naar Brussel'],
      'PvdD':    [0,    1, 'Kritisch op het EU-landbouwbeleid'],
      'PRO':     [-1.5, 1, 'Sterkere Europese samenwerking'],
      'DENK':    [0,    0, 'Weinig nadruk'],
      'Volt':    [-2,   3, 'Federaal Europa'],
      'D66':     [-1.5, 2, 'Meer Europese samenwerking'],
      '50PLUS':  [0.5,  0, 'Weinig nadruk'],
      'CU':      [0.5,  1, 'Samenwerken, geen superstaat'],
      'CDA':     [-0.5, 1, 'Europese samenwerking waar nodig'],
      'NSC':     [0.5,  1, 'Kritisch, soevereiniteit bewaken'],
      'VVD':     [-0.5, 1, 'EU voor economie en veiligheid'],
      'BBB':     [1,    1, 'Minder Brusselse regels'],
      'SGP':     [1,    1, 'Minder EU-bevoegdheden'],
      'JA21':    [1.5,  2, 'Minder EU, opt-outs'],
      'PVV':     [2,    2, 'Nexit, minder afdracht'],
      'FvD':     [2,    3, 'Nexit'],
      'DNA':     [2,    1, 'Minder EU']
    }
  }
];

// ---------------------------------------------------------------------------
// BRONNEN
// ---------------------------------------------------------------------------
// Waar komen de gegevens vandaan? Wordt in de app getoond onder "Bronnen" per thema.
//
// BRON_PROGRAMMAS: per partij waar je het verkiezingsprogramma vindt.
// De samenvattingen hierboven zijn door Claude gemaakt op basis van de programma's van 2025
// (zonder ze per regel na te slaan). Controleer ze dus zelf via deze links.
window.BRON_PROGRAMMAS = {
  'SP':      { titel: 'SP — website', url: 'https://www.sp.nl' },
  'PvdD':    { titel: 'Partij voor de Dieren — website', url: 'https://www.partijvoordedieren.nl' },
  'GL-PvdA': { titel: 'GroenLinks-PvdA — website (programma 2025)', url: 'https://groenlinks-pvda.nl' },
  'PRO':     { titel: 'GroenLinks-PvdA (nu PRO) — website (programma 2025)', url: 'https://groenlinks-pvda.nl' },
  'DENK':    { titel: 'DENK — website', url: 'https://www.bewegingdenk.nl' },
  'Volt':    { titel: 'Volt — website', url: 'https://voltnederland.org' },
  'D66':     { titel: 'D66 — website', url: 'https://d66.nl' },
  '50PLUS':  { titel: '50PLUS — website', url: 'https://50pluspartij.nl' },
  'CU':      { titel: 'ChristenUnie — website', url: 'https://www.christenunie.nl' },
  'CDA':     { titel: 'CDA — website', url: 'https://www.cda.nl' },
  'NSC':     { titel: 'NSC — website', url: 'https://partijnieuwsociaalcontract.nl' },
  'VVD':     { titel: 'VVD — website', url: 'https://www.vvd.nl' },
  'BBB':     { titel: 'BBB — website', url: 'https://boerburgerbeweging.nl' },
  'SGP':     { titel: 'SGP — website', url: 'https://sgp.nl' },
  'JA21':    { titel: 'JA21 — website', url: 'https://www.ja21.nl' },
  'PVV':     { titel: 'PVV — website', url: 'https://www.pvv.nl' },
  'DNA':     { titel: 'Groep Markuszower begint nieuwe partij (Welingelichte Kringen) — nog geen programma', url: 'https://www.welingelichtekringen.nl/samenleving/groep-markuszower-begint-nieuwe-partij-verdonk-sluit-zich-aan' },
  'FvD':     { titel: 'FvD — website', url: 'https://fvd.nl' }
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
