// Formatielab — data
// Pas hier partijen, kleuren en zetelaantallen aan. Geen andere bestanden nodig.
//
// PARTIJEN: vaste gegevens per partij.
//   kort      = korte naam in lijsten en chips
//   naam      = volledige naam (tooltip)
//   kleur     = kleur in het halfrond
//   volgorde  = plek in het halfrond, ruwweg van links (laag) naar rechts (hoog)
window.PARTIJEN = {
  'SP':      { kort: 'SP',       naam: 'Socialistische Partij',          kleur: '#F15A24', volgorde: 10 },
  'PvdD':    { kort: 'PvdD',     naam: 'Partij voor de Dieren',          kleur: '#0B4A2F', volgorde: 20 },
  // PRO (Progressief Nederland) is sinds de fusie in 2026 de nieuwe naam van GroenLinks-PvdA.
  // zelfdeAls koppelt ze, zodat bv. de Eerste Kamer-zetels bij beide namen meetellen.
  'GL-PvdA': { kort: 'GL-PvdA',  naam: 'GroenLinks-PvdA',                kleur: '#D7263D', volgorde: 30, zelfdeAls: ['PRO'] },
  'PRO':     { kort: 'PRO',      naam: 'Progressief Nederland (voorheen GroenLinks-PvdA)', kleur: '#D7263D', volgorde: 30, zelfdeAls: ['GL-PvdA'] },
  'DENK':    { kort: 'DENK',     naam: 'DENK',                           kleur: '#41C8C3', volgorde: 40 },
  'Volt':    { kort: 'Volt',     naam: 'Volt',                           kleur: '#502379', volgorde: 50 },
  'D66':     { kort: 'D66',      naam: 'Democraten 66',                  kleur: '#3DB54A', volgorde: 60 },
  '50PLUS':  { kort: '50PLUS',   naam: '50PLUS',                         kleur: '#C2187C', volgorde: 70 },
  'CU':      { kort: 'CU',       naam: 'ChristenUnie',                   kleur: '#00A0E3', volgorde: 80 },
  'CDA':     { kort: 'CDA',      naam: 'Christen-Democratisch Appèl',    kleur: '#00785A', volgorde: 90 },
  'OPNL':    { kort: 'OPNL',     naam: 'Onafhankelijke Politiek Nederland', kleur: '#8A8A8A', volgorde: 95 },
  'NSC':     { kort: 'NSC',      naam: 'Nieuw Sociaal Contract',         kleur: '#F2C200', volgorde: 100 },
  'VVD':     { kort: 'VVD',      naam: 'Volkspartij voor Vrijheid en Democratie', kleur: '#1F5AA6', volgorde: 110 },
  'BBB':     { kort: 'BBB',      naam: 'BoerBurgerBeweging',             kleur: '#B5C800', volgorde: 120 },
  'SGP':     { kort: 'SGP',      naam: 'Staatkundig Gereformeerde Partij', kleur: '#E37B12', volgorde: 130 },
  'JA21':    { kort: 'JA21',     naam: 'JA21',                           kleur: '#14213D', volgorde: 140 },
  'PVV':     { kort: 'PVV',      naam: 'Partij voor de Vrijheid',        kleur: '#62A8E5', volgorde: 150 },
  'DNA':     { kort: 'Gr. Markuszower', naam: 'Groep Markuszower (De Nederlandse Alliantie), in jan. 2026 afgesplitst van de PVV', kleur: '#3F3D8F', volgorde: 152 },
  'FvD':     { kort: 'FvD',      naam: 'Forum voor Democratie',          kleur: '#7B1E1E', volgorde: 160 }
};

