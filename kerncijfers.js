// FormatieLab - officiÃ«le kerncijfers over Nederland per jaar
// AUTOMATISCH GEMAAKT door kerncijfers-ophalen.ps1 op 2026-11-12. Niet met de hand aanpassen.
// Bronnen: Eurostat (statistiekbureau van de EU) en CBS StatLine. Recente jaren kunnen nog voorlopig zijn.
window.KERNCIJFERS = {
  opgehaald: '2026-11-12',
  indicatoren: [
    { id: 'groei', naam: 'Economische groei', eenheid: '%', decimalen: 1, beter: 'hoog',
      bron: 'Eurostat (nama_10_gdp)', url: 'https://ec.europa.eu/eurostat/databrowser/view/nama_10_gdp/default/table',
      uitleg: 'Groei van het bruto binnenlands product (volume) ten opzichte van het jaar ervoor.',
      jaren: { '2001': 2.3, '2002': 0.2, '2003': 0.1, '2004': 2, '2005': 2, '2006': 3.5, '2007': 3.9, '2008': 2.1, '2009': -3.7, '2010': 1.3, '2011': 1.8, '2012': -1, '2013': 0, '2014': 1.6, '2015': 2.1, '2016': 2.4, '2017': 2.8, '2018': 2.3, '2019': 2.3, '2020': -3.9, '2021': 6.3, '2022': 5, '2023': -0.6, '2024': 1.1, '2025': 1.6 } },
    { id: 'werkloosheid', naam: 'Werkloosheid', eenheid: '%', decimalen: 1, beter: 'laag',
      bron: 'Eurostat (une_rt_a)', url: 'https://ec.europa.eu/eurostat/databrowser/view/une_rt_a/default/table',
      uitleg: 'Werklozen als percentage van de beroepsbevolking (15-74 jaar).',
      jaren: { '2009': 5.4, '2010': 6.1, '2011': 6, '2012': 6.8, '2013': 8.2, '2014': 8.4, '2015': 7.9, '2016': 7, '2017': 5.9, '2018': 4.9, '2019': 4.4, '2020': 4.9, '2021': 4.2, '2022': 3.5, '2023': 3.6, '2024': 3.7, '2025': 3.9 } },
    { id: 'inflatie', naam: 'Inflatie', eenheid: '%', decimalen: 1, beter: null,
      bron: 'Eurostat (prc_hicp_aind)', url: 'https://ec.europa.eu/eurostat/databrowser/view/prc_hicp_aind/default/table',
      uitleg: 'Gemiddelde prijsstijging (HICP) ten opzichte van het jaar ervoor.',
      jaren: { '2001': 5.1, '2002': 3.9, '2003': 2.2, '2004': 1.4, '2005': 1.5, '2006': 1.6, '2007': 1.6, '2008': 2.2, '2009': 1, '2010': 0.9, '2011': 2.5, '2012': 2.8, '2013': 2.6, '2014': 0.3, '2015': 0.2, '2016': 0.1, '2017': 1.3, '2018': 1.6, '2019': 2.7, '2020': 1.1, '2021': 2.8, '2022': 11.6, '2023': 4.1, '2024': 3.2, '2025': 3 } },
    { id: 'schuld', naam: 'Staatsschuld', eenheid: '% bbp', decimalen: 1, beter: 'laag',
      bron: 'Eurostat (gov_10dd_edpt1)', url: 'https://ec.europa.eu/eurostat/databrowser/view/gov_10dd_edpt1/default/table',
      uitleg: 'Schuld van de overheid (EMU-schuld) als percentage van het bbp.',
      jaren: { '2001': 49.5, '2002': 48.8, '2003': 49.9, '2004': 50.2, '2005': 49.6, '2006': 45, '2007': 42.8, '2008': 54.3, '2009': 56.3, '2010': 58.9, '2011': 61.2, '2012': 65.7, '2013': 67.2, '2014': 67.2, '2015': 63.8, '2016': 60.9, '2017': 56, '2018': 51.6, '2019': 47.7, '2020': 53.4, '2021': 50.5, '2022': 48.4, '2023': 45.9, '2024': 44, '2025': 44.7 } },
    { id: 'saldo', naam: 'Begrotingssaldo', eenheid: '% bbp', decimalen: 1, beter: 'hoog',
      bron: 'Eurostat (gov_10dd_edpt1)', url: 'https://ec.europa.eu/eurostat/databrowser/view/gov_10dd_edpt1/default/table',
      uitleg: 'Overschot (+) of tekort (-) van de overheid (EMU-saldo) als percentage van het bbp.',
      jaren: { '2001': -0.5, '2002': -2.2, '2003': -3.2, '2004': -1.8, '2005': -0.5, '2006': 0, '2007': -0.2, '2008': -0.1, '2009': -5.1, '2010': -5.3, '2011': -4.4, '2012': -3.8, '2013': -2.9, '2014': -2.2, '2015': -1.8, '2016': 0.2, '2017': 1.4, '2018': 1.5, '2019': 1.9, '2020': -3.7, '2021': -2.3, '2022': 0, '2023': -0.3, '2024': -0.7, '2025': -1.6 } },
    { id: 'asiel', naam: 'Asielverzoeken en nareizigers', eenheid: 'personen', decimalen: 0, beter: null,
      bron: 'CBS StatLine (80059ned)', url: 'https://opendata.cbs.nl/statline/#/CBS/nl/dataset/80059ned/table',
      uitleg: 'Totaal aantal asielverzoeken (eerste en volgende) plus nareizigers per jaar.',
      jaren: { '2001': 32580, '2002': 18665, '2003': 13400, '2004': 9780, '2005': 12345, '2006': 14465, '2007': 9730, '2008': 15275, '2009': 16165, '2010': 15155, '2011': 14630, '2012': 13170, '2013': 16725, '2014': 29890, '2015': 58880, '2016': 32840, '2017': 32755, '2018': 30540, '2019': 29445, '2020': 19180, '2021': 36675, '2022': 47990, '2023': 49890, '2024': 45640, '2025': 42360 } },
    { id: 'nieuwbouw', naam: 'Nieuwbouwwoningen', eenheid: 'woningen', decimalen: 0, beter: 'hoog',
      bron: 'CBS StatLine (82235NED)', url: 'https://opendata.cbs.nl/statline/#/CBS/nl/dataset/82235NED/table',
      uitleg: 'Aantal nieuw gebouwde woningen per jaar.',
      jaren: { '2001': 77181, '2002': 71143, '2003': 64102, '2004': 69832, '2005': 71541, '2006': 77103, '2007': 85201, '2008': 84174, '2009': 87835, '2010': 60556, '2011': 62199, '2012': 48668, '2013': 49311, '2014': 45170, '2015': 48381, '2016': 54849, '2017': 62982, '2018': 66585, '2019': 71548, '2020': 69985, '2021': 71221, '2022': 74560, '2023': 73638, '2024': 69129, '2025': 69189 } },
    { id: 'co2', naam: 'CO2-uitstoot', eenheid: 'mln ton', decimalen: 1, beter: 'laag',
      bron: 'CBS StatLine (85668NED)', url: 'https://opendata.cbs.nl/statline/#/CBS/nl/dataset/85668NED/table',
      uitleg: 'Uitstoot van kooldioxide op Nederlands grondgebied (stationaire en mobiele bronnen).',
      jaren: { '2001': 188, '2002': 187.7, '2003': 190.8, '2004': 193.9, '2005': 190.4, '2006': 184.8, '2007': 184.8, '2008': 188.7, '2009': 185.1, '2010': 197.4, '2011': 184.1, '2012': 181.9, '2013': 180.8, '2014': 175.2, '2015': 182.9, '2016': 184.5, '2017': 181.6, '2018': 178.3, '2019': 174.9, '2020': 163.2, '2021': 169.3, '2022': 156, '2023': 141.9, '2024': 140.4, '2025': 142.2 } }
  ]
};