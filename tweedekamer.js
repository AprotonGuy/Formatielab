// FormatieLab - actuele fracties van de Tweede Kamer
// AUTOMATISCH GEMAAKT door tweedekamer-ophalen.ps1 op 2026-11-12. Niet met de hand aanpassen.
// Bron: open data van de Tweede Kamer (https://opendata.tweedekamer.nl)
(function () {
  var eenmansfracties = {
    'Lid Keijzer': { kort: 'Keijzer', naam: 'Lid Keijzer (eenmansfractie, afgesplitst)', kleur: '#9a9a9a', volgorde: 999, zelfdeAls: ['Keijzer'] }
  };
  window.PARTIJEN = window.PARTIJEN || {};
  Object.keys(eenmansfracties).forEach(function (id) {
    if (!window.PARTIJEN[id]) window.PARTIJEN[id] = eenmansfracties[id];
  });
  var nu = {
    id: 'kamer-nu',
    titel: 'Huidige Tweede Kamer - fracties volgens de Tweede Kamer (2026-11-12)',
    bron: 'https://www.tweedekamer.nl/kamerleden_en_commissies/fracties',
    datum: '2026-11-12',
    zetels: { 'D66': 26, 'VVD': 22, 'PRO': 20, 'PVV': 19, 'CDA': 18, 'JA21': 9, 'FvD': 7, 'DNA': 7, 'DENK': 3, 'CU': 3, 'SP': 3, 'PvdD': 3, 'BBB': 3, 'SGP': 3, '50PLUS': 2, 'Volt': 1, 'Lid Keijzer': 1 }
  };
  var lijst = window.SCENARIOS || [];
  var i = lijst.findIndex(function (s) { return s.id === nu.id; });
  if (i >= 0) lijst[i] = nu; else lijst.push(nu);
  window.SCENARIOS = lijst;
  window.ACTUALITEIT = window.ACTUALITEIT || {};
  window.ACTUALITEIT.tweedekamer = { datum: '2026-11-12', opgehaald: '2026-11-12' };
})();