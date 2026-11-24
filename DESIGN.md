---
name: Säkerhetsmäklarna
description: Temporary alarm and camera rental for Stockholm contractors, shown as a monitored system at work.
colors:
  brand-blue: "#005cb9"
  brand-blue-deep: "#00468f"
  blue-wash: "#ebf3fc"
  blue-on-dark: "#8cc2ff"
  signal-yellow: "#fddd00"
  signal-yellow-pressed: "#ebc900"
  control-navy: "#071a33"
  panel-navy: "#0c2546"
  navy-raised: "#13325a"
  on-navy: "#e8eef6"
  on-navy-muted: "#a9b8cb"
  ink: "#0b1726"
  text: "#2b3a4b"
  muted: "#55657a"
  rule: "#dfe5ec"
  cool-ground: "#f5f7fa"
  ground-soft: "#eef2f6"
  plate: "#ffffff"
  status-ok: "#12804a"
  status-ok-on-dark: "#4fd18b"
  error: "#b42318"
typography:
  display:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 5vw, 4.25rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 96"
  headline:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.8rem, 3.2vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 96"
  title:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 650
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  lead:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.1rem, 1.4vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.1em"
  data:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 650
    lineHeight: 1.3
    fontFeature: "'tnum'"
rounded:
  control: "8px"
  md: "10px"
  lg: "16px"
  pill: "999px"
spacing:
  s1: "4px"
  s2: "8px"
  s3: "12px"
  s4: "16px"
  s5: "24px"
  s6: "32px"
  s7: "48px"
  s8: "72px"
  s9: "112px"
components:
  button-primary:
    backgroundColor: "{colors.signal-yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 24px"
    height: "50px"
  button-primary-hover:
    backgroundColor: "{colors.signal-yellow-pressed}"
    textColor: "{colors.ink}"
  button-secondary:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 24px"
    height: "50px"
  button-ghost:
    textColor: "{colors.plate}"
    rounded: "{rounded.md}"
    padding: "0 24px"
    height: "50px"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.plate}"
    rounded: "{rounded.md}"
    padding: "0 24px"
    height: "50px"
  button-ink-hover:
    backgroundColor: "{colors.navy-raised}"
  input:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "10px 12px"
    height: "48px"
  card:
    backgroundColor: "{colors.plate}"
    rounded: "{rounded.lg}"
    padding: "24px"
  nav-link:
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
    padding: "8px 12px"
  nav-link-active:
    backgroundColor: "{colors.blue-wash}"
    textColor: "{colors.brand-blue}"
  system-panel:
    backgroundColor: "{colors.panel-navy}"
    textColor: "{colors.on-navy}"
    rounded: "18px"
  status-tag:
    backgroundColor: "{colors.on-navy}"
    textColor: "{colors.control-navy}"
    rounded: "{rounded.pill}"
    padding: "5px 8px"
---

# Design System: Säkerhetsmäklarna

## Overview

**Creative North Star: "The Operator's Console"**

The site shows the alarm system at work rather than describing it. Its surfaces are what an operator would see: deep navy control panels with a faint measuring grid, hairline-divided panes, detectors listed with status dots, timestamps in tabular figures, a log that ends in a decision. Around those control surfaces sits a cool, near-white ground where the reading happens, with brand blue as the working colour for links, active states and small markers.

The mood is technical and exact, calm rather than alarmed. Type is Archivo at near-normal width in sentence case, tight-tracked in headings, with small uppercase micro-labels reserved for data keys and pane titles. Depth is quiet: 1px hairlines, soft layered shadows, rounded but not soft corners (8 to 18px). Brand yellow is a signal, never a surface: it marks the one primary action and the one live or decided thing in a view.

Imagery is real company photography (detectors, sites, scaffolding). Inside the system panel a photo is treated as a verification still: greyscale, raised contrast, with a thin yellow detection box and dark overlay captions.

**Key Characteristics:**
- Navy control surfaces (hero, flow section, CTA band, footer, mobile callbar) alternating with cool-white and white reading surfaces.
- Brand blue as the working accent; yellow only for primary action and live/decision marks.
- Hairline grids (1px gaps over the rule colour) to divide data into fields and panes.
- Uppercase micro-labels plus tabular figures for anything that is data: IDs, times, phone numbers.
- Motion that resolves a state once (event arrives, log lines appear, timeline draws) and then rests.

## Colors

A cool navy-and-white system with brand blue doing the work and brand yellow held back as a signal.

### Primary
- **Brand Blue** (brand-blue): the locked brand colour and the working accent on light ground: links, active nav item, focus rings, form focus, list markers, step numbers, the service-row arrow on hover. White text on it passes 6.2:1. Its deeper hover is **Brand Blue Deep**; its pale tint **Blue Wash** backs active nav and hovered rows.
- **Blue on Dark** (blue-on-dark): the blue's role on navy: links, icons in hero facts, timeline times and timeline dots.

