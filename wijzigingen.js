// FormatieLab - contact en wijzigingslogboek
//
// CONTACT: waar mensen fouten kunnen melden. Heb je later een e-mailadres (bv. correcties@formatielab.nl),
// vul dat dan in bij "email"; dan wordt dat overal getoond in plaats van (of naast) GitHub.
window.CONTACT = {
  email: '',
  github: 'https://github.com/AprotonGuy/Formatielab/issues/new',
  reactietijd: 'binnen een week'
};

// WIJZIGINGEN: wat er inhoudelijk is aangepast (nieuwste bovenaan). Voeg een regel toe bij elke
// inhoudelijke wijziging aan standpunten, posities, kabinetten of rekenwijze. Automatische updates
// van peilingen en stemmingen hoeven hier niet in.
window.WIJZIGINGEN = [
  { datum: '2026-11-12', wat: 'Per eerder kabinet een uitklapvak "Effect op Nederland" met officiële jaarcijfers van Eurostat en het CBS (groei, werkloosheid, inflatie, staatsschuld, begrotingssaldo, asiel, nieuwbouw, CO2), dagelijks bijgewerkt.' },
  { datum: '2026-11-12', wat: 'Scenario "Huidige Tweede Kamer" gecorrigeerd (BBB 3 zetels plus eenmansfractie Keijzer) en voortaan dagelijks automatisch bijgewerkt uit de open data van de Tweede Kamer.' },
  { datum: '2026-11-12', wat: 'Eerste Kamer-cijfers gecorrigeerd en gecontroleerd met eerstekamer.nl (o.a. BBB 11 i.p.v. 16, D66 7, FvD 3, plus vijf afgesplitste eenmansfracties). Worden voortaan dagelijks automatisch bijgewerkt.' },
  { datum: '2026-11-12', wat: 'Pagina "Over en methode" toegevoegd, met correctieprocedure en dit logboek.' },
  { datum: '2026-11-12', wat: 'Bij stemmingen staat nu wie de motie indiende (met partij en medeindieners).' },
  { datum: '2026-11-12', wat: 'Alle 11 thema\'s onderbouwd met citaten uit de verkiezingsprogramma\'s 2025: 176 standpunten met paginanummer. Diverse posities aangepast na het lezen van de programma\'s (o.a. VVD bij stikstof en asiel, CDA bij asiel, D66 bij asiel, AOW-standpunten van PVV en FvD).' },
  { datum: '2026-11-12', wat: 'Score "beste formatie per thema" toegevoegd, met keuze voor een richting.' },
  { datum: '2026-11-12', wat: 'Echt stemgedrag uit de open data van de Tweede Kamer toegevoegd.' },
  { datum: '2026-11-12', wat: 'Vergelijking met eerdere kabinetten toegevoegd, met officiële bronnen (regeerakkoorden, wetten, CPB/PBL).' },
  { datum: '2026-11-12', wat: 'Eerste publieke versie van FormatieLab.' }
];

// Contactlink(s) als HTML, voor gebruik op de pagina's.
window.contactHTML = function () {
  const c = window.CONTACT || {};
  const delen = [];
  if (c.email) delen.push(`<a href="mailto:${c.email}">${c.email}</a>`);
  if (c.github) delen.push(`<a href="${c.github}" target="_blank" rel="noopener noreferrer">een melding op GitHub</a>`);
  return delen.join(' of ');
};
