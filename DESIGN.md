---
name: Säkerhetsmäklarna
description: Temporary alarm and camera rental for Stockholm contractors, presented as a construction-site sign.
colors:
  sign-blue: "#005cb9"
  sign-blue-deep: "#00468f"
  night-blue: "#062f5c"
  blue-wash: "#eaf2fb"
  signal-yellow: "#fddd00"
  signal-yellow-pressed: "#ebc900"
  ink: "#0f1a26"
  text: "#26323f"
  muted: "#4f5b69"
  rule: "#c9d1da"
  galvanised-steel: "#e4e9ee"
  plate-white: "#ffffff"
  field-border: "#8794a2"
  ok: "#137a43"
  error: "#b42318"
typography:
  display:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 6.2vw, 5.4rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.005em"
    fontVariation: "'wdth' 72"
  headline:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 3.6vw, 3rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.005em"
    fontVariation: "'wdth' 72"
  phone:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 5vw, 3.6rem)"
    fontWeight: 800
    lineHeight: 1
    fontFeature: "'tnum'"
    fontVariation: "'wdth' 72"
  title:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 700
    lineHeight: 1.15
    fontVariation: "'wdth' 88"
  field-value:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "1.45rem"
    fontWeight: 800
    lineHeight: 1.1
    fontVariation: "'wdth' 75"
  body:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    fontVariation: "'wdth' 100"
  band:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.08em"
    fontVariation: "'wdth' 80"
  label:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.1em"
    fontVariation: "'wdth' 85"
rounded:
  plate: "2px"
spacing:
  s1: "4px"
  s2: "8px"
  s3: "12px"
  s4: "16px"
  s5: "24px"
  s6: "32px"
  s7: "48px"
  s8: "72px"
  s9: "104px"
  frame: "10px"
  rule-gap: "2px"
components:
  button-primary:
    backgroundColor: "{colors.signal-yellow}"
    textColor: "{colors.ink}"
    typography: "{typography.band}"
    rounded: "{rounded.plate}"
    padding: "0 24px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.signal-yellow-pressed}"
    textColor: "{colors.ink}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.plate-white}"
    rounded: "{rounded.plate}"
    padding: "0 24px"
    height: "52px"
  button-ink-hover:
    backgroundColor: "{colors.night-blue}"
  button-secondary:
    backgroundColor: "{colors.plate-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "0 24px"
    height: "52px"
  button-secondary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.plate-white}"
  button-on-blue:
    backgroundColor: "{colors.plate-white}"
    textColor: "{colors.sign-blue}"
    rounded: "{rounded.plate}"
    height: "52px"
  button-on-blue-hover:
    backgroundColor: "{colors.blue-wash}"
    textColor: "{colors.sign-blue-deep}"
  sign-band:
    backgroundColor: "{colors.sign-blue}"
    textColor: "{colors.plate-white}"
    typography: "{typography.band}"
    padding: "8px 24px 13px"
  field:
    backgroundColor: "{colors.plate-white}"
    textColor: "{colors.ink}"
    padding: "16px 24px"
  field-yellow:
    backgroundColor: "{colors.signal-yellow}"
    textColor: "{colors.ink}"
    padding: "16px 24px"
  input:
    backgroundColor: "{colors.plate-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "12px"
    height: "50px"
  header:
    backgroundColor: "{colors.sign-blue}"
    textColor: "{colors.plate-white}"
    height: "76px"
---

# Design System: Säkerhetsmäklarna

## Overview

**Creative North Star: "Arbetsplatsskylten"**

The site is the construction-site sign a contractor reads at the gate every morning: white plates framed in thick sign blue, each plate divided into labelled fields that state what, who, since when and which number to call. Every important surface is built as a sign: a blue title band across the top, a grid of fields ruled by 2px ink lines, and one yellow signal field that holds the action. Real company photos are mounted as one field of the sign, never as a dimmed hero behind text.

