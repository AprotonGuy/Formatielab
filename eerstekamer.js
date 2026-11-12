// FormatieLab - actuele fracties van de Eerste Kamer
// AUTOMATISCH GEMAAKT door eerstekamer-ophalen.ps1 op 2026-11-12. Niet met de hand aanpassen.
// Bron: https://www.eerstekamer.nl/fracties
(function () {
  var eenmansfracties = {
    'Fractie-Visseren-Hamakers': { kort: 'Visseren-Hamakers', naam: 'Fractie-Visseren-Hamakers (eenmansfractie in de Eerste Kamer, afgesplitst)', kleur: '#9a9a9a', volgorde: 999 },
    'Fractie-Beukering': { kort: 'Beukering', naam: 'Fractie-Beukering (eenmansfractie in de Eerste Kamer, afgesplitst)', kleur: '#9a9a9a', volgorde: 999 },
    'Fractie-Walenkamp': { kort: 'Walenkamp', naam: 'Fractie-Walenkamp (eenmansfractie in de Eerste Kamer, afgesplitst)', kleur: '#9a9a9a', volgorde: 999 },
    'Fractie-Van de Sanden': { kort: 'Van de Sanden', naam: 'Fractie-Van de Sanden (eenmansfractie in de Eerste Kamer, afgesplitst)', kleur: '#9a9a9a', volgorde: 999 },
    'Fractie-Van Gasteren': { kort: 'Van Gasteren', naam: 'Fractie-Van Gasteren (eenmansfractie in de Eerste Kamer, afgesplitst)', kleur: '#9a9a9a', volgorde: 999 }
  };
  window.PARTIJEN = window.PARTIJEN || {};
  Object.keys(eenmansfracties).forEach(function (id) {
    if (!window.PARTIJEN[id]) window.PARTIJEN[id] = eenmansfracties[id];
  });
  window.EERSTE_KAMER = {
    titel: 'Eerste Kamer - fracties volgens eerstekamer.nl (2026-11-12)',
    bron: 'https://www.eerstekamer.nl/fracties',
    datum: '2026-11-12',
    zetels: { 'PRO': 14, 'BBB': 11, 'VVD': 9, 'D66': 7, 'CDA': 6, 'PVV': 4, 'SP': 3, 'CU': 3, 'FvD': 3, 'PvdD': 2, 'JA21': 2, 'Volt': 2, 'SGP': 2, '50PLUS': 1, 'OPNL': 1, 'Fractie-Visseren-Hamakers': 1, 'Fractie-Beukering': 1, 'Fractie-Walenkamp': 1, 'Fractie-Van de Sanden': 1, 'Fractie-Van Gasteren': 1 }
  };
  window.ACTUALITEIT = window.ACTUALITEIT || {};
  window.ACTUALITEIT.eerstekamer = { datum: '2026-11-12', opgehaald: '2026-11-12' };
})();