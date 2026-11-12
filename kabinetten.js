// Formatielab — eerdere kabinetten
//
// Hiermee vergelijkt de app een gekozen coalitie met wat echte kabinetten deden.
// Per kabinet:
//   naam, start, eind (null = zittend), gevallen (datum waarop het kabinet viel of ontslag nam; null = volle termijn)
//   partijen    = coalitiepartijen (ids uit data.js, of uit HISTORISCHE_PARTIJEN hieronder)
//   gedoogsteun = partijen die steun gaven zonder ministers
//   zetels      = Tweede Kamer-zetels van de coalitie bij de start
//   einde       = hoe het kabinet eindigde
//   bron        = link naar een overzicht van het kabinet
//   beleid      = per thema (ids uit standpunten.js):
//                   kort    = één regel (zichtbaar in de tabel)
//                   meer    = uitleg (zichtbaar na uitklappen)
//                   bronnen = lijst met links (zie AK, WET en ANALYSE hieronder)
//
// BRONNEN: officiële stukken in plaats van Wikipedia.
//   AK      = het regeer-, coalitie- of hoofdlijnenakkoord van elk kabinet (officielebekendmakingen.nl)
//   WET     = de wettekst op wetten.overheid.nl
//   ANALYSE = doorrekeningen van CPB/PBL en ambtelijke analyses (officielebekendmakingen.nl)
// Alle links zijn in november 2026 gecontroleerd op bestaan en juiste titel.
//
// LET OP: de samenvattingen zelf zijn door Claude (AI) geschreven uit eigen kennis en niet per regel
// nagelezen tegen deze stukken. Controleer de inhoud via de bronnen en pas hier aan wat niet klopt.