The world is dense and declarative rather than airy. Type is Archivo Variable throughout, run on its width axis: condensed heavy capitals for headings, field values, bands and buttons (echoing the van livery), normal width for reading text. Plates sit on a light galvanised-steel ground. Corners are square. Depth is a single soft drop that lifts the plate off the steel; everything inside the plate is flat.

The world explicitly refuses the security-category default: dark photo hero with overlay, shield iconography as emblem, and a row of three free-floating feature cards. Repeated items live as ruled fields inside one sign instead.

**Key Characteristics:**
- Signs, not cards: blue frame, blue title band, ruled field grid.
- Yellow is a signal, reserved for the primary action, the phone number and the "in operation" value.
- One typeface, many widths: condensed caps for signage, full width for prose.
- Square plates (2px) on a steel ground; one plate shadow, no others.
- Telephone numbers set largest, in tabular figures.

## Colors

A locked two-colour brand (sign blue and signal yellow) on white plates and a cool steel ground, with near-black ink for rules and type.

### Primary
- **Sign Blue** (`sign-blue`): the brand blue. Sign frames, title bands, the sticky header, the footer sign, the CTA band, the mobile call bar, links, focus rings, list markers. White on it passes 6.2:1. Locked brand colour.
- **Sign Blue Deep** (`sign-blue-deep`): link hover and the mobile nav drawer behind the header.
- **Night Blue** (`night-blue`): hover state of the ink button only.
- **Blue Wash** (`blue-wash`): hover fill of the white-on-blue button.

### Secondary
- **Signal Yellow** (`signal-yellow`): the signal field. Phone field in the header, the call field at the foot of every hero sign, the "I drift" fact, the CTA call plate, the primary button, step numerals, benefit-check tiles, the active-nav underline, text selection, and the whole service row on hover. Ink on it passes 13:1. Locked brand colour.
- **Signal Yellow Pressed** (`signal-yellow-pressed`): hover state for yellow buttons and the header phone field.

### Neutral
- **Ink** (`ink`): headings, field values, the 2px rules between fields and above lists, secondary-button borders, the ink button.
- **Text** (`text`): body copy (12:1 on white).
- **Muted** (`muted`): field labels and secondary copy (7:1 on white, 6:1 on steel).
- **Rule** (`rule`): 1px separators between list rows, FAQ items and service rows.
- **Galvanised Steel** (`galvanised-steel`): the page ground behind the plates.
- **Plate White** (`plate-white`): sign plates, fields, inputs, `section--plate` bands.
- **Field Border** (`field-border`): resting 2px border of form inputs.
- **OK / Error** (`ok`, `error`): form status text and invalid-field borders only.

### Named Rules
**The Signal Field Rule.** Yellow fills a field, never decorates. It holds the call to action, the phone number, or the one fact that answers "how fast": one yellow field per sign. A yellow button sits on blue or white; a yellow call field carries an ink button, never a yellow one.

**The Locked Pair Rule.** Sign Blue and Signal Yellow are brand-locked. Do not shift, tint into gradients, or introduce a third accent hue.

## Typography

**Display Font:** Archivo Variable (with Archivo, system-ui fallback), self-hosted via `@fontsource-variable/archivo` with the width axis.
**Body Font:** the same family at normal width.

**Character:** One grotesque stretched to two voices. Condensed (72-88% width), weight 800, uppercase for everything a sign would say; 100% width, weight 400 for everything a person would read.

