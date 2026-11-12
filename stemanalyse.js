// Formatielab — echt stemgedrag van een coalitie (data: stemgedrag.js, trefwoorden: standpunten.js)
//
// Per stemming weten we wat elke fractie stemde. Voor een gekozen coalitie berekenen we:
//   eensgezind   = % stemmingen waarin alle coalitiepartijen hetzelfde stemden
//   paren        = % stemmingen waarin twee partijen hetzelfde stemden
//   per thema    = hetzelfde, alleen voor stemmingen over dat thema
//   steun buiten = hoe vaak andere partijen stemden zoals de coalitie (gewogen naar zetels)
// We tellen alleen stemmingen mee waarin minstens twee coalitiepartijen stemden.
(function () {
  'use strict';

  const DATA = window.STEMGEDRAG;
  const THEMAS = window.THEMAS || [];
  const VOORBEELDEN = 6;

  let klaar = null;

  // Eenmalig: thema's per stemming bepalen en fractie-indexen opzoeken.
  function voorbereiden() {
    if (klaar || !DATA) return klaar;
    const trefwoorden = window.THEMA_TREFWOORDEN || {};
    const regex = {};
    Object.keys(trefwoorden).forEach((id) => {
      regex[id] = new RegExp(trefwoorden[id].join('|'), 'i');
    });
    const stemmingen = DATA.stemmingen.map((r) => {
      const tekst = `${DATA.titels[r[3]] || ''} ${r[4]}`;
      const themas = Object.keys(regex).filter((id) => regex[id].test(tekst));
      return { datum: r[0], soort: r[1], aangenomen: r[2] === 1, titel: DATA.titels[r[3]] || '', onderwerp: r[4],
        nummer: r[5], stemmen: r[6], themas };
    });
    const index = {};
    DATA.fracties.forEach((f, i) => { index[f] = i; });
    klaar = { stemmingen, index };
    return klaar;
  }

  // Welke fractie-index hoort bij een partij (rekening houdend met aliassen als GL-PvdA/PRO)?
  function fractieIndex(p, namen) {
    const k = voorbereiden();
    for (const n of namen(p.id)) if (k.index[n] !== undefined) return k.index[n];
    return -1;
  }

  function pct(a, b) { return b ? Math.round((a / b) * 100) : null; }

  // Kern van de berekening voor een set stemmingen.
  function bereken(stemmingen, leden) {
    let geteld = 0;
    let eens = 0;
    const paar = {};
    const gesplitst = [];
    stemmingen.forEach((s) => {
      const stemmenLeden = leden.map((l) => ({ l, v: s.stemmen[l.i] })).filter((x) => x.v === 'V' || x.v === 'T');
      if (stemmenLeden.length < 2) return;
      geteld++;
      const allemaal = stemmenLeden.every((x) => x.v === stemmenLeden[0].v);
      if (allemaal) eens++;
      else gesplitst.push({ s, stemmenLeden });
      for (let i = 0; i < stemmenLeden.length; i++) {
        for (let j = i + 1; j < stemmenLeden.length; j++) {
          const sleutel = `${stemmenLeden[i].l.p.id}|${stemmenLeden[j].l.p.id}`;
          const t = paar[sleutel] || (paar[sleutel] = { a: stemmenLeden[i].l.p, b: stemmenLeden[j].l.p, n: 0, eens: 0 });
          t.n++;
          if (stemmenLeden[i].v === stemmenLeden[j].v) t.eens++;
        }
      }
    });
    const paren = Object.values(paar).map((t) => Object.assign(t, { pct: pct(t.eens, t.n) }))
      .sort((x, y) => x.pct - y.pct);
    return { geteld, eens, pct: pct(eens, geteld), paren, gesplitst };
  }

  // Het standpunt van de coalitie in een stemming: wat de meeste coalitiezetels stemden.
  function coalitieStem(s, leden) {
    let v = 0; let t = 0;
    leden.forEach((l) => {
      const x = s.stemmen[l.i];
      if (x === 'V') v += l.p.zetels; else if (x === 'T') t += l.p.zetels;
    });
    if (v === t) return null;
    return v > t ? 'V' : 'T';
  }

  function analyse(ledenRuw, alle, namen) {
    const k = voorbereiden();
    if (!k) return null;
    const leden = ledenRuw.map((p) => ({ p, i: fractieIndex(p, namen) })).filter((l) => l.i >= 0);
    const zonderData = ledenRuw.filter((p) => fractieIndex(p, namen) < 0);
    const totaal = bereken(k.stemmingen, leden);

    const perThema = THEMAS.map((t) => {
      const lijst = k.stemmingen.filter((s) => s.themas.includes(t.id));
      return Object.assign({ thema: t }, bereken(lijst, leden));
    }).filter((x) => x.geteld > 0);

    // Partijen buiten de coalitie: hoe vaak stemden ze zoals de coalitie?
    const inCoalitie = new Set(ledenRuw.map((p) => p.id));
    const buiten = alle.filter((p) => !inCoalitie.has(p.id))
      .map((p) => ({ p, i: fractieIndex(p, namen) }))
      .filter((x) => x.i >= 0 && !leden.some((l) => l.i === x.i))
      .map((x) => {
        let n = 0; let eens = 0;
        k.stemmingen.forEach((s) => {
          const c = coalitieStem(s, leden);
          const v = s.stemmen[x.i];
          if (!c || (v !== 'V' && v !== 'T')) return;
          n++;
          if (v === c) eens++;
        });
        return { p: x.p, n, pct: pct(eens, n) };
      })
      .filter((x) => x.n > 0)
      .sort((a, b) => b.pct - a.pct);

    return { leden, zonderData, totaal, perThema, buiten };
  }

  // ---------- weergave ----------

  function kleurKlasse(p) {
    if (p === null) return '';
    if (p >= 85) return 'sg-hoog';
    if (p >= 65) return 'sg-midden';
    return 'sg-laag';
  }

  function balk(p) {
    return `<span class="sg-balk"><span class="${kleurKlasse(p)}" style="width:${p || 0}%"></span></span>`;
  }

  function datumNL(d) {
    if (!d) return '';
    const [j, m, dag] = d.split('-');
    return `${Number(dag)}-${Number(m)}-${j}`;
  }

  function stemLijst(x, chip) {
    const voor = x.stemmenLeden.filter((y) => y.v === 'V').map((y) => chip(y.l.p)).join(' ');
    const tegen = x.stemmenLeden.filter((y) => y.v === 'T').map((y) => chip(y.l.p)).join(' ');
    return `<span class="sg-voor">voor: ${voor || '—'}</span> <span class="sg-tegen">tegen: ${tegen || '—'}</span>`;
  }

  function voorbeeld(x, chip) {
    const s = x.s;
    const soort = { M: 'Motie', A: 'Amendement', W: 'Wetsvoorstel', O: 'Stemming' }[s.soort];
    return `<li>
      <span class="klein">${datumNL(s.datum)} · ${soort} · ${s.aangenomen ? 'aangenomen' : 'verworpen'}</span><br>
      <a href="https://www.tweedekamer.nl/zoeken?qry=${encodeURIComponent(s.nummer)}" target="_blank" rel="noopener noreferrer">${s.onderwerp}</a>
      <br>${stemLijst(x, chip)}
    </li>`;
  }

  function themaRij(t, chip) {
    const zwakste = t.paren[0];
    const voorbeelden = t.gesplitst.slice(0, VOORBEELDEN).map((x) => voorbeeld(x, chip)).join('');
    return `<details class="hist-thema sg-thema">
      <summary>
        <span class="pijl" aria-hidden="true">▸</span>
        <strong class="ht-naam">${t.thema.naam}</strong>
        <span class="ht-toen">${balk(t.pct)} <strong>${t.pct}%</strong> eensgezind <span class="klein">(${t.geteld} stemmingen)</span></span>
        <span class="ht-nu">${zwakste && zwakste.pct < 100
          ? `Minst eens: ${chip(zwakste.a)} ${chip(zwakste.b)} <span class="klein">${zwakste.pct}%</span>`
          : '<span class="klein">altijd eens</span>'}</span>
      </summary>
      <div class="ht-inhoud sg-inhoud">
        <div>
          <h4>Paren binnen de coalitie</h4>
          <ul class="sg-paren">${t.paren.map((x) => `<li>${chip(x.a)} ${chip(x.b)} ${balk(x.pct)} ${x.pct}% <span class="klein">(${x.n})</span></li>`).join('')}</ul>
        </div>
        <div class="sg-voorbeelden">
          <h4>Recente stemmingen waarin de coalitie verdeeld was (${t.gesplitst.length})</h4>
          ${voorbeelden ? `<ul>${voorbeelden}</ul>` : '<p class="klein">Geen: de coalitiepartijen stemden over dit thema steeds hetzelfde.</p>'}
        </div>
      </div>
    </details>`;
  }

  function teken({ container, leden, alle, namen, chip }) {
    if (!DATA) {
      container.innerHTML = '<p class="klein">Geen stemgedrag gevonden. Draai <code>stemgedrag-ophalen.ps1</code> om <code>stemgedrag.js</code> te maken.</p>';
      return;
    }
    if (leden.length < 2) {
      container.innerHTML = '<p class="klein">Kies minstens twee partijen om te zien hoe vaak ze in de Tweede Kamer hetzelfde stemden.</p>';
      return;
    }
    const a = analyse(leden, alle, namen);
    if (a.leden.length < 2) {
      container.innerHTML = `<p class="klein">Te weinig partijen uit deze coalitie zitten in de huidige Tweede Kamer om stemgedrag te vergelijken${
        a.zonderData.length ? ` (geen stemdata voor ${a.zonderData.map((p) => p.kort).join(', ')})` : ''}.</p>`;
      return;
    }
    const t = a.totaal;
    const top = a.buiten.slice(0, 6);
    const perThema = a.perThema.slice().sort((x, y) => x.pct - y.pct);

    container.innerHTML = `
      <p class="hist-samenvatting">In <strong>${t.pct}%</strong> van ${t.geteld.toLocaleString('nl-NL')} stemmingen
        sinds ${datumNL(DATA.vanaf)} stemden ${a.leden.map((l) => chip(l.p)).join(' ')} allemaal hetzelfde.
        ${a.zonderData.length ? `<br><span class="klein">Geen stemdata (niet in de huidige Kamer): ${a.zonderData.map((p) => p.kort).join(', ')}.</span>` : ''}</p>
      <div class="sg-overzicht">
        <div class="overzicht-blok">
          <h3>Paren binnen de coalitie</h3>
          <ul class="sg-paren">${t.paren.map((x) => `<li>${chip(x.a)} ${chip(x.b)} ${balk(x.pct)} <strong>${x.pct}%</strong></li>`).join('')}</ul>
        </div>
        <div class="overzicht-blok">
          <h3>Stemmen het vaakst mee met de coalitie</h3>
          <ul class="sg-paren">${top.map((x) => `<li>${chip(x.p)} ${balk(x.pct)} <strong>${x.pct}%</strong> <span class="klein">${x.p.zetels} ${x.p.zetels === 1 ? 'zetel' : 'zetels'}</span></li>`).join('')}</ul>
        </div>
      </div>
      <div class="hist-kop"><span>Thema</span><span>Hoe vaak stemde de coalitie gelijk?</span><span>Grootste verschil</span></div>
      <div class="hist-themas sg-themas">${perThema.map((x) => themaRij(x, chip)).join('')}</div>
      <p class="klein verantwoording hist-verantwoording">Bron: open data van de Tweede Kamer
        (<a href="https://opendata.tweedekamer.nl" target="_blank" rel="noopener noreferrer">opendata.tweedekamer.nl</a>),
        ${DATA.stemmingen.length.toLocaleString('nl-NL')} stemmingen van ${datumNL(DATA.vanaf)} t/m ${datumNL(DATA.stemmingen[0] && DATA.stemmingen[0][0])},
        opgehaald op ${datumNL(DATA.opgehaald)}. Thema's zijn bepaald met trefwoorden (zie <code>standpunten.js</code>), dus niet elke
        stemming is perfect ingedeeld. Bijwerken: draai <code>stemgedrag-ophalen.ps1</code>.</p>`;
  }

  // Korte regel voor de themakaarten in "Waarschijnlijke koers".
  function themaRegel(themaId, leden, namen) {
    const k = voorbereiden();
    if (!k || leden.length < 2) return '';
    const l = leden.map((p) => ({ p, i: fractieIndex(p, namen) })).filter((x) => x.i >= 0);
    if (l.length < 2) return '';
    const r = bereken(k.stemmingen.filter((s) => s.themas.includes(themaId)), l);
    if (!r.geteld) return '';
    return `<p class="buiten"><strong>Echt stemgedrag:</strong> ${balk(r.pct)} in ${r.pct}% van ${r.geteld} stemmingen over dit thema stemden ze hetzelfde.</p>`;
  }

  window.CoalitieStemgedrag = { teken, themaRegel, analyse };
})();
