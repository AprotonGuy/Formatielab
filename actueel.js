// Formatielab - hoe actueel zijn de gegevens?
// Toont bovenaan de pagina de datum van elke gegevensbron, en waarschuwt als iets oud is.
(function () {
  'use strict';

  const OUD_NA_DAGEN = 14;
  const el = document.getElementById('actueel');
  if (!el) return;

  const MAANDEN = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
  function nl(iso) {
    const [j, m, d] = iso.split('-').map(Number);
    return `${d} ${MAANDEN[m - 1]} ${j}`;
  }
  function dagenOud(iso) {
    return Math.floor((Date.now() - new Date(`${iso}T12:00:00`)) / 86400000);
  }

  const bronnen = [];
  const pw = window.ACTUALITEIT && window.ACTUALITEIT.peilingwijzer;
  if (pw) bronnen.push({ naam: 'Peilingwijzer', datum: pw.datum });
  const peilnl = (window.SCENARIOS || []).filter((s) => !s.auto && /peil/i.test(s.id) && s.datum)
    .sort((a, b) => b.datum.localeCompare(a.datum))[0];
  if (peilnl) bronnen.push({ naam: 'Peil.nl', datum: peilnl.datum, handmatig: true });
  const sg = window.STEMGEDRAG;
  if (sg && sg.stemmingen.length) bronnen.push({ naam: 'Stemgedrag Kamer', datum: sg.stemmingen[0][0] });
  if (window.STANDPUNTEN_STAND) {
    // STANDPUNTEN_STAND is tekst als '12 november 2026'.
    const delen = window.STANDPUNTEN_STAND.split(' ');
    const maand = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december']
      .indexOf(delen[1]) + 1;
    if (maand > 0) {
      bronnen.push({ naam: 'Standpunten en urgentie', handmatig: true,
        datum: `${delen[2]}-${String(maand).padStart(2, '0')}-${String(delen[0]).padStart(2, '0')}` });
    }
  }

  const oud = bronnen.filter((b) => dagenOud(b.datum) > OUD_NA_DAGEN);
  el.innerHTML = 'Gegevens van: ' + bronnen.map((b) => {
    const isOud = dagenOud(b.datum) > OUD_NA_DAGEN;
    return `<span class="${isOud ? 'oud' : ''}" title="${b.handmatig ? 'Handmatig bijgehouden' : 'Automatisch bij te werken met bijwerken.ps1'}">${b.naam} ${nl(b.datum)}</span>`;
  }).join(' · ') + (oud.length
    ? ` <strong class="oud-melding">Let op: ${oud.map((b) => b.naam).join(', ')} ${oud.length === 1 ? 'is' : 'zijn'} ouder dan ${OUD_NA_DAGEN} dagen.</strong>`
    : '');
})();
