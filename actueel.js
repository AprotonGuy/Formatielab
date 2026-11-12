// Formatielab - menu met de actualiteit van de gegevens, en een knop om op nieuwe gegevens te controleren.
(function () {
  'use strict';

  const OUD_NA_DAGEN = 14;
  const el = document.getElementById('actueel');
  if (!el) return;

  const MAANDEN = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
  const MAANDEN_LANG = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
  function nl(iso) {
    const [j, m, d] = iso.split('-').map(Number);
    return `${d} ${MAANDEN[m - 1]} ${j}`;
  }
  function dagenOud(iso) {
    return Math.floor((Date.now() - new Date(`${iso}T12:00:00`)) / 86400000);
  }

  // Datum per gegevensbron.
  function bronnen() {
    const lijst = [];
    const pw = window.ACTUALITEIT && window.ACTUALITEIT.peilingwijzer;
    if (pw) lijst.push({ naam: 'Peilingwijzer', datum: pw.datum, opgehaald: pw.opgehaald });
    const peilnl = (window.SCENARIOS || []).filter((s) => !s.auto && /peil/i.test(s.id) && s.datum)
      .sort((a, b) => b.datum.localeCompare(a.datum))[0];
    if (peilnl) lijst.push({ naam: 'Peil.nl', datum: peilnl.datum, handmatig: true });
    const sg = window.STEMGEDRAG;
    if (sg && sg.stemmingen.length) lijst.push({ naam: 'Stemgedrag Tweede Kamer', datum: sg.stemmingen[0][0], opgehaald: sg.opgehaald });
    if (window.STANDPUNTEN_STAND) {
      const delen = window.STANDPUNTEN_STAND.split(' ');
      const maand = MAANDEN_LANG.indexOf(delen[1]) + 1;
      if (maand > 0) {
        lijst.push({ naam: 'Standpunten en urgentie', handmatig: true,
          datum: `${delen[2]}-${String(maand).padStart(2, '0')}-${String(delen[0]).padStart(2, '0')}` });
      }
    }
    return lijst;
  }

  function teken() {
    const lijst = bronnen();
    const oud = lijst.filter((b) => dagenOud(b.datum) > OUD_NA_DAGEN);
    el.innerHTML = `<ul class="bronlijst">${lijst.map((b) => `<li class="${dagenOud(b.datum) > OUD_NA_DAGEN ? 'oud' : ''}">
        <span>${b.naam}</span><strong>${nl(b.datum)}</strong>
        <small>${b.handmatig ? 'met de hand bijgehouden' : `automatisch${b.opgehaald ? `, gecontroleerd op ${nl(b.opgehaald)}` : ''}`}</small>
      </li>`).join('')}</ul>` +
      (oud.length ? `<p class="oud-melding">Let op: ${oud.map((b) => b.naam).join(', ')} ${oud.length === 1 ? 'is' : 'zijn'} ouder dan ${OUD_NA_DAGEN} dagen.</p>` : '');
    const knop = document.getElementById('menuknop');
    if (knop) knop.classList.toggle('let-op', oud.length > 0);
  }
  teken();

  // ---------- menu openen en sluiten ----------
  const menu = document.getElementById('menu');
  const menuknop = document.getElementById('menuknop');
  function zetMenu(open) {
    menu.hidden = !open;
    menuknop.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuknop.classList.toggle('open', open);
  }
  if (menu && menuknop) {
    menuknop.addEventListener('click', () => zetMenu(menu.hidden));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) zetMenu(false); });
    document.addEventListener('click', (e) => {
      if (!menu.hidden && !menu.contains(e.target) && !menuknop.contains(e.target)) zetMenu(false);
    });
  }

  // ---------- controleren op nieuwe gegevens ----------
  // De site haalt de gegevensbestanden opnieuw op (zonder cache). Zijn ze nieuwer dan wat er nu geladen is,
  // dan herlaadt de pagina. Nieuwe gegevens zelf worden elke ochtend door de automatische update opgehaald.
  const ververs = document.getElementById('ververs');
  const status = document.getElementById('ververs-status');
  async function datumUit(bestand, patroon) {
    const antwoord = await fetch(`${bestand}?t=${Date.now()}`, { cache: 'reload' });
    if (!antwoord.ok) throw new Error(`${bestand}: ${antwoord.status}`);
    const m = (await antwoord.text()).match(patroon);
    return m ? m[1] : null;
  }
  if (ververs) {
    ververs.addEventListener('click', async () => {
      ververs.disabled = true;
      status.textContent = 'Bezig met controleren…';
      try {
        const nieuwPeiling = await datumUit('peilingen.js', /datum: '(\d{4}-\d{2}-\d{2})'/);
        const nieuwStem = await datumUit('stemgedrag.js', /\["(\d{4}-\d{2}-\d{2})"/);
        const huidigPeiling = window.ACTUALITEIT && window.ACTUALITEIT.peilingwijzer && window.ACTUALITEIT.peilingwijzer.datum;
        const huidigStem = window.STEMGEDRAG && window.STEMGEDRAG.stemmingen[0] && window.STEMGEDRAG.stemmingen[0][0];
        const nieuwer = (nieuwPeiling && nieuwPeiling !== huidigPeiling) || (nieuwStem && nieuwStem !== huidigStem);
        if (nieuwer) {
          status.textContent = 'Er zijn nieuwe gegevens. De pagina wordt herladen…';
          setTimeout(() => location.reload(), 600);
        } else {
          status.textContent = `Je hebt al de nieuwste gegevens (Peilingwijzer ${nl(huidigPeiling || nieuwPeiling)}, ` +
            `laatste stemming ${nl(huidigStem || nieuwStem)}).`;
          ververs.disabled = false;
        }
      } catch (e) {
        status.textContent = 'Controleren lukte niet. Probeer het later opnieuw of herlaad de pagina.';
        ververs.disabled = false;
      }
    });
  }
})();
