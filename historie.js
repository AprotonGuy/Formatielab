// Formatielab — vergelijking met eerdere kabinetten (data in kabinetten.js)
(function () {
  'use strict';

  const KABINETTEN = window.KABINETTEN || [];
  const DAG = 24 * 3600 * 1000;
  const VOLLE_TERMIJN_JAAR = 4;

  function partijInfo(id) {
    return (window.PARTIJEN || {})[id] || (window.HISTORISCHE_PARTIJEN || {})[id] ||
      { kort: id, naam: id, kleur: '#888888' };
  }

  // Hoort kabinetspartij k bij coalitiepartij p (zelfde partij, alias of voorganger)?
  function zelfde(k, p, namen) {
    const n = namen(p.id);
    if (n.includes(k)) return true;
    const lijn = (window.PARTIJ_LIJN || {})[k] || [];
    return lijn.some((x) => n.includes(x));
  }

  function jaren(van, tot) {
    return ((tot ? new Date(tot) : new Date()) - new Date(van)) / DAG / 365.25;
  }
  function jaarTekst(j) {
    return j < 1 ? `${Math.round(j * 12)} maanden` : `${j.toFixed(1).replace('.', ',')} jaar`;
  }
  function jaartal(d) { return d ? d.slice(0, 4) : 'heden'; }

  function vergelijk(k, leden, namen) {
    const gedeeld = k.partijen.filter((kp) => leden.some((p) => zelfde(kp, p, namen)));
    const alleenNu = leden.filter((p) => !k.partijen.some((kp) => zelfde(kp, p, namen)));
    const alleenToen = k.partijen.filter((kp) => !gedeeld.includes(kp));
    const unie = gedeeld.length + alleenNu.length + alleenToen.length;
    const score = unie ? gedeeld.length / unie : 0;
    const looptijd = jaren(k.start, k.eind);
    const totVal = k.gevallen ? jaren(k.start, k.gevallen) : null;
    return { k, gedeeld, alleenNu, alleenToen, score, looptijd, totVal, exact: !alleenNu.length && !alleenToen.length };
  }

  function chips(ids, chip) {
    return ids.map((id) => chip(partijInfo(id))).join(' ');
  }

  function rij(v, ctx) {
    const { k } = v;
    const { chip, analyses } = ctx;
    const zittend = !k.eind;
    let status;
    if (zittend) status = '<span class="badge hist-zittend">Zittend</span>';
    else if (k.gevallen) status = `<span class="badge hist-gevallen" title="Gevallen of ontslag genomen">Gevallen na ${jaarTekst(v.totVal)}</span>`;
    else status = '<span class="badge hist-vol">Volle termijn</span>';

    const overlap = v.exact
      ? '<span class="badge hist-exact">Zelfde partijen</span>'
      : !v.gedeeld.length ? '<span class="badge hist-overlap">geen partijen gelijk</span>'
      : `<span class="badge hist-overlap">${v.gedeeld.length} van ${k.partijen.length} partijen gelijk</span>`;

    const verschil = [];
    if (v.alleenToen.length) verschil.push(`toen ook ${chips(v.alleenToen, chip)}`);
    if (v.alleenNu.length) verschil.push(`nu ook ${v.alleenNu.map((p) => chip(p)).join(' ')}`);

    // Per thema: wat deed dit kabinet, en wat verwachten we van de gekozen coalitie?
    const overzichtBron = { titel: `Parlement.com — ${k.naam} (overzicht)`, url: k.bron };
    const themaRijen = analyses.map((a) => {
      let gedaan = (k.beleid || {})[a.thema.id];
      if (typeof gedaan === 'string') gedaan = { kort: gedaan };
      const bronnen = ((gedaan && gedaan.bronnen) || []).slice();
      if (!bronnen.some((b) => b.url === k.bron)) bronnen.push(overzichtBron);
      const wie = a.soort === 'strijd' && a.tegenpolen
        ? `Botsing tussen ${ctx.chip(a.tegenpolen[0].p)} en ${ctx.chip(a.tegenpolen[1].p)}.`
        : a.trekker ? `Trekker: ${ctx.chip(a.trekker.p)} ${a.trekker.tekst.toLowerCase()}.` : '';
      return `<details class="hist-thema">
        <summary>
          <span class="pijl" aria-hidden="true">▸</span>
          <strong class="ht-naam">${a.thema.naam}</strong>
          <span class="ht-toen">${gedaan ? gedaan.kort : '<span class="klein">geen opvallend beleid vastgelegd</span>'}</span>
          <span class="ht-nu"><span class="badge soort-mini soort-${a.soort}">${ctx.soortLabel(a.soort)}</span> ${ctx.richtingKort(a)}</span>
        </summary>
        <div class="ht-inhoud">
          <div>
            <h4>Wat ${k.naam} deed</h4>
            <p>${gedaan ? (gedaan.meer || gedaan.kort) : 'Voor dit thema is geen opvallend beleid van dit kabinet vastgelegd. Dat betekent niet dat er niets gebeurde; kijk in het overzicht van het kabinet.'}</p>
          </div>
          <div>
            <h4>Verwachting voor jouw coalitie</h4>
            <p>${ctx.soortUitleg(a.soort)} Koers: ${ctx.richtingKort(a)}.</p>
            ${wie ? `<p>${wie}</p>` : ''}
          </div>
          <div class="ht-bronnen">
            <h4>Bronnen</h4>
            <ul>${bronnen.map((b) => `<li><a href="${b.url}" target="_blank" rel="noopener noreferrer">${b.titel}</a></li>`).join('')}</ul>
          </div>
        </div>
      </details>`;
    }).join('');

    return `<details class="hist-rij${v.exact ? ' exact' : ''}${v.gedeeld.length ? '' : ' anders'}">
      <summary>
        <span class="pijl" aria-hidden="true">▸</span>
        <span class="rij-naam">${k.naam}</span>
        <span class="klein">${jaartal(k.start)}–${jaartal(k.eind)}</span>
        <span class="chips">${chips(k.partijen, chip)}</span>
        ${overlap}
        ${status}
      </summary>
      <div class="hist-inhoud">
        <ul class="hist-feiten">
          <li><strong>Zetels bij de start:</strong> ${k.zetels} van 150 (${k.zetels >= 76 ? 'meerderheid' : 'minderheidskabinet'})${
            k.gedoogsteun ? `, met gedoogsteun van ${chips(k.gedoogsteun, chip)}` : ''}</li>
          <li><strong>Looptijd:</strong> ${jaarTekst(v.looptijd)}${zittend ? ' tot nu' : ''}${
            k.gevallen ? ` (gevallen na ${jaarTekst(v.totVal)}, daarna demissionair)` : ''}</li>
          <li><strong>Einde:</strong> ${k.einde}</li>
          ${verschil.length ? `<li><strong>Verschil met jouw coalitie:</strong> ${verschil.join('; ')}</li>` : ''}
        </ul>
        ${officieelBlok(k)}
        <div class="hist-kop"><span>Thema</span><span>Wat dit kabinet echt deed</span><span>Verwachting voor jouw coalitie</span></div>
        <div class="hist-themas">${themaRijen}</div>
        <p class="klein verantwoording hist-verantwoording">Klik op een thema voor uitleg en bronnen. De teksten zijn samenvattingen door Claude (AI),
          niet per regel nagelezen; de links zijn gecontroleerd op bestaan. Alles staat in <code>kabinetten.js</code>.</p>
      </div>
    </details>`;
  }

  function ankerLink(url, titel) {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${titel}</a>`;
  }

  // Officiële bronnen: formatiedossier (Kamerstukken), Nationaal Archief en openbaarheid van de notulen.
  function officieelBlok(k) {
    const o = (window.KABINET_OFFICIEEL || {})[k.id] || {};
    const items = [];
    if (o.formatie) {
      items.push(`<li>${ankerLink(`https://zoek.officielebekendmakingen.nl/dossier/${o.formatie.dossier}`,
        `Kamerstukken ${o.formatie.dossier} — Kabinetsformatie ${o.formatie.jaar}`)}
        <span class="klein">(verslagen van informateurs, het regeer- of coalitieakkoord, benoemingen)</span></li>`);
    }
    if (o.archief) {
      items.push(`<li>${ankerLink(o.archief, `Nationaal Archief — bewindslieden van ${k.naam}`)}</li>`);
    }
    const startJaar = Number(k.start.slice(0, 4));
    const eindJaar = Number((k.eind || new Date().toISOString()).slice(0, 4));
    // Notulen van jaar X komen vrij op de openbaarheidsdag in jaar X + 26 (bv. 1995 → 2021).
    const vrij = startJaar + 26;
    items.push(`<li>Notulen van de ministerraad: ${vrij <= new Date().getFullYear()
      ? 'deels openbaar bij het Nationaal Archief'
      : eindJaar === startJaar
        ? `nog geheim; die van ${startJaar} worden rond ${vrij} openbaar`
        : `nog geheim; die van ${startJaar} worden rond ${vrij} openbaar, die van ${eindJaar} rond ${eindJaar + 26}`}.</li>`);
    const algemeen = (window.BRON_ARCHIEVEN || []).map((b) => `<li>${ankerLink(b.url, b.titel)}</li>`).join('');
    return `<details class="bronnen hist-officieel">
      <summary>Officiële bronnen</summary>
      <ul class="bronnen-lijst">${items.join('')}</ul>
      <p class="klein verantwoording">Zoeken in archieven:</p>
      <ul class="bronnen-lijst klein">${algemeen}</ul>
      <p></p>
    </details>`;
  }

  function teken({ container, leden, analyses, namen, chip, richtingKort, soortLabel, soortUitleg, scenario }) {
    if (!KABINETTEN.length) {
      container.innerHTML = '<p class="klein">Geen kabinetten gevonden (kabinetten.js ontbreekt).</p>';
      return;
    }
    if (!leden.length) {
      container.innerHTML = '<p class="klein">Kies een coalitie om te zien welke eerdere kabinetten erop lijken en wat die echt deden.</p>';
      return;
    }

    // Alle kabinetten, nieuwste bovenaan.
    const vergelijkingen = KABINETTEN.map((k) => vergelijk(k, leden, namen))
      .sort((a, b) => b.k.start.localeCompare(a.k.start));

    // Samenvatting: hoe liep het af met kabinetten die (bijna) dezelfde partijen hadden?
    const afgerond = vergelijkingen.filter((v) => v.k.eind && v.score >= 0.5);
    const gevallen = afgerond.filter((v) => v.k.gevallen);
    // Tel tot de val (de demissionaire periode daarna telt niet als echt regeren).
    const gemiddeld = afgerond.length
      ? afgerond.reduce((t, v) => t + (v.totVal != null ? v.totVal : v.looptijd), 0) / afgerond.length : 0;
    const exact = vergelijkingen.filter((v) => v.exact);

    let samenvatting;
    if (!vergelijkingen.some((v) => v.gedeeld.length)) {
      samenvatting = 'Geen van deze partijen zat sinds 2002 in een kabinet. Er is dus geen ervaring om mee te vergelijken.';
    } else {
      const delen = [];
      delen.push(exact.length
        ? `Precies deze combinatie regeerde eerder: <strong>${exact.map((v) => v.k.naam).join(', ')}</strong>.`
        : 'Precies deze combinatie heeft sinds 2002 niet eerder geregeerd.');
      if (afgerond.length) {
        if (afgerond.length === 1) {
          const v = afgerond[0];
          delen.push(`Het enige afgeronde kabinet met minstens de helft van dezelfde partijen (${v.k.naam}) ` +
            `${v.k.gevallen ? `viel na ${jaarTekst(v.totVal)}` : 'zat de volle termijn uit'} ` +
            `(een volle termijn is ${VOLLE_TERMIJN_JAAR} jaar).`);
        } else {
          delen.push(`Van de ${afgerond.length} afgeronde kabinetten met minstens de helft van dezelfde partijen ` +
            `${gevallen.length === 1 ? 'viel er 1' : `vielen er ${gevallen.length}`} voortijdig; ` +
            `gemiddeld regeerden ze ${jaarTekst(gemiddeld)} tot hun val of het einde (een volle termijn is ${VOLLE_TERMIJN_JAAR} jaar).`);
        }
      }
      samenvatting = delen.join(' ');
    }

    container.innerHTML = `
      <p class="hist-samenvatting">${samenvatting}</p>
      ${scenario ? `<p class="klein">Je vergelijkt nu het scenario <em>${scenario}</em> met echte kabinetten sinds 2002.</p>` : ''}
      <div class="thema-lijst">${vergelijkingen.map((v) => rij(v, { chip, analyses, richtingKort, soortLabel, soortUitleg })).join('')}</div>`;
  }

  window.CoalitieHistorie = { teken };
})();