### Secondary
- **Signal Yellow** (signal-yellow): the locked brand yellow. Fills the primary button ("Ring", "Begär offert"), the skip link and text selection; marks the live detector, the detection box in the event photo, and the decision line/dot in logs and the flow timeline. Pressed state is **Signal Yellow Pressed**.

### Neutral
- **Control Navy** (control-navy): dark section background (hero, flow, CTA, footer), the base of the technical grid.
- **Panel Navy** (panel-navy): raised surfaces on navy: the system panel, the CTA call card. **Navy Raised** is the ink button's hover.
- **On Navy / On Navy Muted** (on-navy, on-navy-muted): primary and secondary text on navy; muted passes 8:1.
- **Ink** (ink): headings and text on yellow.
- **Text** (text): body copy, 11:1 on white.
- **Muted** (muted): supporting copy, labels, captions, 5.6:1 on ground.
- **Rule** (rule): every hairline on light ground, and the gap colour of field grids.
- **Cool Ground / Ground Soft / Plate** (cool-ground, ground-soft, plate): page background, alternate section band, and white cards/sections.

### Status
- **Status OK** (status-ok, status-ok-on-dark): "in service" dots and form success. **Error** (error): invalid fields and form errors.

### Named Rules
**The Signal Rule.** Yellow is a mark, not a field. At most one yellow action per view region plus live/decision marks; never a section background, card fill, or heading colour on light ground.

**The Working Blue Rule.** Interactive state on light ground is always brand blue (active, focus, hover affordances). Do not introduce a second accent hue.

## Typography

**Display Font:** Archivo Variable (self-hosted via @fontsource-variable/archivo, width axis), falling back to Archivo, system-ui
**Body Font:** Archivo Variable, same family
**Label/Data:** Archivo Variable with tabular figures (`font-variant-numeric: tabular-nums`)

**Character:** One grotesque throughout. Headings sit at a near-normal width (96%) with tight negative tracking and bold weights; body runs at full width (100%) for calm reading.

### Hierarchy
- **Display** (700, clamp 2.3 to 4.25rem, 1.02): page H1s; hero H1 limited to about 13ch. Service-page H1 drops to clamp 2.1 to 3.5rem.
- **Headline** (700, clamp 1.8 to 2.75rem, 1.08): section H2s. In prose, H2 steps down to clamp 1.5 to 2rem.
- **Title** (650, 1.25rem, 1.25): H3s, card and timeline step titles; service row names scale to 1.5rem.
- **Body** (400, 1.0625rem, 1.6): running text; prose capped at 68ch, section intros at 60ch, lead at 58ch.
- **Lead** (400, clamp 1.1 to 1.25rem): the paragraph under an H1.
- **Label** (600, 0.7 to 0.8rem, 0.08 to 0.1em tracking, uppercase): data keys, pane titles, footer column heads, card bands, status tags.
- **Data** (650, 1.15rem, tabular): field values; large phone numbers reach 700 at clamp 2.2 to 3.2rem with -0.03em tracking.

### Named Rules
**The Sentence Case Rule.** Headings, buttons and nav are sentence case. Uppercase exists only at label size for data keys and pane titles, never on headings or buttons.

**The Tabular Rule.** Times, IDs, phone numbers and counts use tabular figures so columns of data align.

## Layout

Content sits in a 1240px wrap with 16px gutters on mobile and 32px from 768px. Spacing follows a nine-step scale (4, 8, 12, 16, 24, 32, 48, 72, 112px); sections breathe at 112px vertical padding, 72px below 768px. Section heads hold 60ch and sit 48px above their content.

Pages alternate background bands: cool ground, white plate, and navy. The home hero is a full-bleed navy band with the technical grid (48px squares of 1px white-at-12% lines, masked by a radial fade toward the upper right). The system panel spans the wrap width and overlaps the lower edge of the hero into the light ground below; on mobile the overlap is dropped and the panel stacks after a short lead.

Two-column splits are the default composition (copy plus media, timeline head plus list, body plus a 400px sticky quote card on service pages). They collapse to one column between 860 and 1060px. The header collapses its nav into a menu at 1220px; below 768px a fixed navy callbar (call button plus "Offert") stays at the bottom of the viewport.

## Elevation & Depth

Depth is layered and soft, carried mostly by tone (navy over navy, white over cool ground) and 1px hairlines; shadows only lift the surfaces that matter.

### Shadow Vocabulary
- **Rest** (`0 1px 2px rgba(11,23,38,.05), 0 4px 16px -4px rgba(11,23,38,.08)`): cards, the service list, the primary button.
- **Lifted** (`0 2px 4px rgba(7,26,51,.08), 0 24px 48px -16px rgba(7,26,51,.28)`): the system panel, the sticky quote card, the CTA call card, feature photos.
- **Panel inner light** (`inset 0 1px 0 rgba(255,255,255,.06)`): the top edge of navy panels.

