---
name: Säkerhetsmäklarna
description: "A2 Bilen, med Säkerhetsmäklarnas servicebil som grund för färg och form."
colors:
  brand-blue: "#005cb9"
  brand-blue-dark: "#004a95"
  blue-light: "#eef5fc"
  signal-yellow: "#fddd00"
  ink: "#161616"
  muted: "#464d54"
  line: "#d7dde2"
  control-line: "#7b858e"
  surface: "#f2f5f7"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(3.25rem, 5.5vw, 5rem)"
    fontWeight: 700
    lineHeight: 0.94
  heading:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontWeight: 700
    lineHeight: 1
  body:
    fontFamily: "Chivo, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
rounded:
  control: "2px"
---

# A2 Bilen

Godkänt förslag finns i `../design-forslag/a-bilen-teknik/index.html`. Servicebilens dekor ger sajten sitt blå fält, gula markering och diagonala snitt. Kameraportalen använder samma färger och typsnitt. Marknadssidornas gemensamma CSS-tokens finns i `src/styles/global.css`.

## Färg och typografi

- Varumärkesblått `#005CB9` används för länkar, fokus på ljusa ytor och stora fält med vit text. Mörkare blått skapar den diagonala accenten i sidfoten och offertbandet.
- Gult `#FDDD00` används på den primära ring- eller offertknappen och i små markeringar, som remsan bredvid bilbilden.
- Vitt är grundytan. Brödtext är `#161616`, sekundär text `#464D54`. Ljusgrå ytor och tunna linjer delar in innehållet.
- Rubriker använder Barlow Condensed i 700, med 600 för stegsiffror. Chivo i 400, 500 och 700 används för brödtext, navigering och kontroller. Båda typsnitten levereras lokalt via Fontsource. Rubriker och knappar skrivs i meningsform.

## Layout och komponenter

- `--diagonal` anger kilens vinkel. På breda skärmar möts det blå fältet och fotot i en 20-graders diagonal från lodlinjen. I den staplade layouten vid 1100 px och nedåt är kanten 6 grader från horisontalplanet. Samma token formar sidtopparna, offertbandet, sidfoten och svepen.
- Startsidans foto visar servicebilen. Exemplet visar hur bilden går från detektorn till larmcentralen. På mindre skärmar ligger detektorn, spåret och larmcentralen i en rad ovanför fotot. Statusrutor märks ”Exempel”. Båda bildskisserna märks ”AI-skiss” och byts mot riktiga foton före lansering.
- Sidhuvudet är vitt och klistrigt. När sidan rullas minskar höjden, loggan krymper och öppettidstexten döljs. Huvudmenyn blir en hamburgermeny under 1200 px. Vid 768 px och nedåt finns en fast vit rad med Ring och Offert.
- Knappar, formulärfält och kort har upp till 2 px hörnradie. Ljus bakgrund använder blå fokusring, blå fält använder vit. Tjänsteindexet visar fem klickbara textkolumner och en blå hörnmarkering vid hover och fokus.
- Offertformuläret ligger i ett vitt kort och följer med vid scrollning på breda tjänstesidor. FAQ använder inbyggda expanderbara paneler med plus- och minusikoner i SVG. Sidfoten har fyra kolumner och en juridisk rad.

## Rörelse

Bilfoto, kil, spårlinje och signalens position följer sidans scrollposition via CSS `animation-timeline`. I webbläsare utan stöd uppdateras samma scrollförlopp via `requestAnimationFrame`. Vid slutpunkten visas ”Bild mottagen” och kortets blå ram framträder.

Startsidessektionerna avtäcks med ett diagonalt svep när de kommer in i bild. Rörelsen använder `transform`, `opacity` och `clip-path`. Utan JavaScript eller vid reducerad rörelse visas innehållet direkt. Larmcentralen visas då tänd, med komplett spårlinje.