### Hierarchy
- **Display** (800, `clamp(2.2rem, 6.2vw, 5.4rem)`, 0.95, 72% width, uppercase): H1 inside the hero sign. Service pages scale it to `clamp(2.3rem, 5vw, 4.4rem)`.
- **Headline** (800, `clamp(1.9rem, 3.6vw, 3rem)`, 0.95, 72% width, uppercase): section H2. Inside prose it drops to `clamp(1.6rem, 2.6vw, 2.2rem)`.
- **Phone** (800, `clamp(2.4rem, 5vw, 3.6rem)`, 1, 72% width, tabular figures): the telephone number in call fields; the largest thing in its field.
- **Field Value** (800, 1.45rem, 1.1, 75% width, uppercase; 1.2rem under 640px): the answer inside a sign field. Service names and USP terms use the same voice at larger sizes.
- **Title** (700, 1.35rem, 1.15, 88% width): H3, card and reference titles.
- **Body** (400, 1.0625rem, 1.6, 100% width): reading text; lead paragraphs to 60ch, prose to 68ch.
- **Band** (800, 0.95rem, 0.08em tracking, 80% width, uppercase): sign title bands. Buttons use the same voice at 1rem, 85% width, 0.04em.
- **Label** (700, 0.78rem, 0.1em tracking, 85% width, uppercase, muted): the field key above a value. Form labels use 0.82rem, 88% width, ink.

### Named Rules
**The Livery Rule.** If a sign would print it, it is condensed heavy caps. If a person reads it as a sentence, it is normal-width sentence case. Never set body copy condensed, never set a heading in sentence-case regular.

**The Number Is Biggest Rule.** In any call field the phone number outranks every other element, set in tabular figures (`.num`).

## Layout

Content sits in a 1280px wrap with 16px gutters (32px from 768px). Sections are spaced on a 72px rhythm (`s8`), with a 4/8/12/16/24/32/48/72/104 scale. Each major section is either a full sign or an open band on steel or white.

Signs are CSS grids whose 2px gaps reveal an ink background: the gap is the rule. The hero sign is a two-column grid (text field 1.25fr, photo field 1fr), a four-up fact row, and a full-width yellow call field. Under 900px it collapses to one column with the call field moved directly under the title, then photo, then a 2-up fact grid. The service index is a ruled list of rows (thumbnail, name, short text, arrow tile) that collapses to thumbnail plus text, losing the arrow under 600px. The service page pairs prose with a 420px sticky quote sign, stacking under 1060px.

The header is a sticky 76px blue band (64px on phones); nav collapses into a drawer at 1280px, and the phone field hides at 640px where a fixed blue call bar at the bottom carries the call and quote buttons. The footer is one large blue sign with a four-column field grid (2 columns at 960px, 1 at 540px).

**The Rule Is The Gap Rule.** Field separators are 2px grid gaps over ink, not borders on each cell.

## Elevation & Depth

Flat inside, lifted outside. A sign plate casts one soft compound shadow onto the steel ground; nothing inside a sign casts a shadow. Depth between fields comes only from ink rules and the blue frame. The service page's sticky quote sign drops even this shadow.

### Shadow Vocabulary
- **Plate** (`box-shadow: 0 1px 1px rgba(15,26,38,.08), 0 8px 24px -8px rgba(15,26,38,.18)`): every `.sign` plate.
- **Call bar** (`box-shadow: 0 -2px 10px rgba(0,0,0,.15)`): the fixed mobile call bar only.
- **Input focus** (`box-shadow: 0 0 0 3px rgba(0,92,185,.25)`): a halo, not elevation.

### Named Rules
**The One Plate Rule.** Only the sign plate is lifted. Buttons, fields, rows and tiles are flat; state is shown with fill colour, never with a shadow.

## Shapes

Square. The only radius is 2px (`plate`) on buttons and inputs; sign plates, fields, tiles and photos have hard corners. The sign frame is a 10px solid blue border (6px under 640px). Small square tiles recur: the 40px yellow step numeral, the 52px ink-bordered arrow tile on service rows, the 36px FAQ toggle, the yellow check tile in benefit lists. Lists open with a 2px ink rule and separate with 1px rule lines.

## Components

