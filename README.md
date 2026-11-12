# Formatielab

Welke partijen kunnen samen regeren, wat gaan ze dan waarschijnlijk doen, en hoe stemmen ze echt in de Tweede Kamer?

Een statische website (HTML, CSS en JavaScript, geen server nodig). Open `index.html` of bekijk de online versie.

## Wat zit erin
- **Zetels en meerderheden** in de Tweede en Eerste Kamer, voor peilingen en echte uitslagen.
- **Wat gaat een coalitie waarschijnlijk doen?** Een inschatting per thema op basis van vereenvoudigde standpunten (`standpunten.js`).
- **Echt stemgedrag**: hoe vaak partijen in de Tweede Kamer hetzelfde stemden (`stemgedrag.js`).
- **Vergelijking met eerdere kabinetten** sinds 2002, met officiële bronnen (`kabinetten.js`).

## Gegevens bijwerken
Automatisch (elke dag via GitHub Actions, of lokaal):

```
powershell -ExecutionPolicy Bypass -File .\bijwerken.ps1
```

Dit haalt op:
- de nieuwste [Peilingwijzer](https://peilingwijzer.tomlouwerse.nl/) → `peilingen.js`
- alle stemmingen uit de [open data van de Tweede Kamer](https://opendata.tweedekamer.nl) → `stemgedrag.js`

Met de hand bijgehouden: andere peilingen en uitslagen (`data.js`), standpunten en urgentie (`standpunten.js`) en eerdere kabinetten (`kabinetten.js`).

## Let op
De standpunten, prioriteiten en urgentie per thema zijn vereenvoudigde inschattingen en geen officiële partijposities. Controleer ze via de verkiezingsprogramma's. Het stemgedrag komt rechtstreeks uit de officiële open data.