(function () {
  const OB = (doc, titel) => ({ titel, url: `https://zoek.officielebekendmakingen.nl/${doc}` });
  const WT = (bwb, titel) => ({ titel: `Wetten.overheid.nl — ${titel}`, url: `https://wetten.overheid.nl/${bwb}/` });

  // Het akkoord waarop elk kabinet gebaseerd was.
  const AK = {
    jetten:      OB('blg-1233855.pdf', 'Coalitieakkoord 2026-2030 "Aan de slag" (D66, VVD, CDA)'),
    schoof:      OB('blg-1143003.pdf', 'Hoofdlijnenakkoord "Hoop, lef en trots" (PVV, VVD, NSC, BBB), 2024'),
    rutte4:      OB('blg-1009826.pdf', 'Coalitieakkoord 2021-2025 "Omzien naar elkaar, vooruitkijken naar de toekomst"'),
    rutte3:      OB('blg-820240.pdf', 'Regeerakkoord 2017-2021 "Vertrouwen in de toekomst"'),
    rutte2:      OB('kst-33410-15.html', 'Kamerstuk 33410 nr. 15 — eindverslag informateurs met regeerakkoord "Bruggen slaan" (2012)'),
    rutte1:      OB('kst-32417-15.html', 'Kamerstuk 32417 nr. 15 — regeerakkoord VVD-CDA en gedoogakkoord met de PVV (2010)'),
    balkenende4: OB('kst-30891-4.html', 'Kamerstuk 30891 nr. 4 — coalitieakkoord "Samen werken, samen leven" (2007)'),
    balkenende2: OB('kst-28637-19.html', 'Kamerstuk 28637 nr. 19 — hoofdlijnenakkoord CDA, VVD en D66 (2003)'),
    balkenende1: OB('kst-28375-5.html', 'Kamerstuk 28375 nr. 5 — strategisch akkoord CDA, LPF en VVD (2002)')
  };
  window.KABINET_AKKOORD = AK;

  const WET = {
    zvw:          WT('BWBR0018450', 'Zorgverzekeringswet'),
    participatie: WT('BWBR0015703', 'Participatiewet'),
    jeugd:        WT('BWBR0034925', 'Jeugdwet'),
    wlz:          WT('BWBR0035917', 'Wet langdurige zorg'),
    aow:          WT('BWBR0002221', 'Algemene Ouderdomswet'),
    wia:          WT('BWBR0019057', 'Wet werk en inkomen naar arbeidsvermogen (WIA)')
  };

  const ANALYSE = {
    cpbSchoof:         OB('blg-1143526.pdf', 'CPB — Analyse hoofdlijnenakkoord 2025-2028'),
    ambtelijkSchoof:   OB('kst-36471-64.html', 'Kamerstuk 36471 nr. 64 — ambtelijke analyses hoofdlijnenakkoord'),
    cpbRutte4:         OB('blg-1014993.pdf', 'CPB — Analyse coalitieakkoord 2022-2025'),
    klimaatRutte4:     OB('kst-32813-974.html', 'Kamerstuk 32813 nr. 974 — uitwerking coalitieakkoord klimaat en energie'),
    cpbRutte3:         OB('blg-820238.pdf', 'CPB — Analyse economische en budgettaire effecten regeerakkoord 2017'),
    klimaatRutte3:     OB('blg-822106.pdf', 'PBL — Analyse regeerakkoord Rutte III: effecten op klimaat en energie'),
    cpbRutte2:         OB('blg-190824.pdf', 'CPB — Analyse economische effecten financieel kader regeerakkoord 2012'),
    koopkrachtRutte2:  OB('kst-33410-26.html', 'Kamerstuk 33410 nr. 26 — effecten regeerakkoord op koopkracht'),
    pblRutte2:         OB('kst-33410-30.html', 'Kamerstuk 33410 nr. 30 — PBL-analyse milieu- en natuureffecten "Bruggen slaan"'),
    pblRutte1:         OB('blg-88172.pdf', 'PBL — Analyse van het regeerakkoord 2010')
  };
  const NOS_AKKOORD = { titel: 'NOS — Coalitieakkoord: 19 miljard voor defensie, forse bezuinigingen op zorg, uitkeringen', url: 'https://nos.nl/l/2600274' };
  const NOS_VAKBONDEN = { titel: 'NOS — Vakbonden boos, scepsis over zorgplannen van coalitie', url: 'https://nos.nl/l/2600312' };
  const HVN_AKKOORD = { titel: 'Hart van Nederland — belangrijkste punten coalitieakkoord', url: 'https://www.hartvannederland.nl/politiek/beleid/artikelen/minderheidskabinet-aan-de-slag-belangrijkste-punten-coalitieakkoord' };
  const PARLEMENT_JETTEN = { titel: 'Parlement.com — kabinet-Jetten', url: 'https://www.parlement.com/kabinet-jetten-2026-heden' };

  // Partijen die niet meer bestaan, met hun kleur voor de chips.
  window.HISTORISCHE_PARTIJEN = {
    'PvdA': { kort: 'PvdA', naam: 'Partij van de Arbeid (nu onderdeel van PRO)', kleur: '#E3101C' },
    'LPF':  { kort: 'LPF',  naam: 'Lijst Pim Fortuyn', kleur: '#C9A800' }
  };

  // Welke oude partij hoort bij welke huidige partij (voor de vergelijking).
  window.PARTIJ_LIJN = {
    'PvdA': ['GL-PvdA', 'PRO']
  };

  window.KABINETTEN = [
    {
      id: 'jetten',
      naam: 'Kabinet-Jetten',
      start: '2026-02-23', eind: null, gevallen: null,
      partijen: ['D66', 'VVD', 'CDA'],
      zetels: 66,
      einde: 'Zittend minderheidskabinet; zoekt per onderwerp steun in de Kamer.',
      bron: 'https://www.parlement.com/kabinet-jetten-2026-heden',
      beleid: {
        begroting: {
          kort: 'Coalitieakkoord "Aan de slag": forse bezuinigingen op zorg en uitkeringen.',
          meer: 'Het akkoord combineert extra uitgaven (vooral defensie) met bezuinigingen op zorg en sociale zekerheid. Omdat het een minderheidskabinet is, moet het belastingplan met steun van oppositiepartijen door de Kamer; de stemming in november 2026 werd daardoor spannend.',
          bronnen: [NOS_AKKOORD, { titel: 'RD — Kabinet-Jetten zou vandaag zomaar kunnen kapseizen', url: 'https://www.rd.nl/a/kabinet-jetten-zou-vandaag-zomaar-kunnen-kapseizen' },
            { titel: 'CPB/PBL — analyse coalitieakkoord 2026-2030 (pdf)', url: 'https://www.pbl.nl/downloads/cpb-pbl-2026-publicatie-analyse-coalitieakkoord-2026-2030-6171pdf' }]
        },
        defensie: {
          kort: 'Ca. €19 mld extra voor defensie richting de NAVO-norm van 3,5%.',
          meer: 'Defensie is de grootste extra uitgavenpost in het akkoord. De verhoging volgt de afspraak op de NAVO-top in Den Haag (2025) om naar 3,5% van het bbp aan kerndefensie te gaan.',
          bronnen: [NOS_AKKOORD, AK.jetten]
        },
        migratie: {
          kort: 'Uitvoering EU-migratiepact en tweestatusstelsel; "vliegend team" voor de opvang.',
          meer: 'Het kabinet voert het Europese migratiepact uit en werkt aan een tweestatusstelsel. Na protesten bij opvanglocaties (o.a. Loosdrecht en Apeldoorn) kwam er een "vliegend team" om gemeenten te helpen.',
          bronnen: [PARLEMENT_JETTEN, HVN_AKKOORD]
        },
        stikstof: {
          kort: 'Wetsvoorstel (3 nov. 2026): emissiedoelen in plaats van stikstofdoelen, met €20 mld.',
          meer: 'Het voorstel vervangt de huidige stikstofdoelen door wettelijke emissiedoelen voor landbouw, industrie en mobiliteit. Doel is de vergunningsimpasse te doorbreken die ook woningbouw en infrastructuur remt.',
          bronnen: [PARLEMENT_JETTEN, AK.jetten]
        },
        wonen: {
          kort: 'Bouwproductie omhoog richting de gewenste 100.000 woningen per jaar.',
          meer: 'De bouwambitie hangt sterk af van het oplossen van de stikstofproblemen, omdat bouwprojecten anders geen vergunning krijgen.',
          bronnen: [HVN_AKKOORD]
        },
        zorg: {
          kort: 'Eigen risico omhoog (+€60 in 2027) om een hogere zorgpremie te voorkomen.',
          meer: 'Het akkoord remt de stijging van de zorguitgaven. Om een hogere zorgpremie te voorkomen gaat het eigen risico in 2027 met €60 omhoog. Vakbonden en zorgorganisaties reageerden kritisch.',
          bronnen: [NOS_AKKOORD, NOS_VAKBONDEN]
        },
        aow: {
          kort: 'AOW-leeftijd vanaf 2033 één-op-één koppelen aan de levensverwachting.',
          meer: 'Nu stijgt de AOW-leeftijd met twee derde van de stijging van de levensverwachting. Het kabinet wil dat vanaf 2033 weer één-op-één maken, waardoor de AOW-leeftijd sneller oploopt. Vakbonden zijn hier fel op tegen.',
          bronnen: [NOS_VAKBONDEN, WET.aow]
        },
        koopkracht: {
          kort: 'Bijna €1 mld steun na hogere energieprijzen.',
          meer: 'Door instabiliteit in het Midden-Oosten stegen energie- en brandstofprijzen; het kabinet trok bijna een miljard euro uit om burgers en bedrijven te steunen.',
          bronnen: [PARLEMENT_JETTEN]
        },
        veiligheid: {
          kort: 'Extra geld voor de politie (o.a. €95 mln in de deal over het belastingplan).',
          meer: 'In de afspraken om steun te krijgen voor het belastingplan kwam extra geld voor de politie.',
          bronnen: [{ titel: 'Welingelichte Kringen — Markuszower en het belastingplan', url: 'https://www.welingelichtekringen.nl/samenleving/markuszower-ziet-geen-argument-om-tegen-belastingplan-te-stemmen' }]
        }
      }
    },
    {
      id: 'schoof',
      naam: 'Kabinet-Schoof',
      start: '2024-07-02', eind: '2026-02-23', gevallen: '2025-06-03',
      partijen: ['PVV', 'VVD', 'NSC', 'BBB'],
      zetels: 88,
      einde: 'Gevallen: de PVV stapte op 3 juni 2025 uit de coalitie over het asielbeleid. NSC trok zich in augustus 2025 ook terug.',
      bron: 'https://www.parlement.com/kabinet-schoof-2024-2026',
      beleid: {
        migratie: {
          kort: '"Strengste asielbeleid ooit": asielnoodmaatregelenwet en tweestatusstelsel; viel over asiel.',
          meer: 'Het kabinet diende een asielnoodmaatregelenwet en een wet voor een tweestatusstelsel in, en wilde de spreidingswet intrekken. De PVV vond het tempo te laag, eiste extra maatregelen en stapte uit het kabinet toen de andere partijen die niet direct overnamen.',
          bronnen: [AK.schoof, ANALYSE.ambtelijkSchoof]
        },
        begroting: {
          kort: 'Bezuinigingen op o.a. ontwikkelingshulp en onderwijs.',
          meer: 'Om lastenverlichting en andere plannen te betalen werd fors bezuinigd op ontwikkelingssamenwerking en op onderwijs en wetenschap. Over de onderwijsbezuinigingen werd later deels een deal gesloten met oppositiepartijen.',
          bronnen: [AK.schoof, ANALYSE.cpbSchoof]
        },
        zorg: {
          kort: 'Eigen risico meer dan halveren, naar €165 in 2027.',
          meer: 'Een belangrijke wens van PVV en NSC: het verplichte eigen risico in de zorgverzekering zou vanaf 2027 ongeveer halveren.',
          bronnen: [AK.schoof]
        },
        defensie: {
          kort: 'Akkoord: NAVO-norm van 2% wettelijk vastleggen. In juni 2025 instemming met de nieuwe norm (3,5% + 1,5%).',
          meer: 'Nederland was in juni 2025 gastheer van de NAVO-top. Daar spraken de lidstaten af om richting 3,5% van het bbp aan kerndefensie en 1,5% aan aanverwante uitgaven te gaan.',
          bronnen: [AK.schoof]
        },
        stikstof: {
          kort: 'Minder nadruk op stikstofdoelen; boeren ontzien.',
          meer: 'Met BBB in de coalitie lag de nadruk op perspectief voor boeren in plaats van harde reductiedoelen. Een structurele oplossing voor de vergunningverlening kwam er niet.',
          bronnen: [AK.schoof]
        },
        eu: {
          kort: 'Opt-out voor het Europese migratiebeleid aangevraagd.',
          meer: 'Het kabinet vroeg de Europese Commissie om een uitzondering (opt-out) op het Europese asiel- en migratiebeleid. Zo\'n opt-out vereist een verdragswijziging en is in de praktijk vrijwel onhaalbaar.',
          bronnen: [AK.schoof]
        },
        wonen: {
          kort: 'Doel van 100.000 nieuwe woningen per jaar.',
          meer: 'De bouwambitie bleef, maar het tempo werd geremd door stikstof, netcongestie en hoge bouwkosten.',
          bronnen: [AK.schoof]
        }
      }
    },
    {
      id: 'rutte4',
      naam: 'Kabinet-Rutte IV',
      start: '2022-01-10', eind: '2024-07-02', gevallen: '2023-07-07',
      partijen: ['VVD', 'D66', 'CDA', 'CU'],
      zetels: 78,
      einde: 'Gevallen op 7 juli 2023 over het asielbeleid (beperking van gezinshereniging).',
      bron: 'https://www.parlement.com/kabinet-rutte-iv-2022-2024',
      beleid: {
        defensie: {
          kort: 'Akkoord: naar het EU-NAVO-gemiddelde. Na de Russische inval naar de NAVO-norm van 2%, en grote steun aan Oekraïne.',
          meer: 'Na de Russische invasie van Oekraïne in februari 2022 werd het defensiebudget structureel verhoogd tot de NAVO-norm van 2% van het bbp. Nederland gaf veel militaire steun, waaronder F-16\'s.',
          bronnen: [AK.rutte4]
        },
        stikstof: {
          kort: 'Doel: stikstofuitstoot in 2030 halveren; provinciale plannen liepen vast.',
          meer: 'Het kabinet koos voor halvering van de stikstofuitstoot in 2030, met gebiedsprocessen per provincie. Dat leidde tot grote boerenprotesten en de opkomst van BBB. Een Landbouwakkoord met de sector mislukte in 2023.',
          bronnen: [AK.rutte4]
        },
        klimaat: {
          kort: 'Klimaatdoel 2030 naar minstens 55% minder CO₂; klimaatfonds van €35 mld.',
          meer: 'Rutte IV verhoogde het klimaatdoel en legde wettelijk vast dat Nederland in 2050 klimaatneutraal moet zijn. Er kwam een fonds voor investeringen in de energietransitie.',
          bronnen: [AK.rutte4, ANALYSE.klimaatRutte4]
        },
        koopkracht: {
          kort: 'Minimumloon omhoog (akkoord: +7,5%; door de inflatie +10% in 2023) en een prijsplafond voor energie.',
          meer: 'Door de hoge inflatie in 2022 werd het minimumloon op 1 januari 2023 extra verhoogd. Huishoudens kregen een prijsplafond op energie en een energietoeslag voor lage inkomens.',
          bronnen: [AK.rutte4]
        },
        wonen: {
          kort: 'Weer een minister voor Volkshuisvesting; regulering van middenhuur.',
          meer: 'Minister De Jonge kreeg volkshuisvesting als apart ministerspost en maakte plannen voor meer betaalbare woningen en huurregulering in het middensegment.',
          bronnen: [AK.rutte4]
        },
        migratie: {
          kort: 'Opvangcrisis in Ter Apel; spreidingswet; viel over gezinshereniging.',
          meer: 'In de zomer van 2022 sliepen asielzoekers buiten bij Ter Apel. Het kabinet diende de spreidingswet in. In juli 2023 viel het kabinet: de VVD wilde gezinshereniging van oorlogsvluchtelingen beperken, de ChristenUnie niet.',
          bronnen: [AK.rutte4]
        },
        zorg: {
          kort: 'Eigen risico bevroren.',
          meer: 'Het verplichte eigen risico bleef op €385 staan.',
          bronnen: [AK.rutte4]
        },
        aow: {
          kort: 'Wet toekomst pensioenen (2023): nieuw pensioenstelsel.',
          meer: 'Uitwerking van het pensioenakkoord van 2019: pensioenen worden persoonlijker en minder afhankelijk van de rekenrente. De wet ging in op 1 juli 2023.',
          bronnen: [AK.rutte4]
        },
        eu: {
          kort: 'Steun aan EU-sancties tegen Rusland.',
          meer: 'Nederland steunde de opeenvolgende Europese sanctiepakketten tegen Rusland en de kandidaat-lidmaatschapsstatus van Oekraïne.',
          bronnen: [AK.rutte4]
        },
        begroting: {
          kort: 'Grote investeringen, deels met geleend geld.',
          meer: 'Het akkoord bevatte forse extra uitgaven voor klimaat, stikstof, defensie en onderwijs. Daarnaast kwamen er dure koopkrachtmaatregelen tegen de inflatie.',
          bronnen: [AK.rutte4, ANALYSE.cpbRutte4]
        },
        veiligheid: {
          kort: 'Aanpak van ondermijning en georganiseerde misdaad.',
          meer: 'Na de moorden op Derk Wiersum en Peter R. de Vries ging extra geld naar de aanpak van georganiseerde misdaad en de beveiliging van bedreigde personen.',
          bronnen: [AK.rutte4]
        }
      }
    },
    {
      id: 'rutte3',
      naam: 'Kabinet-Rutte III',
      start: '2017-10-26', eind: '2022-01-10', gevallen: '2021-01-15',
      partijen: ['VVD', 'CDA', 'D66', 'CU'],
      zetels: 76,
      einde: 'Ontslag genomen op 15 januari 2021 vanwege de toeslagenaffaire.',
      bron: 'https://www.parlement.com/kabinet-rutte-iii-2017-2022',
      beleid: {
        klimaat: {
          kort: 'Klimaatakkoord (2019); gaswinning in Groningen afgebouwd.',
          meer: 'In het Klimaatakkoord maakten overheid, bedrijven en organisaties afspraken per sector om de CO₂-uitstoot in 2030 met 49% te verminderen. Na de aardbevingen werd besloten de gaswinning in Groningen te beëindigen.',
          bronnen: [AK.rutte3, ANALYSE.klimaatRutte3]
        },
        stikstof: {
          kort: 'Na de PAS-uitspraak (2019): 100 km/u overdag en een stikstofwet.',
          meer: 'De Raad van State keurde in mei 2019 het Programma Aanpak Stikstof af, waardoor veel bouwprojecten stilvielen. Het kabinet verlaagde de maximumsnelheid overdag naar 100 km/u en maakte een stikstofwet met reductiedoelen.',
          bronnen: [AK.rutte3]
        },
        aow: {
          kort: 'Pensioenakkoord (2019): stijging van de AOW-leeftijd vertraagd.',
          meer: 'De AOW-leeftijd bleef enkele jaren op 66 jaar en 4 maanden staan, en stijgt daarna met twee derde van de stijging van de levensverwachting (in plaats van één-op-één). Ook werd een nieuw pensioenstelsel afgesproken.',
          bronnen: [AK.rutte3, WET.aow]
        },
        defensie: {
          kort: 'Ca. €1,5 mld per jaar extra.',
          meer: 'Na jaren van bezuinigingen kreeg defensie structureel meer geld, maar bleef onder de NAVO-norm van 2%.',
          bronnen: [AK.rutte3]
        },
        begroting: {
          kort: 'Extra investeringen; vanaf 2020 grote coronasteunpakketten.',
          meer: 'De eerste jaren was er ruimte voor investeringen en lastenverlichting. Vanaf maart 2020 gaf het kabinet tientallen miljarden uit aan steun voor banen en bedrijven (o.a. de NOW-regeling).',
          bronnen: [AK.rutte3, ANALYSE.cpbRutte3]
        },
        migratie: {
          kort: 'Akkoord: kinderpardon blijft zoals het is. In 2019 toch een afsluitende regeling.',
          meer: 'Na veel maatschappelijke druk (o.a. rond Lili en Howick) kwam er een afsluitende regeling voor langdurig in Nederland verblijvende kinderen; daarna verviel het kinderpardon.',
          bronnen: [AK.rutte3]
        },
        zorg: {
          kort: 'Eigen risico bevroren op €385.',
          meer: 'Het eigen risico bleef de hele periode gelijk. Daarnaast drukte de coronacrisis vanaf 2020 zwaar op de zorg.',
          bronnen: [AK.rutte3]
        },
        koopkracht: {
          kort: 'Toeslagenaffaire: duizenden ouders onterecht als fraudeur behandeld.',
          meer: 'De Belastingdienst had jarenlang ouders ten onrechte als fraudeur aangemerkt en kinderopvangtoeslag teruggevorderd. Na het rapport "Ongekend onrecht" nam het kabinet ontslag en kwam er een compensatieregeling.',
          bronnen: [AK.rutte3]
        },
        eu: {
          kort: 'Kritische houding in Europese begrotingsonderhandelingen ("zuinige vier").',
          meer: 'Nederland trok samen met o.a. Oostenrijk, Denemarken en Zweden op tegen hogere EU-bijdragen en giften in het Europese coronaherstelfonds.',
          bronnen: [AK.rutte3]
        }
      }
    },
    {
      id: 'rutte2',
      naam: 'Kabinet-Rutte II',
      start: '2012-11-05', eind: '2017-10-26', gevallen: null,
      partijen: ['VVD', 'PvdA'],
      zetels: 79,
      einde: 'Volle termijn uitgezeten.',
      bron: 'https://www.parlement.com/kabinet-rutte-ii-2012-2017',
      beleid: {
        begroting: {
          kort: 'Grote bezuinigingen en lastenverzwaringen; in 2016 €5 mld lastenverlichting.',
          meer: 'In de nasleep van de euro- en kredietcrisis bezuinigde het kabinet om het tekort onder de Europese norm van 3% te krijgen. Toen de economie herstelde, kwam in 2016 een lastenverlichting.',
          bronnen: [AK.rutte2, ANALYSE.cpbRutte2]
        },
        wonen: {
          kort: 'Verhuurderheffing, inkomensafhankelijke huurverhoging, afbouw hypotheekrenteaftrek.',
          meer: 'Woningcorporaties moesten een verhuurderheffing betalen, wat later werd gezien als rem op sociale woningbouw. Hogere inkomens in sociale huurwoningen kregen extra huurverhoging. Het maximale aftrektarief van de hypotheekrente werd stapsgewijs verlaagd.',
          bronnen: [AK.rutte2]
        },
        zorg: {
          kort: 'Decentralisaties (2015): jeugdzorg en langdurige zorg naar gemeenten.',
          meer: 'Gemeenten werden verantwoordelijk voor jeugdzorg (Jeugdwet) en een groot deel van de ondersteuning thuis (Wmo), met minder budget. Zware langdurige zorg ging naar de Wet langdurige zorg.',
          bronnen: [AK.rutte2, WET.jeugd, WET.wlz]
        },
        koopkracht: {
          kort: 'Participatiewet (2015) en kortere WW-duur.',
          meer: 'De Participatiewet verving de bijstand, de WSW en deels de Wajong, met als doel meer mensen aan het werk. De Wet werk en zekerheid verkortte de maximale WW-duur en veranderde het ontslagrecht.',
          bronnen: [AK.rutte2, WET.participatie, ANALYSE.koopkrachtRutte2]
        },
        aow: {
          kort: 'AOW-leeftijd versneld omhoog (67 in 2021).',
          meer: 'De stijging van de AOW-leeftijd werd versneld: 66 jaar in 2018 en 67 jaar in 2021, daarna gekoppeld aan de levensverwachting.',
          bronnen: [AK.rutte2, WET.aow]
        },
        klimaat: {
          kort: 'Energieakkoord (2013); Urgenda-vonnis (2015).',
          meer: 'In het Energieakkoord voor duurzame groei spraken ruim 40 partijen af om meer duurzame energie op te wekken en energie te besparen. In 2015 oordeelde de rechter in de Urgenda-zaak dat de Staat meer moest doen tegen CO₂-uitstoot.',
          bronnen: [AK.rutte2, ANALYSE.pblRutte2]
        },
        migratie: {
          kort: 'Kinderpardon (2013); vluchtelingencrisis van 2015; EU-Turkijedeal (2016).',
          meer: 'Er kwam een (strikte) kinderpardonregeling. In 2015 kwamen veel vluchtelingen uit Syrië naar Europa. Tijdens het Nederlandse EU-voorzitterschap werd in 2016 de deal met Turkije gesloten om de instroom te beperken.',
          bronnen: [AK.rutte2]
        },
        defensie: {
          kort: 'Na jaren bezuinigen vanaf 2014 weer wat extra geld.',
          meer: 'Na de annexatie van de Krim en het neerhalen van vlucht MH17 (2014) kwam er weer extra geld voor defensie, na eerdere bezuinigingen.',
          bronnen: [AK.rutte2]
        },
        veiligheid: {
          kort: 'Nationale Politie (2013).',
          meer: 'De 25 regionale politiekorpsen en het KLPD werden samengevoegd tot één Nationale Politie. De reorganisatie verliep moeizaam.',
          bronnen: [AK.rutte2]
        },
        eu: {
          kort: 'Referendum over het Oekraïne-verdrag (2016): nee.',
          meer: 'Na een burgerinitiatief stemde een meerderheid in een raadgevend referendum tegen het associatieverdrag met Oekraïne. Het kabinet ratificeerde het verdrag later toch, met een aanvullende verklaring.',
          bronnen: [AK.rutte2]
        }
      }
    },
    {
      id: 'rutte1',
      naam: 'Kabinet-Rutte I',
      start: '2010-10-14', eind: '2012-11-05', gevallen: '2012-04-23',
      partijen: ['VVD', 'CDA'],
      gedoogsteun: ['PVV'],
      zetels: 52,
      einde: 'Gevallen in april 2012: de PVV stapte uit het Catshuisoverleg over bezuinigingen en trok de gedoogsteun in.',
      bron: 'https://www.parlement.com/kabinet-rutte-i-2010-2012',
      beleid: {
        begroting: {
          kort: 'Bezuinigingspakket van ca. €18 mld; na de val het Lenteakkoord.',
          meer: 'Het kabinet bezuinigde fors vanwege de kredietcrisis. Toen in 2012 nog meer nodig was, mislukten de onderhandelingen met de PVV in het Catshuis. Daarna sloten VVD, CDA, D66, GroenLinks en ChristenUnie het Lenteakkoord.',
          bronnen: [AK.rutte1]
        },
        migratie: {
          kort: 'Strenger immigratiebeleid, afgesproken met gedoogpartner PVV.',
          meer: 'In het gedoogakkoord stonden een strengere toelating van gezinsmigranten, strengere inburgeringseisen en een verbod op gezichtsbedekkende kleding.',
          bronnen: [AK.rutte1]
        },
        defensie: {
          kort: 'Bezuinigingen van ca. €1 mld, o.a. alle tanks verkocht.',
          meer: 'Defensie moest structureel bezuinigen. Onder meer de laatste Leopard-tanks werden afgestoten en er verdwenen duizenden banen.',
          bronnen: [AK.rutte1]
        },
        aow: {
          kort: 'AOW-leeftijd omhoog naar 66 en 67; in het Lenteakkoord versneld.',
          meer: 'Met werkgevers en vakbonden werd een pensioenakkoord gesloten om de AOW-leeftijd te verhogen. Het Lenteakkoord (2012) versnelde die stijging.',
          bronnen: [AK.rutte1, WET.aow]
        },
        zorg: {
          kort: 'Eigen risico omhoog; onderdelen uit het basispakket.',
          meer: 'Om de zorgkosten te beheersen ging het eigen risico omhoog en werden enkele behandelingen uit het basispakket gehaald.',
          bronnen: [AK.rutte1]
        },
        klimaat: {
          kort: 'Subsidie voor duurzame energie omgezet in de goedkopere SDE+.',
          meer: 'De subsidieregeling werd zo ingericht dat de goedkoopste duurzame projecten eerst geld kregen. Critici vonden de klimaatambitie laag.',
          bronnen: [AK.rutte1, ANALYSE.pblRutte1]
        },
        eu: {
          kort: 'Steun aan noodleningen voor Griekenland.',
          meer: 'Nederland stemde in met Europese steunpakketten voor Griekenland en het noodfonds, onder strenge voorwaarden. De PVV was daar fel tegen.',
          bronnen: [AK.rutte1]
        }
      }
    },
    {
      id: 'balkenende4',
      naam: 'Kabinet-Balkenende IV',
      start: '2007-02-22', eind: '2010-10-14', gevallen: '2010-02-20',
      partijen: ['CDA', 'PvdA', 'CU'],
      zetels: 80,
      einde: 'Gevallen in februari 2010: de PvdA stapte uit over verlenging van de missie in Uruzgan.',
      bron: 'https://www.parlement.com/kabinet-balkenende-iv-2007-2010',
      beleid: {
        begroting: {
          kort: 'Kredietcrisis: banken gered (o.a. ABN AMRO genationaliseerd, 2008); daarna heroverwegingen.',
          meer: 'In 2008 kocht de Staat de Nederlandse delen van Fortis en ABN AMRO en kregen o.a. ING, Aegon en SNS kapitaalsteun. Daarna liet het kabinet ambtelijke "heroverwegingen" maken als basis voor latere bezuinigingen.',
          bronnen: [AK.balkenende4]
        },
        migratie: {
          kort: 'Generaal pardon voor ca. 28.000 asielzoekers (2007).',
          meer: 'Asielzoekers die al lang in Nederland waren onder de oude Vreemdelingenwet, kregen eenmalig een verblijfsvergunning. Dit was een belangrijke wens van PvdA en ChristenUnie.',
          bronnen: [AK.balkenende4]
        },
        wonen: {
          kort: 'Aanpak van 40 probleemwijken ("Vogelaarwijken").',
          meer: 'Minister Vogelaar wees 40 wijken aan waar extra geld en aandacht naartoe ging, betaald door woningcorporaties.',
          bronnen: [AK.balkenende4]
        },
        klimaat: {
          kort: 'Programma "Schoon en Zuinig": doel 30% minder CO₂ in 2020.',
          meer: 'Het kabinet stelde een ambitieus klimaatdoel, maar door de economische crisis en weinig concrete maatregelen werd dat niet gehaald.',
          bronnen: [AK.balkenende4]
        },
        aow: {
          kort: 'Besluit om de AOW-leeftijd naar 67 te verhogen (2009).',
          meer: 'Nadat werkgevers en vakbonden geen alternatief vonden, besloot het kabinet in 2009 de AOW-leeftijd stapsgewijs te verhogen naar 67 jaar.',
          bronnen: [AK.balkenende4, WET.aow]
        },
        zorg: {
          kort: 'Verplicht eigen risico (2008) in plaats van de no-claim.',
          meer: 'De no-claimteruggave verdween; in plaats daarvan kwam een verplicht eigen risico, met een compensatie voor chronisch zieken.',
          bronnen: [AK.balkenende4]
        },
        defensie: {
          kort: 'Uruzgan-missie; het kabinet viel over de verlenging.',
          meer: 'Nederland leidde een missie in de Afghaanse provincie Uruzgan. Toen de NAVO om verlenging vroeg, kwam het kabinet er niet uit en stapte de PvdA uit het kabinet.',
          bronnen: [AK.balkenende4]
        }
      }
    },
    {
      id: 'balkenende2',
      naam: 'Kabinet-Balkenende II',
      start: '2003-05-27', eind: '2006-07-07', gevallen: '2006-06-30',
      partijen: ['CDA', 'VVD', 'D66'],
      zetels: 78,
      einde: 'Gevallen in juni 2006: D66 stapte uit na de affaire rond het paspoort van Ayaan Hirsi Ali.',
      bron: 'https://www.parlement.com/kabinet-balkenende-ii-2003-2006',
      beleid: {
        migratie: {
          kort: 'Streng vreemdelingenbeleid (minister Verdonk): terugkeer en inburgeringsplicht.',
          meer: 'Minister Verdonk wilde ca. 26.000 uitgeprocedeerde asielzoekers laten terugkeren en voerde een inburgeringsplicht in, ook voor nieuwkomers in het buitenland. Haar optreden rond het paspoort van Hirsi Ali leidde tot de val van het kabinet.',
          bronnen: [AK.balkenende2]
        },
        begroting: {
          kort: 'Forse bezuinigingen en hervormingen.',
          meer: 'Het kabinet bezuinigde in een periode van economische stilstand en hervormde sociale zekerheid, zorg en pensioenen onder het motto "Meedoen, meer werk, minder regels".',
          bronnen: [AK.balkenende2]
        },
        zorg: {
          kort: 'Zorgverzekeringswet (2006): één basisverzekering bij private verzekeraars.',
          meer: 'Het onderscheid tussen ziekenfonds en particuliere verzekering verdween. Iedereen kreeg dezelfde verplichte basisverzekering, met zorgtoeslag voor lagere inkomens.',
          bronnen: [AK.balkenende2, WET.zvw]
        },
        aow: {
          kort: 'VUT en prepensioen fiscaal afgeschaft; levensloopregeling.',
          meer: 'Om mensen langer te laten werken werd vervroegd uittreden fiscaal ontmoedigd. De levensloopregeling moest sparen voor verlof mogelijk maken.',
          bronnen: [AK.balkenende2]
        },
        koopkracht: {
          kort: 'WW en arbeidsongeschiktheid versoberd (WIA, 2006).',
          meer: 'De WAO werd vervangen door de WIA, met strengere keuringen. Ook de WW werd versoberd.',
          bronnen: [AK.balkenende2, WET.wia]
        },
        defensie: {
          kort: 'Besluit tot de missie in Uruzgan (2006).',
          meer: 'Na lang debat stemde de Kamer in met deelname aan de NAVO-missie in Uruzgan (Afghanistan).',
          bronnen: [AK.balkenende2]
        },
        eu: {
          kort: 'Referendum over de Europese Grondwet (2005): nee.',
          meer: 'In het eerste landelijke referendum sinds lange tijd stemde 61,5% tegen het Europese Grondwetverdrag, ondanks steun van de grote partijen.',
          bronnen: [AK.balkenende2]
        }
      }
    },
    {
      id: 'balkenende1',
      naam: 'Kabinet-Balkenende I',
      start: '2002-07-22', eind: '2003-05-27', gevallen: '2002-10-16',
      partijen: ['CDA', 'LPF', 'VVD'],
      zetels: 93,
      einde: 'Gevallen na 87 dagen door ruzies binnen de LPF.',
      bron: 'https://www.parlement.com/kabinet-balkenende-i-2002-2003',
      beleid: {
        migratie: {
          kort: 'Strenger vreemdelingenbeleid aangekondigd; eerste minister voor Vreemdelingenzaken.',
          meer: 'Na de moord op Pim Fortuyn kwam de LPF groot in het kabinet. Hilbrand Nawijn (LPF) werd minister voor Vreemdelingenzaken en Integratie en kondigde strenger beleid aan, maar het kabinet viel snel.',
          bronnen: [AK.balkenende1]
        },
        begroting: {
          kort: 'Bezuinigingen aangekondigd, door de snelle val weinig uitgevoerd.',
          meer: 'Het kabinet viel al na 87 dagen door ruzies tussen LPF-bewindslieden, waardoor de meeste plannen niet werden uitgevoerd.',
          bronnen: [AK.balkenende1]
        }
      }
    }
  ];
})();

