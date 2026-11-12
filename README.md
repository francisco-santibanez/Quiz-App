# Quiz App

En enkel, responsiv och dynamisk quiz-applikation byggd med ren HTML, CSS och JavaScript (Vanilla JS). Applikationen hämtar slumpade frågor direkt från ett externt API och ger användaren omedelbar visuell feedback vid svar.

## Funktioner

- **Dynamiska frågor:** Hämtar obegränsat med flervalsfrågor via [Open Trivia Database API](https://opentdb.com/).
- **Visuell progress:** En dynamisk förloppsindikator (progress bar) och frågeräknare visar hur långt användaren har kommit.
- **Direkt feedback:** Svarsalternativen markeras tydligt med grönt för rätt svar och rött för fel svar, samtidigt som knapparna låses efter ett val.
- **Poängräkning & omstart:** Visar slutresultat när quizet är klart och låter användaren starta om med en ny omgång frågor.

## Filstruktur

Projektet är uppdelat i tre huvudsakliga filer för tydlig separation mellan struktur, design och logik:

```text
quiz-app/
├── index.html    # Semantisk HTML-struktur för quiz-kortet och kontroller
├── style-css     # Styling, CSS-variabler, layout och tillstånd för knappar
├── script.js     # API-anrop (fetch), spel-logik, poängräkning och DOM-hantering
└── README.md.    # Projektdokumentation
```

## Kom igång

Eftersom projektet inte kräver byggverktyg eller externa bibliotek är det mycket enkelt att köra lokalt:

1. Ladda ner eller klona filerna till en valfri mapp på din dator.
2. Öppna filen `index.html` direkt i valfri modern webläsare (t.ex. Chrome, Firefox, Edge eller Safari). _Tips:_ Om du använder VS Code rekmmenderas tillägget **Live Server** för att starta en lokal utvecklingsserver.

## API-integration

Frågorna hämtas asynkront i `script.js` med hjälp av `fetch()` från Open Trivia DB:

```javascript
const response = await fetch(
  "https://opentdb.com/api.php?amount=5&type=multiple",
);
```

- Du kan enkelt ändra antalet frågor per omgång genom att justera sifrant vid `amount=5` i URL:en.
- Applikationen innehåller även en inbyggd hjälpfunktion (`decodeHTML`) som avkodar HTML-entiteter (som `&quot;` och `&#039;`) från API-svaret till läsbar text.

## Vidareutveckling (Idéer)

Vill du bygga vidare på paketet? Här är några bra nästa steg:

- **Ketegori:** Lägg till en `<select>`-meny i HTML så att användaren kan välja ämne och svårighetsgrad innan quizet startar.
- **Timer:** Implementera en nedräkning per fråga med `setInterval()`.
- **High Score:** Spara användarens bästa resultat i webbläsaren med hjälp av `localStorage`.
