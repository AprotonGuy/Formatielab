// Formatielab — logica
(function () {
  'use strict';

  const PARTIJEN = window.PARTIJEN || {};
  // Het standaardscenario staat bovenaan in de lijst en wordt bij een eerste bezoek gekozen.
  const STANDAARD_SCENARIO = 'kamer-nu';
  const SCENARIOS = (window.SCENARIOS || []).slice().sort((a, b) =>
    (b.id === STANDAARD_SCENARIO) - (a.id === STANDAARD_SCENARIO));
  const EERSTE_KAMER = window.EERSTE_KAMER || null;
  const OPSLAG_SLEUTEL = 'coalitiewijzer-v1';
  const MAX_PARTIJEN_REKENEN = 18; // 2^18 combinaties is nog snel genoeg
  const MAX_TONEN = 200;

  const standaard = {
    scenario: SCENARIOS.length ? SCENARIOS[0].id : '',
    aangepast: {},      // { scenarioId: { partijId: zetels } }
    gekozen: [],
    uitgesloten: [],
    lab: false,         // Lab-modus: zetels zelf aanpassen
    filters: { minimaal: true, metSelectie: true, ookEK: false, maxPartijen: 0, sorteer: 'krap', themas: [], richting: {} }
  };
  const state = laden();

  const $ = (id) => document.getElementById(id);

  // ---------- opslag ----------
  function laden() {
    try {
      const ruw = JSON.parse(localStorage.getItem(OPSLAG_SLEUTEL));
      if (ruw && SCENARIOS.some((s) => s.id === ruw.scenario)) {
        return Object.assign({}, standaard, ruw, {
          filters: Object.assign({}, standaard.filters, ruw.filters)
        });
      }
    } catch (e) { /* negeer kapotte opslag */ }
    return JSON.parse(JSON.stringify(standaard));
  }
  function opslaan() {
    try { localStorage.setItem(OPSLAG_SLEUTEL, JSON.stringify(state)); } catch (e) { /* bv. privémodus */ }
  }

  // ---------- data ----------
  function scenario() {
    return SCENARIOS.find((s) => s.id === state.scenario) || SCENARIOS[0];
  }

  function maakPartij(id, basis, zetels) {
    const info = PARTIJEN[id] || { kort: id, naam: id, kleur: '#888888', volgorde: 999 };
    return {
      id,
      kort: info.kort || id,
      naam: info.naam || id,
      kleur: info.kleur,
      volgorde: info.volgorde,
      basis,
      zetels
    };
  }

  function partijLijst() {
    const sc = scenario();
    const extra = state.aangepast[sc.id] || {};
    return Object.keys(sc.zetels).map((id) =>
      maakPartij(id, sc.zetels[id], id in extra ? extra[id] : sc.zetels[id]));
  }

  // Eerste Kamer: vaste verdeling uit data.js.
  function ekLijst() {
    if (!EERSTE_KAMER) return [];
    return Object.keys(EERSTE_KAMER.zetels).map((id) =>
      maakPartij(id, EERSTE_KAMER.zetels[id], EERSTE_KAMER.zetels[id]));
  }
  // Een partij plus haar andere namen (zelfdeAls in data.js), bv. GL-PvdA ↔ PRO.
  function namen(id) {
    const info = PARTIJEN[id];
    return [id].concat(info && info.zelfdeAls ? info.zelfdeAls : []);
  }
  function metAliassen(ids) {
    const s = new Set();
    ids.forEach((id) => namen(id).forEach((n) => s.add(n)));
    return s;
  }
  function ekZetelsVan(id) {
    if (!EERSTE_KAMER) return 0;
    for (const n of namen(id)) if (EERSTE_KAMER.zetels[n]) return EERSTE_KAMER.zetels[n];
    return 0;
  }

  const som = (lijst) => lijst.reduce((a, p) => a + p.zetels, 0);
  const meerderheidVan = (totaal) => Math.floor(totaal / 2) + 1;

  function chip(p) {
    return `<span class="chip" style="background:${p.kleur}" title="${p.naam}">${p.kort}</span>`;
  }

  // ---------- partijtabel ----------
  function bouwTabel() {
    const tbody = $('partijen').querySelector('tbody');
    const sc = scenario();
    const lijst = partijLijst().sort((a, b) => b.basis - a.basis || a.kort.localeCompare(b.kort));
    tbody.innerHTML = lijst.map((p) => {
      const m = sc.marge && sc.marge[p.id];
      const marge = m ? `<small class="marge" title="Onzekerheidsmarge van de peiling">${m[0]}–${m[1]}</small>` : '';
      return `
      <tr data-id="${p.id}">
        <td><span class="stip" style="background:${p.kleur}"></span><span class="naam" title="${p.naam}">${p.kort}</span></td>
        <td class="zetelcel"><input type="number" class="zetels${p.zetels !== p.basis ? ' gewijzigd' : ''}" min="0" max="150" step="1" value="${p.zetels}"
          aria-label="Zetels ${p.naam}"${state.lab ? '' : ' readonly tabindex="-1"'}
          title="${state.lab ? 'Pas het aantal zetels aan' : 'Zet het Lab aan om zetels aan te passen'}${p.zetels !== p.basis ? ` (bron: ${p.basis})` : ''}">${marge}</td>
        <td><input type="checkbox" class="kies" aria-label="${p.naam} in coalitie"></td>
        <td><button type="button" class="sluit" aria-pressed="false" aria-label="${p.naam} uitsluiten" title="Uitsluiten">✕</button></td>
      </tr>`;
    }).join('');

    const bron = $('scenario-bron');
    if (sc.bron) {
      let host = sc.bron;
      try { host = new URL(sc.bron).hostname.replace(/^www\./, ''); } catch (e) { /* toon volledige link */ }
      bron.innerHTML = `Bron: <a href="${sc.bron}" target="_blank" rel="noopener">${host}</a>`;
    } else {
      bron.textContent = '';
    }
  }

  function syncTabel() {
    const gekozen = new Set(state.gekozen);
    const uit = new Set(state.uitgesloten);
    document.querySelectorAll('#partijen tbody tr').forEach((tr) => {
      const id = tr.dataset.id;
      const isUit = uit.has(id);
      tr.classList.toggle('uitgesloten', isUit);
      tr.classList.toggle('gekozen', gekozen.has(id));
      const kies = tr.querySelector('.kies');
      kies.checked = gekozen.has(id);
      kies.disabled = isUit;
      tr.querySelector('.sluit').setAttribute('aria-pressed', String(isUit));
    });
  }

  // ---------- halfrond ----------
  function zetelPosities(n) {
    if (n <= 0) return [];
    const rijen = Math.max(2, Math.min(12, Math.round(Math.sqrt(n / 2.3))));
    const rBinnen = 0.38, rBuiten = 1;
    const stap = (rBuiten - rBinnen) / (rijen - 1);
    const radii = Array.from({ length: rijen }, (_, i) => rBinnen + i * stap);
    const somR = radii.reduce((a, b) => a + b, 0);
    const aantallen = radii.map((r) => Math.round((n * r) / somR));
    let verschil = n - aantallen.reduce((a, b) => a + b, 0);
    for (let i = rijen - 1; verschil !== 0; i = (i - 1 + rijen) % rijen) {
      if (verschil > 0) { aantallen[i]++; verschil--; }
      else if (aantallen[i] > 0) { aantallen[i]--; verschil++; }
    }

    // Stipgrootte: past zowel tussen rijen als langs de krapste boog.
    let straal = stap * 0.42;
    radii.forEach((r, i) => {
      if (aantallen[i] > 1) straal = Math.min(straal, ((Math.PI * r) / (aantallen[i] - 1)) * 0.42);
    });

    const plekken = [];
    radii.forEach((r, ri) => {
      const k = aantallen[ri];
      for (let j = 0; j < k; j++) {
        const hoek = k === 1 ? Math.PI / 2 : Math.PI - (j / (k - 1)) * Math.PI;
        plekken.push({ hoek, r, x: r * Math.cos(hoek), y: -r * Math.sin(hoek) });
      }
    });
    // Links naar rechts, zodat elke partij een taartpunt vormt.
    plekken.sort((a, b) => b.hoek - a.hoek || a.r - b.r);
    plekken.forEach((p) => { p.straal = straal; });
    return plekken;
  }

  function tekenHalfrond(svg, lijst, meerderheid) {
    const totaal = som(lijst);
    const geordend = lijst.filter((p) => p.zetels > 0).sort((a, b) => a.volgorde - b.volgorde);
    const plekken = zetelPosities(som(geordend));
    const gekozen = metAliassen(state.gekozen);
    const uit = metAliassen(state.uitgesloten);
    const heeftSelectie = gekozen.size > 0;

    let html = '';
    let i = 0;
    for (const p of geordend) {
      let klasse = 'zetel';
      if (uit.has(p.id)) klasse += ' uit';
      else if (heeftSelectie && !gekozen.has(p.id)) klasse += ' gedimd';
      html += `<g class="${klasse}" fill="${p.kleur}"><title>${p.naam}: ${p.zetels} zetels</title>`;
      for (let k = 0; k < p.zetels; k++, i++) {
        const z = plekken[i];
        html += `<circle cx="${z.x.toFixed(4)}" cy="${z.y.toFixed(4)}" r="${z.straal.toFixed(4)}"/>`;
      }
      html += '</g>';
    }
    const gekozenZetels = som(lijst.filter((p) => gekozen.has(p.id)));
    html += `<text class="midden-getal" x="0" y="-0.12">${heeftSelectie ? gekozenZetels : totaal}</text>`;
    html += `<text class="midden-label" x="0" y="-0.02">${heeftSelectie ? `van ${totaal} · ${meerderheid} nodig` : `zetels · ${meerderheid} nodig`}</text>`;
    svg.innerHTML = html;
  }

  // ---------- samenvatting ----------
  function tekenSamenvatting(lijst, totaal, meerderheid) {
    const el = $('samenvatting');
    const gekozen = lijst.filter((p) => state.gekozen.includes(p.id)).sort((a, b) => b.zetels - a.zetels);
    if (!gekozen.length) {
      el.innerHTML = '<p class="klein">Vink partijen aan om een coalitie samen te stellen, of klik op een coalitie in de lijst.</p>';
      return;
    }
    const s = som(gekozen);
    let status;
    if (s >= meerderheid) {
      const boven = s - Math.floor(totaal / 2);
      status = `<span class="ok">Meerderheid ✓</span> ${s} zetels (${boven} boven de helft)`;
    } else {
      status = `<span class="nee">Geen meerderheid</span> ${s} zetels — nog ${meerderheid - s} nodig`;
    }
    let extra = '';
    if (s >= meerderheid) {
      const overbodig = gekozen.filter((p) => s - p.zetels >= meerderheid);
      if (overbodig.length) {
        extra = `<p class="klein">Niet strikt nodig voor de meerderheid: ${overbodig.map((p) => p.kort).join(', ')}</p>`;
      }
    }
    let ek = '';
    if (EERSTE_KAMER) {
      const ekTotaal = som(ekLijst());
      const ekNodig = meerderheidVan(ekTotaal);
      const ekS = gekozen.reduce((a, p) => a + ekZetelsVan(p.id), 0);
      ek = ekS >= ekNodig
        ? `<p class="ek-regel">Eerste Kamer: <span class="ok">meerderheid ✓</span> ${ekS} van ${ekTotaal}</p>`
        : `<p class="ek-regel">Eerste Kamer: <span class="nee">geen meerderheid</span> ${ekS} van ${ekTotaal} — nog ${ekNodig - ekS} nodig</p>`;
    }
    el.innerHTML = `<p class="status">${status}</p>${ek}<div class="chips">${gekozen.map(chip).join('')}</div>${extra}`;
  }

  // ---------- alle coalities ----------
  // Hoe goed kan een coalitie een thema aanpakken? Score 0-100, opgebouwd uit:
  //   belang         (45%) hoe belangrijk de partijen het thema vinden (standpunten.js)
  //   eensgezindheid (30%) hoe dicht hun standpunten bij elkaar liggen (standpunten.js)
  //   stemgedrag     (25%) hoe vaak ze in de Kamer echt hetzelfde stemden over dit thema (stemgedrag.js)
  // Zonder stemdata tellen alleen de eerste twee (naar verhouding). Dat heet hier "daadkracht".
  //
  // Kiest de gebruiker ook een richting (bv. "veel strenger"), dan telt die zwaar mee:
  //   score = richting x (50% + 50% x daadkracht)
  // richting = 100% als de coalitiekoers helemaal die kant op gaat, 50% bij een middenkoers, 0% bij de andere kant.
  // Een coalitie die precies de andere kant op wil, scoort dus 0, hoe daadkrachtig ook.
  const GEWICHT = { belang: 0.45, eens: 0.30, stem: 0.25 };
  function themaScore(thema, leden, richting) {
    const a = window.CoalitieAnalyse ? window.CoalitieAnalyse.analyseer(thema, leden, namen) : null;
    if (!a) return { thema, score: 0, uitleg: `${thema.naam}: geen standpunten bekend` };
    const belang = a.belang / 3;
    const eens = Math.max(0, 1 - a.conflict / 4);
    const stem = window.CoalitieStemgedrag ? window.CoalitieStemgedrag.eensgezindheid(thema.id, leden, namen) : null;
    let daadkracht;
    if (stem) daadkracht = GEWICHT.belang * belang + GEWICHT.eens * eens + GEWICHT.stem * stem.pct / 100;
    else daadkracht = (GEWICHT.belang * belang + GEWICHT.eens * eens) / (GEWICHT.belang + GEWICHT.eens);
    let score = 100 * daadkracht;
    let uitleg = `${thema.naam}: belang ${a.belang.toFixed(1)}/3, standpunten ${Math.round(eens * 100)}% eensgezind` +
      (stem ? `, in de Kamer ${stem.pct}% gelijk gestemd (${stem.n} stemmingen)` : ', geen stemdata');
    if (richting) {
      const passend = Math.max(0, Math.min(1, (a.koers * richting + 2) / 4));
      score = 100 * passend * (0.5 + 0.5 * daadkracht);
      const kant = richting < 0 ? thema.links : thema.rechts;
      uitleg += `. Jouw richting „${kant}”: koers past ${Math.round(passend * 100)}%` +
        ` (${Math.abs(a.koers) < 0.5 ? 'middenkoers' : `richting „${a.koers < 0 ? thema.links : thema.rechts}”`})`;
    }
    return { thema, score, uitleg, richting };
  }
  function scoreKlasse(s) { return s >= 70 ? 'score-hoog' : s >= 50 ? 'score-midden' : 'score-laag'; }

  // Knoppen om maximaal 3 thema's te kiezen.
  function tekenThemaKnoppen() {
    const f = state.filters;
    f.themas = (f.themas || []).filter((id) => (window.THEMAS || []).some((t) => t.id === id));
    $('f-themas').innerHTML = (window.THEMAS || []).map((t) => {
      const aan = f.themas.includes(t.id);
      const vol = !aan && f.themas.length >= 3;
      return `<button type="button" class="themaknop${aan ? ' aan' : ''}" data-thema="${t.id}" aria-pressed="${aan}"${vol ? ' disabled title="Je kunt maximaal 3 thema\'s kiezen"' : ''}>${t.naam}</button>`;
    }).join('');

    // Per gekozen thema: welke kant wil jij op?
    f.richting = f.richting || {};
    $('f-richting').innerHTML = (window.THEMAS || []).filter((t) => f.themas.includes(t.id)).map((t) => {
      const r = f.richting[t.id] || 0;
      const knop = (waarde, tekst) => `<button type="button" class="richtingknop${r === waarde ? ' aan' : ''}"
        data-thema="${t.id}" data-richting="${waarde}" aria-pressed="${r === waarde}">${tekst}</button>`;
      return `<div class="richtingrij"><span class="richting-naam">${t.naam}:</span>
        ${knop(-1, `◀ ${t.links}`)}${knop(0, 'maakt niet uit')}${knop(1, `${t.rechts} ▶`)}</div>`;
    }).join('');
  }

  function tekenCoalities(lijst, meerderheid) {
    tekenThemaKnoppen();
    const f = state.filters;
    const uit = new Set(state.uitgesloten);
    let kandidaten = lijst.filter((p) => p.zetels > 0 && !uit.has(p.id)).sort((a, b) => b.zetels - a.zetels);
    let afgekapt = false;
    if (kandidaten.length > MAX_PARTIJEN_REKENEN) {
      kandidaten = kandidaten.slice(0, MAX_PARTIJEN_REKENEN);
      afgekapt = true;
    }
    const n = kandidaten.length;
    const zet = kandidaten.map((p) => p.zetels);
    const ekZet = kandidaten.map((p) => ekZetelsVan(p.id));
    const ekNodig = EERSTE_KAMER ? meerderheidVan(som(ekLijst())) : 0;

    let vereist = 0;
    if (f.metSelectie) {
      state.gekozen.forEach((id) => {
        const idx = kandidaten.findIndex((p) => p.id === id);
        if (idx >= 0) vereist |= 1 << idx;
      });
    }

    const res = [];
    const eind = 1 << n;
    for (let m = 1; m < eind; m++) {
      if ((m & vereist) !== vereist) continue;
      let s = 0, ek = 0, aantal = 0, kleinste = Infinity;
      for (let i = 0; i < n; i++) {
        if (m & (1 << i)) {
          s += zet[i]; ek += ekZet[i]; aantal++;
          if (zet[i] < kleinste) kleinste = zet[i];
        }
      }
      if (s < meerderheid) continue;
      if (f.maxPartijen && aantal > f.maxPartijen) continue;
      // Minimaal winnend (Tweede Kamer): zonder de kleinste partij is er al geen meerderheid meer.
      if (f.minimaal && s - kleinste >= meerderheid) continue;
      if (f.ookEK && EERSTE_KAMER && ek < ekNodig) continue;
      res.push({ m, s, ek, aantal });
    }

    // Score per gekozen thema (0-100): hoe goed kan deze coalitie dit thema aanpakken?
    const gekozenThemas = (window.THEMAS || []).filter((t) => f.themas.includes(t.id));
    if (gekozenThemas.length) {
      res.forEach((c) => {
        const leden = kandidaten.filter((_, i) => c.m & (1 << i));
        c.themaScores = gekozenThemas.map((t) => themaScore(t, leden, (f.richting || {})[t.id] || 0));
        c.score = c.themaScores.reduce((a, x) => a + x.score, 0) / c.themaScores.length;
      });
    }

    const sorteer = {
      krap: (a, b) => a.s - b.s || a.aantal - b.aantal,
      weinig: (a, b) => a.aantal - b.aantal || a.s - b.s,
      groot: (a, b) => b.s - a.s || a.aantal - b.aantal,
      thema: (a, b) => (b.score || 0) - (a.score || 0) || a.s - b.s
    }[f.sorteer === 'thema' && !gekozenThemas.length ? 'krap' : f.sorteer] || ((a, b) => a.s - b.s);
    res.sort(sorteer);

    let info = `${res.length} ${res.length === 1 ? 'coalitie' : 'coalities'} gevonden`;
    if (res.length > MAX_TONEN) info += ` — de eerste ${MAX_TONEN} worden getoond`;
    if (afgekapt) info += ` (alleen de ${MAX_PARTIJEN_REKENEN} grootste partijen meegenomen)`;
    if (!res.length && (f.ookEK || (f.metSelectie && state.gekozen.length))) info += '. Probeer een filter uit te zetten.';
    $('aantal').textContent = info;

    const huidig = [...state.gekozen].sort().join('|');
    $('coalities').innerHTML = res.slice(0, MAX_TONEN).map((c) => {
      const leden = kandidaten.filter((_, i) => c.m & (1 << i));
      const ids = leden.map((p) => p.id);
      const actief = [...ids].sort().join('|') === huidig ? ' actief' : '';
      return `<li><button type="button" class="coalitie${actief}" data-leden="${ids.join(',')}">
        <span class="chips">${leden.map(chip).join('')}</span>
        <span class="cijfers"><strong>${c.s}</strong> zetels<br>${EERSTE_KAMER
          ? `<span class="${c.ek >= ekNodig ? 'ek-ok' : 'ek-nee'}" title="Zetels in de Eerste Kamer (${ekNodig} nodig)">EK ${c.ek} ${c.ek >= ekNodig ? '✓' : '✗'}</span> · `
          : ''}${c.aantal} partijen</span>
        ${c.themaScores ? `<span class="themascores">${c.themaScores.map((x) => `<span class="themascore ${scoreKlasse(x.score)}" title="${x.uitleg}">${x.thema.naam.split(' ')[0]}${x.richting ? (x.richting < 0 ? ' ◀' : ' ▶') : ''} <strong>${Math.round(x.score)}</strong></span>`).join('')}</span>` : ''}
      </button></li>`;
    }).join('');
  }

  // ---------- alles tekenen ----------
  // Lab-knop, uitleg en "terugzetten" in de juiste stand; aangepaste zetels markeren.
  function tekenLab(lijst) {
    const knop = $('labknop');
    knop.classList.toggle('aan', state.lab);
    knop.setAttribute('aria-pressed', String(state.lab));
    knop.title = state.lab ? 'Lab staat aan: klik om zetels weer vast te zetten' : 'Lab: zetels zelf aanpassen';
    $('labuitleg').hidden = !state.lab;
    document.getElementById('paneel-partijen').classList.toggle('lab-aan', state.lab);
    const aangepast = lijst.some((p) => p.zetels !== p.basis);
    $('herstel').hidden = !aangepast;
    lijst.forEach((p) => {
      const input = document.querySelector(`#partijen tr[data-id="${CSS.escape(p.id)}"] .zetels`);
      if (input) input.classList.toggle('gewijzigd', p.zetels !== p.basis);
    });
  }

  function render() {
    const lijst = partijLijst();
    tekenLab(lijst);
    const ids = new Set(lijst.map((p) => p.id));
    state.gekozen = state.gekozen.filter((id) => ids.has(id));
    state.uitgesloten = state.uitgesloten.filter((id) => ids.has(id));

    const totaal = som(lijst);
    const meerderheid = meerderheidVan(totaal);
    let t = `Totaal ${totaal} zetels · meerderheid vanaf ${meerderheid}`;
    $('totaal').innerHTML = totaal !== 150 ? `${t} <span class="waarschuwing">(niet 150!)</span>` : t;

    syncTabel();
    tekenHalfrond($('halfrond'), lijst, meerderheid);
    if (EERSTE_KAMER) {
      const ek = ekLijst();
      tekenHalfrond($('halfrond-ek'), ek, meerderheidVan(som(ek)));
      const tkNamen = metAliassen([...ids]);
      const alleenEK = ek.filter((p) => p.zetels > 0 && !tkNamen.has(p.id)).map((p) => p.kort);
      $('ek-bron').textContent = EERSTE_KAMER.titel +
        (alleenEK.length ? `. Niet in dit Tweede Kamer-scenario, dus nooit in een coalitie: ${alleenEK.join(', ')}.` : '.');
    }
    tekenSamenvatting(lijst, totaal, meerderheid);
    tekenCoalities(lijst, meerderheid);
    const leden = lijst.filter((p) => state.gekozen.includes(p.id));
    let analyses = [];
    if (window.CoalitieAnalyse) {
      analyses = window.CoalitieAnalyse.teken({
        container: $('analyse'),
        uitleg: $('analyse-uitleg'),
        leden,
        alle: lijst.filter((p) => p.zetels > 0),
        namen,
        chip,
        stand: window.STANDPUNTEN_STAND
      }) || [];
    }
    if (window.CoalitieStemgedrag) {
      window.CoalitieStemgedrag.teken({
        container: $('stemgedrag'),
        leden,
        alle: lijst.filter((p) => p.zetels > 0),
        namen,
        chip
      });
    }
    if (window.CoalitieHistorie && window.CoalitieAnalyse) {
      window.CoalitieHistorie.teken({
        container: $('historie'),
        leden,
        analyses,
        namen,
        chip,
        richtingKort: window.CoalitieAnalyse.richtingKort,
        soortLabel: window.CoalitieAnalyse.soortLabel,
        soortUitleg: window.CoalitieAnalyse.soortUitleg,
        scenario: scenario().titel
      });
    }
    opslaan();
  }

  // ---------- events ----------
  function koppel() {
    const sel = $('scenario');
    sel.innerHTML = SCENARIOS.map((s) => `<option value="${s.id}">${s.titel}</option>`).join('');
    sel.value = scenario().id;
    sel.addEventListener('change', () => {
      state.scenario = sel.value;
      bouwTabel();
      render();
    });

    const tbody = $('partijen').querySelector('tbody');
    tbody.addEventListener('input', (e) => {
      if (!e.target.classList.contains('zetels')) return;
      const id = e.target.closest('tr').dataset.id;
      let waarde = parseInt(e.target.value, 10);
      if (!Number.isFinite(waarde) || waarde < 0) waarde = 0;
      if (waarde > 150) waarde = 150;
      const sc = scenario();
      const extra = (state.aangepast[sc.id] = state.aangepast[sc.id] || {});
      if (waarde === sc.zetels[id]) delete extra[id]; else extra[id] = waarde;
      render();
    });
    tbody.addEventListener('change', (e) => {
      if (!e.target.classList.contains('kies')) return;
      const id = e.target.closest('tr').dataset.id;
      state.gekozen = e.target.checked
        ? [...new Set([...state.gekozen, id])]
        : state.gekozen.filter((x) => x !== id);
      render();
    });
    tbody.addEventListener('click', (e) => {
      const knop = e.target.closest('.sluit');
      if (!knop) return;
      const id = knop.closest('tr').dataset.id;
      if (state.uitgesloten.includes(id)) {
        state.uitgesloten = state.uitgesloten.filter((x) => x !== id);
      } else {
        state.uitgesloten.push(id);
        state.gekozen = state.gekozen.filter((x) => x !== id);
      }
      render();
    });

    $('herstel').addEventListener('click', () => {
      delete state.aangepast[scenario().id];
      bouwTabel();
      render();
    });

    // Lab-knop: zetels wel of niet zelf aanpassen.
    $('labknop').addEventListener('click', () => {
      state.lab = !state.lab;
      bouwTabel();
      render();
    });
    $('wis').addEventListener('click', () => { state.gekozen = []; render(); });

    $('coalities').addEventListener('click', (e) => {
      const knop = e.target.closest('.coalitie');
      if (!knop) return;
      state.gekozen = knop.dataset.leden.split(',');
      render();
    });

    const f = state.filters;
    const fMin = $('f-minimaal'), fSel = $('f-selectie'), fEK = $('f-ek'), fMax = $('f-max'), fSort = $('f-sorteer');
    fMin.checked = f.minimaal;
    fSel.checked = f.metSelectie;
    fEK.checked = f.ookEK;
    if (!EERSTE_KAMER) fEK.closest('label').hidden = true;
    fEK.addEventListener('change', () => { f.ookEK = fEK.checked; render(); });
    fMax.value = String(f.maxPartijen);
    fSort.value = f.sorteer;
    fMin.addEventListener('change', () => { f.minimaal = fMin.checked; render(); });
    fSel.addEventListener('change', () => { f.metSelectie = fSel.checked; render(); });
    fMax.addEventListener('change', () => { f.maxPartijen = parseInt(fMax.value, 10) || 0; render(); });
    fSort.addEventListener('change', () => { f.sorteer = fSort.value; render(); });
    $('f-themas').addEventListener('click', (e) => {
      const knop = e.target.closest('.themaknop');
      if (!knop || knop.disabled) return;
      const id = knop.dataset.thema;
      f.themas = f.themas.includes(id) ? f.themas.filter((x) => x !== id) : f.themas.concat(id).slice(0, 3);
      // Thema gekozen: sorteer meteen op "beste voor gekozen thema's".
      if (f.themas.length) f.sorteer = 'thema';
      else if (f.sorteer === 'thema') f.sorteer = 'krap';
      fSort.value = f.sorteer;
      render();
    });
    $('f-richting').addEventListener('click', (e) => {
      const knop = e.target.closest('.richtingknop');
      if (!knop) return;
      f.richting = f.richting || {};
      f.richting[knop.dataset.thema] = parseInt(knop.dataset.richting, 10);
      render();
    });
  }

  if (!SCENARIOS.length) {
    document.body.insertAdjacentHTML('afterbegin', '<p class="waarschuwing">Geen scenario\'s gevonden in data.js.</p>');
    return;
  }
  koppel();
  bouwTabel();
  render();
})();
