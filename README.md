# Formatielab

Welke partijen kunnen samen regeren, wat gaan ze dan waarschijnlijk doen, en hoe stemmen ze echt in de Tweede Kamer?

Een statische website (HTML, CSS en JavaScript, geen server nodig). Open `index.html` of bekijk de online versie.

## Wat zit erin
- **Zetels en meerderheden** in de Tweede en Eerste Kamer, voor peilingen en echte uitslagen.
- **Wat gaat een coalitie waarschijnlijk doen?** Een inschatting per thema op basis van standpunten met citaten uit de verkiezingsprogramma's 2025 (`standpunten.js`).
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
Elk standpunt is onderbouwd met een letterlijk citaat en paginanummer uit het verkiezingsprogramma 2025 (archief DNPP); `tools/citaten-controleren.ps1` controleert dat automatisch. De positie (-2 tot +2) en prioriteit zijn een samenvatting van die passages en blijven een oordeel. Groep Markuszower heeft nog geen programma en is afgeleid van de PVV. De urgentie per thema is een inschatting op basis van het nieuws. Het stemgedrag komt rechtstreeks uit de officiële open data.