// EERSTE_KAMER: zetelverdeling van de Eerste Kamer (75 zetels).
// Geldt voor alle scenario's, want de Eerste Kamer wordt apart gekozen.
// Partijen die hier staan maar niet in de Tweede Kamer, tellen mee in het totaal
// maar kunnen niet in een coalitie. Controleer de cijfers (tussentijdse afsplitsingen!).
window.EERSTE_KAMER = {
  // Terugval als eerstekamer.js ontbreekt. Gecontroleerd op https://www.eerstekamer.nl/fracties (12 nov 2026).
  // eerstekamer.js (automatisch, dagelijks) overschrijft dit.
  titel: 'Eerste Kamer — fracties 12 november 2026',
  bron: 'https://www.eerstekamer.nl/fracties',
  zetels: {
    'PRO': 14, 'BBB': 11, 'VVD': 9, 'D66': 7, 'CDA': 6, 'PVV': 4, 'SP': 3, 'CU': 3, 'FvD': 3,
    'PvdD': 2, 'JA21': 2, 'Volt': 2, 'SGP': 2, '50PLUS': 1, 'OPNL': 1,
    'Fractie-Visseren-Hamakers': 1, 'Fractie-Beukering': 1, 'Fractie-Walenkamp': 1,
    'Fractie-Van de Sanden': 1, 'Fractie-Van Gasteren': 1
  }
};

// SCENARIOS: zetelverdeling per uitslag of peiling.
// Voeg een nieuw scenario toe door een blok te kopiëren en de aantallen aan te passen.
// Controleer de cijfers altijd met de officiële bron (Kiesraad).
// Optioneel: bron (link), marge ({ partij: [laag, hoog] }) voor peilingen met onzekerheid.
window.SCENARIOS = [
  {
    id: 'peilnl-20261106',
    datum: '2026-11-06',
    titel: 'Peiling Peil.nl (Maurice de Hond) — 6 november 2026',
    bron: 'https://politpro.eu/nl/nederland/peilingen/peilnl-2026-11-06/parlementsverkiezingen',
    zetels: {
      'PRO': 31, 'JA21': 21, 'PVV': 18, 'D66': 14, 'VVD': 13, 'FvD': 12, 'CDA': 11,
      '50PLUS': 5, 'PvdD': 5, 'SP': 5, 'SGP': 4, 'Volt': 4, 'CU': 3, 'DENK': 3, 'BBB': 1
    }
  },
  {
    id: 'kamer-nu',
    titel: 'Huidige Tweede Kamer — fracties november 2026',
    bron: 'https://www.tweedekamer.nl/kamerleden_en_commissies/fracties',
    // Terugval als tweedekamer.js ontbreekt; gecontroleerd met de open data van de Tweede Kamer (12 nov 2026).
    // tweedekamer.js (automatisch, dagelijks) overschrijft dit.
    zetels: {
      'D66': 26, 'VVD': 22, 'PRO': 20, 'PVV': 19, 'CDA': 18, 'JA21': 9, 'FvD': 7, 'DNA': 7,
      'BBB': 3, 'DENK': 3, 'SGP': 3, 'PvdD': 3, 'CU': 3, 'SP': 3, '50PLUS': 2, 'Volt': 1, 'Lid Keijzer': 1
    }
  },
  {
    id: 'tk2025',
    titel: 'Tweede Kamer — uitslag 29 oktober 2025',
    zetels: {
      'D66': 26, 'PVV': 26, 'VVD': 22, 'GL-PvdA': 20, 'CDA': 18, 'JA21': 9, 'FvD': 7,
      'BBB': 4, 'DENK': 3, 'SGP': 3, 'PvdD': 3, 'CU': 3, 'SP': 3, '50PLUS': 2, 'Volt': 1
    }
  },
  {
    id: 'tk2023',
    titel: 'Tweede Kamer — uitslag 22 november 2023',
    zetels: {
      'PVV': 37, 'GL-PvdA': 25, 'VVD': 24, 'NSC': 20, 'D66': 9, 'BBB': 7, 'CDA': 5, 'SP': 5,
      'DENK': 3, 'PvdD': 3, 'FvD': 3, 'SGP': 3, 'CU': 3, 'Volt': 2, 'JA21': 1
    }
  }
];