// ---------------------------------------------------------------------------
// OFFICIËLE BRONNEN per kabinet
// ---------------------------------------------------------------------------
// formatie = Kamerstukdossier van de kabinetsformatie op officielebekendmakingen.nl
//            (verslagen van informateurs, het regeer-/coalitieakkoord, benoemingsbesluiten).
//            Gecontroleerd in november 2026. Kamerstukken vanaf 1995 staan in de gewone
//            parlementaire zoekfunctie; oudere stukken in de historische collectie.
// archief  = pagina in de index "Bewindslieden" van het Nationaal Archief (ministers en
//            staatssecretarissen met datums). Deze index loopt tot 2010.
// De notulen van de ministerraad worden pas na 25 jaar openbaar (Nationaal Archief).
window.KABINET_OFFICIEEL = {
  jetten:      { formatie: { dossier: '36848', jaar: 2025 } },
  schoof:      { formatie: { dossier: '36471', jaar: 2023 } },
  rutte4:      { formatie: { dossier: '35788', jaar: 2021 } },
  rutte3:      { formatie: { dossier: '34700', jaar: 2017 } },
  rutte2:      { formatie: { dossier: '33410', jaar: 2012 } },
  rutte1:      { formatie: { dossier: '32417', jaar: 2010 } },
  balkenende4: { formatie: { dossier: '30891', jaar: 2006 },
                 archief: 'https://www.nationaalarchief.nl/onderzoeken/index/nt00334/99fed0df-5276-4c0e-89d3-0431a95003db' },
  balkenende2: { formatie: { dossier: '28637', jaar: 2003 } },
  balkenende1: { formatie: { dossier: '28375', jaar: 2002 },
                 archief: 'https://www.nationaalarchief.nl/onderzoeken/index/nt00334/361993cb-d0c1-4148-93bf-dcc8e3e5b52e' }
};

window.BRON_ARCHIEVEN = [
  { titel: 'Overheid.nl — zoeken in (historische) parlementaire documenten', url: 'https://www.overheid.nl/help/officiele-bekendmakingen/zoeken-in-historische-parlementaire-documenten' },
  { titel: 'Officiële bekendmakingen — parlementaire documenten vanaf 1995', url: 'https://zoek.officielebekendmakingen.nl/uitgebreidzoeken/parlementair' },
  { titel: 'Nationaal Archief — index Bewindslieden (1798–2010)', url: 'https://www.nationaalarchief.nl/onderzoeken/index/nt00334' },
  { titel: 'Nationaal Archief — notulen ministerraad openbaar na 25 jaar', url: 'https://www.nationaalarchief.nl/beleven/nieuws/openbaarheidsdag-2021' }
];