### Sign (signature)
The core container. White plate, 10px blue frame, plate shadow. A blue **title band** runs across the top in band type, often with a left label and a right detail ("LARMUTHYRNING · STOCKHOLM" / "SEDAN 1999"), or an H2 plus a white band link. Below it, a **field grid**: white fields with a muted label (`field__k`) over a condensed value (`field__v`), ruled by 2px ink gaps. One field may be yellow. Photos fill a field edge to edge with `object-fit: cover`.

### Call Field
A yellow field spanning the sign's full width: "RING OSS" label, phone number in phone type, and an ink "Begär offert" button with an arrow. On the home hero it wipes in once from the left (`clip-path` inset, 0.7s, `cubic-bezier(.16,1,.3,1)`, 0.15s delay); reduced motion disables it. The CTA band repeats it as a yellow plate on a blue band.

### Buttons
- **Shape:** rectangular plate, 2px radius, 52px tall, 24px side padding, 2px border.
- **Type:** 800, 1rem, 85% width, uppercase, 0.04em tracking; optional 20px line icon.
- **Primary (yellow):** yellow fill and border, ink text; hover to pressed yellow. Used on blue or white grounds.
- **Ink:** ink fill, white text; hover to night blue. Used inside yellow fields.
- **Secondary:** white with 2px ink border; hover inverts to ink.
- **On blue:** white with blue text, for the mobile call bar; hover to blue wash.
- **Transitions:** 0.15s on background, colour and border only.
- **Arrow link (`more`):** button type without a box, arrow nudges 4px right on hover.

### Service Row
A ruled list row, the whole row is the link (stretched `::after`). On hover or focus-within the entire row fills yellow, its arrow tile inverts to ink with a yellow arrow and nudges 3px; focus shows a 3px inset blue outline.

### Inputs / Fields
- **Style:** white, 2px field-border stroke, 2px radius, 50px min height, 12px padding.
- **Label:** condensed uppercase ink, 0.82rem; optional marker in muted sentence case.
- **Hover:** border to ink. **Focus:** border to sign blue plus 3px blue halo.
- **Error:** border to error red; status line in bold ok/error text.

### Navigation
Sticky blue header band. Logo sits on its own small white plate. Nav items are white condensed caps (700, 1rem, 76% width); hover shows a 3px translucent white underline, the current page a 3px yellow underline (inset shadow). The phone sits in a yellow field flush to the right edge of the band. Under 1280px a menu button opens a deep-blue drawer with 1.35rem condensed caps rows separated by translucent white lines.

### FAQ
Native `details` list under a 2px ink rule, 1px rule separators. Question in 700, 1.15rem, 92% width ink. A 36px square ink-bordered toggle on the right turns yellow on hover and ink with a yellow minus when open.

### Footer
One large blue sign: field grid with translucent white gaps, logo on a white plate, yellow field labels, phone in 2rem condensed figures.

## Do's and Don'ts

### Do:
- **Do** build every primary surface as a sign: blue frame, blue title band, ruled field grid.
- **Do** give each sign at most one yellow field, and put the action or phone number in it.
- **Do** set signage text in Archivo condensed (72-88% width) heavy caps and reading text at 100% width.
- **Do** separate fields with 2px ink grid gaps and list rows with 1px rule lines under a 2px ink top rule.
- **Do** mount real company photos as a field of the sign, full bleed within the field.
- **Do** set phone numbers in tabular figures and make them the largest element in their field.
- **Do** keep corners square: 2px on controls, 0 on plates.
- **Do** use the inline line icons (2px stroke, round caps) at 16-22px, only beside text.

### Don't:
- **Don't** use a dark photo hero with a text overlay.
- **Don't** use shield icons as decorative emblems, or lay out free-floating rounded feature cards; repeated items (steps, references) are fields ruled inside one sign.
- **Don't** add a third accent hue or alter the locked blue and yellow.
- **Don't** cast shadows on anything inside a sign or on buttons.
- **Don't** round plates or cards, or use pill buttons.
- **Don't** put a yellow button inside a yellow field; use the ink button there.
