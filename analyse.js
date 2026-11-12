// Formatielab — wat gaat een coalitie waarschijnlijk doen?
//
// Per thema (zie standpunten.js) berekenen we voor de gekozen partijen:
//   koers      = gemiddelde positie, gewogen naar zetels
//   belang     = gemiddelde prioriteit, gewogen naar zetels
//   conflict   = grootste afstand tussen twee partijen die het thema allebei belangrijk vinden (prio ≥ 2)
//   focus      = belang + urgentie × 0,6 − conflict × 0,3   (bepaalt de volgorde)
// Daaruit volgt een soort: speerpunt, compromis, strijdpunt, bijzaak of weinig aandacht.
(function () {
  'use strict';

  const THEMAS = window.THEMAS || [];
  const GEWICHT_URGENTIE = 0.6;
  const GEWICHT_CONFLICT = 0.3;

  const SOORTEN = {
    speerpunt: { label: 'Speerpunt', uitleg: 'Belangrijk voor deze partijen en ze zijn het grotendeels eens. Hier gaat het kabinet waarschijnlijk vol op in.' },
    compromis: { label: 'Compromis nodig', uitleg: 'Belangrijk, maar de partijen verschillen van mening. Verwacht een middenweg.' },
    strijd:    { label: 'Strijdpunt', uitleg: 'Partijen die dit belangrijk vinden staan ver uit elkaar. Kans op ruzie, uitstel of een thema dat buiten het akkoord blijft.' },
    midden:    { label: 'Bijzaak', uitleg: 'Wordt meegenomen, maar is geen hoofdzaak voor deze partijen.' },
    weinig:    { label: 'Weinig aandacht', uitleg: 'Geen van deze partijen legt hier veel nadruk op.' }
  };
  const URGENTIE = ['geen', 'laag', 'hoog', 'zeer hoog'];
  const PRIO = ['nauwelijks', 'beetje', 'belangrijk', 'speerpunt'];

  function standpunt(thema, id, namen) {
    for (const n of namen(id)) if (thema.p[n]) return thema.p[n];
    return null;
  }

  function analyseer(thema, leden, namen) {
    const rijen = [];
    leden.forEach((p) => {
      const s = standpunt(thema, p.id, namen);
      if (s) rijen.push({ p, pos: s[0], prio: s[1], tekst: s[2], bron: s[3] || null });
    });
    if (!rijen.length) return null;

    const totaal = rijen.reduce((a, r) => a + r.p.zetels, 0);
    const w = (r) => (totaal > 0 ? r.p.zetels / totaal : 1 / rijen.length);
    const koers = rijen.reduce((a, r) => a + w(r) * r.pos, 0);
    const belang = rijen.reduce((a, r) => a + w(r) * r.prio, 0);

    let conflict = 0;
    let tegenpolen = null;
    const betrokken = rijen.filter((r) => r.prio >= 2);
    for (let i = 0; i < betrokken.length; i++) {
      for (let j = i + 1; j < betrokken.length; j++) {
        const d = Math.abs(betrokken[i].pos - betrokken[j].pos);
        if (d > conflict) {
          conflict = d;
          tegenpolen = [betrokken[i], betrokken[j]].sort((a, b) => a.pos - b.pos);
        }
      }
    }

    // Trekker: de partij met het meeste gewicht × belang (alleen als die het belangrijk vindt).
    let trekker = null;
    betrokken.forEach((r) => {
      if (!trekker || r.prio * r.p.zetels > trekker.prio * trekker.p.zetels) trekker = r;
    });

    let soort;
    if (conflict >= 2.5) soort = 'strijd';
    else if (belang >= 1.8 && conflict <= 1.5) soort = 'speerpunt';
    else if (belang >= 1.5) soort = 'compromis';
    else if (belang < 1.2) soort = 'weinig';
    else soort = 'midden';

    const focus = belang + thema.urgentie * GEWICHT_URGENTIE - conflict * GEWICHT_CONFLICT;
    return { thema, rijen, koers, belang, conflict, tegenpolen, trekker, soort, focus };
  }

  function richting(a) {
    const t = a.thema;
    const v = a.koers;
    if (Math.abs(v) < 0.5) return `Weinig verschuiving: de koers ligt tussen „${t.links}” en „${t.rechts}”.`;
    const kant = v < 0 ? t.links : t.rechts;
    return `${Math.abs(v) >= 1.25 ? 'Duidelijk' : 'Licht'} richting „${kant}”.`;
  }

  // Korte variant voor het overzicht.
  function richtingKort(a) {
    const v = a.koers;
    if (Math.abs(v) < 0.5) return 'middenkoers';
    return `${Math.abs(v) >= 1.25 ? 'duidelijk' : 'licht'} richting „${v < 0 ? a.thema.links : a.thema.rechts}”`;
  }

  function urgentieBadge(u) {
    if (u < 2) return '';
    const tekst = u >= 3 ? 'Urgent nu' : 'Actueel';
    return `<span class="badge urgent-${u}" title="Urgentie in het huidige politieke klimaat: ${URGENTIE[u]}">${tekst}</span>`;
  }

  function urgentieOordeel(a) {
    const u = a.thema.urgentie;
    if (u < 2) return '';
    if (u >= 3) {
      if (a.soort === 'strijd') return 'Urgent én verdeeld: het grootste risico voor de stabiliteit van dit kabinet.';
      if (a.soort === 'weinig' || a.soort === 'midden') return 'Urgent, maar geen prioriteit van deze partijen: ze zullen er toch iets mee moeten.';
      return 'Urgent en belangrijk voor deze partijen: dit pakken ze waarschijnlijk als eerste aan.';
    }
    if (a.soort === 'strijd') return 'Actueel en verdeeld: dit kan tot spanningen leiden.';
    return '';
  }

  function as(a, compact) {
    // Partijen op dezelfde positie stapelen we (in de compacte versie liggen ze over elkaar).
    const stap = compact ? 0 : 12;
    const stapel = {};
    const stippen = a.rijen.slice().sort((x, y) => y.p.zetels - x.p.zetels).map((r) => {
      const k = String(r.pos);
      const n = (stapel[k] = (stapel[k] || 0) + 1) - 1;
      const links = ((r.pos + 2) / 4) * 100;
      const doorzichtig = r.prio <= 1 ? ' zwak' : '';
      return `<span class="as-stip${doorzichtig}" style="left:${links}%;top:${(compact ? 3 : 4) + n * stap}px;background:${r.p.kleur}"
        title="${r.p.kort}: ${r.tekst} (${PRIO[r.prio]})"></span>`;
    }).join('');
    const hoogte = compact ? 20 : Math.max(28, 16 + Math.max(...Object.values(stapel)) * 12);
    const koers = ((a.koers + 2) / 4) * 100;
    return `<div class="as${compact ? ' compact' : ''}">
      <div class="as-balk" style="height:${hoogte}px">
        <span class="as-midden"></span>
        ${stippen}
        <span class="as-koers" style="left:${koers}%" title="Gewogen koers van de coalitie"></span>
      </div>
      ${compact ? '' : `<div class="as-labels"><span>◀ ${a.thema.links}</span><span>${a.thema.rechts} ▶</span></div>`}
    </div>`;
  }

  // Positie (−2..+2) als korte omschrijving.
  function positieTekst(thema, pos) {
    if (pos <= -1.5) return `sterk: ${thema.links}`;
    if (pos <= -0.5) return `neigt naar: ${thema.links}`;
    if (pos < 0.5) return 'midden';
    if (pos < 1.5) return `neigt naar: ${thema.rechts}`;
    return `sterk: ${thema.rechts}`;
  }

  function prioStippen(p) {
    return `<span class="prio" title="Prioriteit: ${PRIO[p]}">${'●'.repeat(p)}${'○'.repeat(3 - p)}</span>`;
  }

  function meter(label, waarde, max, tekst, uitleg) {
    const pct = Math.max(0, Math.min(100, (waarde / max) * 100));
    return `<div class="meter" title="${uitleg}">
      <div class="meter-kop"><span>${label}</span><strong>${tekst}</strong></div>
      <div class="meter-balk"><span style="width:${pct}%"></span></div>
    </div>`;
  }

  // Het standpunt dat het dichtst bij de gewogen koers ligt: de meest waarschijnlijke uitkomst.
  function waarschijnlijkeUitkomst(a) {
    const kandidaten = a.rijen.filter((r) => r.prio >= 1);
    const pool = kandidaten.length ? kandidaten : a.rijen;
    return pool.slice().sort((x, y) =>
      Math.abs(x.pos - a.koers) - Math.abs(y.pos - a.koers) || y.p.zetels - x.p.zetels)[0];
  }

  // Wat vindt de rest van de Kamer? Handig voor steun bij een minderheidskabinet.
  function buitenCoalitie(a, alle, leden, namen) {
    const inCoalitie = new Set(leden.map((p) => p.id));
    const steun = [];
    const tegen = [];
    alle.filter((p) => !inCoalitie.has(p.id)).forEach((p) => {
      const s = standpunt(a.thema, p.id, namen);
      if (!s) return;
      const d = Math.abs(s[0] - a.koers);
      if (d <= 0.75) steun.push({ p, d });
      else if (d >= 2 && s[1] >= 2) tegen.push({ p, d });
    });
    steun.sort((x, y) => y.p.zetels - x.p.zetels);
    tegen.sort((x, y) => y.d - x.d || y.p.zetels - x.p.zetels);
    const zetels = steun.reduce((t, x) => t + x.p.zetels, 0);
    return { steun, tegen, zetels };
  }

  function kaart(a, ctx) {
    const { chip, alle, leden, namen, open } = ctx;
    const s = SOORTEN[a.soort];
    const oordeel = urgentieOordeel(a);
    const uitkomst = waarschijnlijkeUitkomst(a);

    let wie = '';
    if (a.soort === 'strijd' && a.tegenpolen) {
      wie = `<p><strong>Botsing:</strong> ${chip(a.tegenpolen[0].p)} wil „${a.tegenpolen[0].tekst.toLowerCase()}”,
        ${chip(a.tegenpolen[1].p)} wil „${a.tegenpolen[1].tekst.toLowerCase()}”.</p>`;
    } else if (a.trekker) {
      wie = `<p><strong>Trekker:</strong> ${chip(a.trekker.p)} ${a.trekker.tekst.toLowerCase()}.</p>`;
    }
    const onverschillig = a.rijen.filter((r) => r.prio <= 1).map((r) => r.p.kort);

    const rijen = a.rijen.slice().sort((x, y) => x.pos - y.pos || y.p.zetels - x.p.zetels).map((r) => `<tr>
        <td>${chip(r.p)}</td>
        <td class="getal">${r.p.zetels}</td>
        <td>${r.tekst}${citaat(r, namen)}</td>
        <td class="klein">${positieTekst(a.thema, r.pos)}</td>
        <td>${prioStippen(r.prio)}</td>
      </tr>`).join('');

    const buiten = buitenCoalitie(a, alle, leden, namen);
    const steun = buiten.steun.length
      ? `${buiten.steun.map((x) => chip(x.p)).join(' ')} <span class="klein">(samen ${buiten.zetels} zetels)</span>`
      : '<span class="klein">geen partijen dicht bij deze koers</span>';
    const tegen = buiten.tegen.length
      ? buiten.tegen.map((x) => chip(x.p)).join(' ')
      : '<span class="klein">geen uitgesproken tegenstanders</span>';

    const eensgezind = Math.max(0, 4 - a.conflict);
    return `<details class="thema-rij soort-${a.soort}" data-thema="${a.thema.id}"${open ? ' open' : ''}>
      <summary>
        <span class="pijl" aria-hidden="true">▸</span>
        <span class="rij-naam">${a.thema.naam}</span>
        ${onderbouwingBadge(a.thema)}
        <span class="badge soort" title="${s.uitleg}">${s.label}</span>
        ${urgentieBadge(a.thema.urgentie)}
        <span class="rij-richting">${richtingKort(a)}</span>
        ${as(a, true)}
      </summary>
      <div class="rij-inhoud">
        <div class="rij-links">
          ${as(a, false)}
          <p class="richting">${richting(a)}</p>
          <p class="klein">${s.uitleg}</p>
          ${oordeel ? `<p class="urgent-oordeel">${oordeel}</p>` : ''}
          ${uitkomst ? `<p><strong>Meest waarschijnlijke uitkomst:</strong> ${uitkomst.tekst.toLowerCase()}
            <span class="klein">(standpunt van ${uitkomst.p.kort}, het dichtst bij de coalitiekoers)</span>.</p>` : ''}
          ${wie}
          ${onverschillig.length ? `<p class="klein">Vindt dit minder belangrijk: ${onverschillig.join(', ')}. Daar valt mogelijk iets uit te ruilen.</p>` : ''}
        </div>
        <div class="rij-rechts">
          <div class="meters">
            ${meter('Belang', a.belang, 3, `${a.belang.toFixed(1)} / 3`, 'Hoe belangrijk de coalitiepartijen dit gemiddeld vinden (gewogen naar zetels)')}
            ${meter('Eensgezindheid', eensgezind, 4, `${eensgezind.toFixed(1)} / 4`, '4 = alle partijen die dit belangrijk vinden zijn het eens; 0 = ze staan lijnrecht tegenover elkaar')}
            ${meter('Urgentie nu', a.thema.urgentie, 3, URGENTIE[a.thema.urgentie], 'Hoe dringend dit thema is in het huidige politieke klimaat')}
          </div>
          <p class="buiten"><strong>Mogelijke steun van buiten:</strong> ${steun}</p>
          <p class="buiten"><strong>Felste tegenstand:</strong> ${tegen}</p>
          ${window.CoalitieStemgedrag ? window.CoalitieStemgedrag.themaRegel(a.thema.id, leden, namen) : ''}
        </div>
      </div>
      <table class="standpunt-tabel">
        <thead><tr><th>Partij</th><th>Zetels</th><th>Standpunt</th><th>Positie</th><th>Prioriteit</th></tr></thead>
        <tbody>${rijen}</tbody>
      </table>
      ${a.thema.reden ? `<p class="actualiteit"><strong>Actualiteit:</strong> ${a.thema.reden}</p>` : ''}
      ${bronnenBlok(a, ctx)}
    </details>`;
  }

  // Citaat uit het verkiezingsprogramma met een link naar de juiste pagina.
  function citaat(r, namen) {
    if (!r.bron) return '';
    const prog = namen(r.p.id).map((n) => (window.BRON_PROGRAMMAS || {})[n]).find(Boolean);
    const pagina = prog ? `<a href="${prog.url}#page=${r.bron.p}" target="_blank" rel="noopener noreferrer" title="${prog.titel.replace(/"/g, '&quot;')}">p. ${r.bron.p}</a>` : `p. ${r.bron.p}`;
    return `<span class="citaat">„${r.bron.c}” — programma 2025, ${pagina}</span>`;
  }

  function onderbouwingBadge(t) {
    return t.onderbouwd
      ? '<span class="badge bron-ok" title="Standpunten onderbouwd met citaten uit de verkiezingsprogramma\x27s 2025">Met bronnen</span>'
      : '<span class="badge bron-nee" title="Standpunten zijn nog een inschatting, nog niet onderbouwd met citaten">Inschatting</span>';
  }

  function link(b) {
    return `<a href="${b.url}" target="_blank" rel="noopener noreferrer">${b.titel}</a>`;
  }

  // Uitklapvak met de bronnen achter dit thema.
  function bronnenBlok(a, ctx) {
    const nieuws = (window.THEMA_BRONNEN || {})[a.thema.id] || [];
    const programmas = window.BRON_PROGRAMMAS || {};
    const partijen = a.rijen.map((r) => {
      const b = ctx.namen(r.p.id).map((n) => programmas[n]).find(Boolean);
      return `<li>${ctx.chip(r.p)} ${b ? link(b) : '<span class="klein">geen bron vastgelegd</span>'}</li>`;
    }).join('');
    const algemeen = (window.BRON_ALGEMEEN || []).map((b) => `<li>${link(b)}</li>`).join('');
    return `<details class="bronnen">
      <summary>Bronnen</summary>
      <div class="bronnen-inhoud">
        <div>
          <h4>Actualiteit en urgentie</h4>
          ${nieuws.length
            ? `<ul>${nieuws.map((b) => `<li>${link(b)}</li>`).join('')}</ul>`
            : '<p class="klein">Geen nieuwsbron vastgelegd: de urgentie van dit thema is een eigen inschatting.</p>'}
        </div>
        <div>
          <h4>Standpunten van deze partijen</h4>
          <ul>${partijen}</ul>
        </div>
        <div>
          <h4>Algemeen</h4>
          <ul>${algemeen}</ul>
        </div>
      </div>
      <p class="klein verantwoording">Hoe dit tot stand kwam: ${a.thema.onderbouwd
          ? 'elk standpunt is onderbouwd met een letterlijk citaat uit het verkiezingsprogramma 2025 van de partij (klik op het paginanummer). Positie en prioriteit zijn daarop gebaseerd door Claude (AI); controleer ze gerust.'
          : 'de standpunten, posities en prioriteiten zijn nog vereenvoudigde inschattingen door Claude (AI), nog niet onderbouwd met citaten.'}
        De urgentie is een inschatting op basis van het nieuws tot ${window.STANDPUNTEN_STAND || 'nu'}.
        Alles staat in <code>standpunten.js</code> en is daar aan te passen.</p>
    </details>`;
  }

  // Onthoudt welke thema's open staan, ook als de pagina opnieuw tekent.
  const openThemas = new Set();

  function lijstje(titel, items, leeg) {
    return `<div class="overzicht-blok"><h3>${titel}</h3>${items.length
      ? `<ul>${items.join('')}</ul>`
      : `<p class="klein">${leeg}</p>`}</div>`;
  }

  function teken({ container, uitleg, leden, alle, namen, chip, stand }) {
    alle = alle || leden;
    uitleg.textContent = `Op basis van vereenvoudigde standpunten (verkiezingsprogramma's 2025) en het nieuws tot ${stand || 'nu'}. ` +
      'Grotere partijen wegen zwaarder mee. Dit is een inschatting: tijdens de formatie kan de koers nog flink veranderen.';
    if (!THEMAS.length) {
      container.innerHTML = '<p class="klein">Geen standpunten gevonden (standpunten.js ontbreekt).</p>';
      return;
    }
    if (!leden.length) {
      container.innerHTML = '<p class="klein">Kies een coalitie (vink partijen aan of klik op een coalitie in de lijst) om te zien waar die zich waarschijnlijk op richt.</p>';
      return;
    }

    const analyses = THEMAS.map((t) => analyseer(t, leden, namen)).filter(Boolean);
    analyses.sort((a, b) => b.focus - a.focus);
    const ontbreekt = leden.filter((p) => !THEMAS.some((t) => standpunt(t, p.id, namen)));

    const focus = analyses.filter((a) => a.soort === 'speerpunt' || a.soort === 'compromis').slice(0, 4)
      .map((a) => `<li><strong>${a.thema.naam}</strong>: ${richtingKort(a)}</li>`);
    const urgent = analyses.filter((a) => a.thema.urgentie >= 3)
      .sort((a, b) => b.focus - a.focus)
      .map((a) => `<li><strong>${a.thema.naam}</strong> <span class="badge soort-mini soort-${a.soort}">${SOORTEN[a.soort].label}</span>: ${richtingKort(a)}</li>`);
    const strijd = analyses.filter((a) => a.soort === 'strijd')
      .map((a) => `<li><strong>${a.thema.naam}</strong>: ${a.tegenpolen[0].p.kort} ↔ ${a.tegenpolen[1].p.kort}</li>`);
    const weinig = analyses.filter((a) => a.soort === 'weinig')
      .map((a) => `<li>${a.thema.naam}</li>`);

    container.innerHTML = `
      ${ontbreekt.length ? `<p class="waarschuwing">Geen standpunten bekend voor: ${ontbreekt.map((p) => p.kort).join(', ')}.</p>` : ''}
      <div class="overzicht">
        ${lijstje('Waarschijnlijke focus', focus, 'Geen duidelijke gezamenlijke speerpunten.')}
        ${lijstje('Moet nu sowieso aangepakt worden', urgent, 'Geen urgente thema\'s.')}
        ${lijstje('Strijdpunten', strijd, 'Geen grote botsingen tussen deze partijen.')}
        ${lijstje('Minder aandacht', weinig, 'Alle thema\'s krijgen enige aandacht.')}
      </div>
      <div class="rij-knoppen">
        <span class="klein">Thema's, van meeste naar minste verwachte aandacht. Klik op een thema voor details.</span>
        <button type="button" class="link" data-alles="open">Alles uitklappen</button>
        <button type="button" class="link" data-alles="dicht">Alles inklappen</button>
      </div>
      <div class="thema-lijst">${analyses.map((a) => kaart(a, {
        chip, alle, leden, namen, open: openThemas.has(a.thema.id)
      })).join('')}</div>`;

    container.querySelectorAll('details.thema-rij').forEach((d) => {
      d.addEventListener('toggle', () => {
        if (d.open) openThemas.add(d.dataset.thema);
        else openThemas.delete(d.dataset.thema);
      });
    });
    container.querySelectorAll('[data-alles]').forEach((knop) => {
      knop.addEventListener('click', () => {
        const open = knop.dataset.alles === 'open';
        container.querySelectorAll('details.thema-rij').forEach((d) => {
          d.open = open;
          if (open) openThemas.add(d.dataset.thema);
          else openThemas.delete(d.dataset.thema);
        });
      });
    });
    return analyses;
  }

  window.CoalitieAnalyse = { teken, analyseer, richtingKort, soortLabel: (s) => SOORTEN[s].label, soortUitleg: (s) => SOORTEN[s].uitleg };
})();
