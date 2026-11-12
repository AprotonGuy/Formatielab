// Formatielab - nieuwste Peilingwijzer
// AUTOMATISCH GEMAAKT door peilingen-ophalen.ps1 op 2026-11-12. Niet met de hand aanpassen.
// Bron: https://peilingwijzer.tomlouwerse.nl/ (cijferbestand https://peilingwijzer.tomlouwerse.nl/resources/Cijfers_Peilingwijzer.xlsx)
(function () {
  var scenario = {
    id: 'peilingwijzer-nieuwste',
    auto: true,
    titel: 'Peilingwijzer - nieuwste (28-10-2026, veldwerk t/m 25-10-2026)',
    bron: 'https://peilingwijzer.tomlouwerse.nl/',
    datum: '2026-10-28',
    zetels: { 'D66': 15, 'PVV': 20, 'VVD': 16, 'PRO': 28, 'CDA': 14, 'JA21': 17, 'FvD': 12, 'BBB': 1, 'DENK': 2, 'SGP': 3, 'PvdD': 5, 'CU': 4, 'SP': 5, '50PLUS': 5, 'Volt': 3 },
    marge: { 'D66': [13, 17], 'PVV': [18, 23], 'VVD': [14, 18], 'PRO': [25, 31], 'CDA': [12, 16], 'JA21': [15, 19], 'FvD': [10, 14], 'BBB': [0, 2], 'DENK': [1, 3], 'SGP': [2, 4], 'PvdD': [4, 6], 'CU': [3, 5], 'SP': [4, 6], '50PLUS': [4, 6], 'Volt': [2, 4] }
  };
  window.SCENARIOS = [scenario].concat((window.SCENARIOS || []).filter(function (s) { return s.id !== scenario.id; }));
  window.ACTUALITEIT = window.ACTUALITEIT || {};
  window.ACTUALITEIT.peilingwijzer = { datum: '2026-10-28', opgehaald: '2026-11-12' };
})();