### Named Rules
**The Hairline Rule.** Data is divided by 1px lines, not by gaps or colour blocks: field grids use a 1px gap over the rule colour; panes on navy use white at 12%.

**The Glass Header Rule.** Only fixed chrome is translucent: the white header (92% white, 12px blur) and the navy callbar (94% navy, 10px blur), plus the facts strip over service-page photos.

## Shapes

Precise, moderately rounded corners: 8px for small controls and inner items (nav links, list rows, thumbnails), 10px for buttons and inputs, 12px for service rows and overlay strips, 16px for cards and photos, 18px for the system panel. Fully round only for status dots, circular icon buttons (44px and 34px), and the pill-shaped status tag. Borders are 1px throughout; the detection box is 1.5px yellow.

## Components

### Buttons
Solid and quiet: a 50px target, 10px radius, 650 weight, 1rem, sentence case, optional 18px line icon leading or trailing.
- **Primary:** Signal Yellow with Ink text and the rest shadow; hover to the pressed yellow. One per view region (header, hero, callbar, form submit).
- **Secondary:** white with Ink text and a 1px #c6d0dc border; hover darkens the border to Ink.
- **Ghost (on navy):** white text, 4% white fill, 28% white border; hover to 10% fill and 50% border.
- **Ink / On-blue:** ink fill with white text (hover Navy Raised); white on blue for blue fields.
- **Press:** all buttons nudge down 1px on active. Focus is the global 2px blue outline at 3px offset.
- **More link:** blue text link with an arrow that slides 4px on hover.

### Cards / Containers
- **Corner Style:** 16px.
- **Background:** white on cool ground; Panel Navy at 85% with a 14% white border on navy.
- **Shadow Strategy:** rest shadow by default, lifted for sticky or featured cards.
- **Border:** 1px rule.
- **Field grid:** a card can carry an uppercase band (label type, rule border below) and a grid of fields separated by 1px hairlines; each field is a label key over a data value.

### Inputs / Fields
- **Style:** 48px high, white, 1px #b9c4d1 border, 10px radius, labels above at 600 0.9rem in Ink, optional markers in muted 400.
- **Focus:** border turns brand blue with a 4px blue-at-15% ring.
- **Error:** border in Error red; status messages in Status OK or Error at 600.

### Navigation
Sticky white header, 72px (64px mobile), translucent with blur and a rule border. Logo at 64px, nav links in 550 0.95rem Text with 8px-radius hover in Ground Soft; current page in Brand Blue on Blue Wash. On the right: "Logga in" and the phone number (tabular, 650, Ink) with 17px line icons, then a compact primary button. The mobile menu is a stacked list of 1.15rem 600 links divided by rules. The footer is Control Navy with the logo on a white plate, a large tabular phone number, and label-styled column heads.

### Service List
A single white rounded container holding rows: 150px photo, name, short description, 44px circular arrow button. Rows are divided by inset hairlines; hover fills the row with Blue Wash, scales the photo 3%, and turns the arrow button solid blue. Collapses to thumbnail plus text on mobile.

### FAQ
Native disclosure rows divided by rules; 600 1.1rem questions with a 34px circular plus/minus control at the right that fills blue when open.

### System Panel (signature)
The navy console on the home hero, always labelled with an "Exempel" pill tag. A top bar shows the object and an OK dot; below, three hairline-divided panes, each titled with an uppercase label and a 15px line icon: a detector list (ID, name, status dot), an event pane with a greyscale verification photo, a yellow detection box and dark overlay captions, and an alarm-centre log drawn as a vertical hairline with hollow dots, ending in a yellow-dotted decision line in white 600. The live detector row gets a 10% yellow fill and a 35% yellow inner border. On load the photo resolves from blur, the box scales in, and log lines appear one by one at 0.45s intervals. Reduced motion shows the settled state.

### Event Timeline
The same log grammar at section scale on navy: right-aligned times in Blue on Dark, 13px hollow dots on a 1px line that draws downward on scroll, a yellow dot and yellow time for the decision step.

## Do's and Don'ts

### Do:
- **Do** keep yellow to the primary action and to live or decided states (live detector, detection box, decision dot).
- **Do** use brand blue for every interactive state on light ground, and Blue on Dark on navy.
- **Do** divide data with 1px hairlines and label keys with uppercase micro-labels over tabular values.
- **Do** place a system or data surface on navy with the technical grid when a page needs a hero moment.
- **Do** label any illustrative system data as "Exempel".
- **Do** let motion resolve a state once and rest; always provide the settled state under reduced motion.
- **Do** use real company photographs; inside a system pane, treat them as greyscale verification stills.

### Don't:
- **Don't** fill sections, cards or headings with yellow.
- **Don't** set headings or buttons in uppercase or a condensed width; uppercase stays at label size.
- **Don't** add a second accent hue beyond brand blue and the locked yellow.
- **Don't** use heavy or hard offset shadows; depth is the two soft shadows plus tone.
- **Don't** alter the logo or recolour it; on navy it sits on a white plate.
