# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: construction companies and their project managers in Stockholm who need temporary alarm protection on a building site or scaffolding, fast and without buying equipment. They often evaluate on behalf of larger contractors and procurement, so the company must read as established and serious.
Secondary: shops, offices and event organisers with an acute need (after a break-in, a broken alarm, a temporary location) who want help the same day.
Logged-in customers use /kameror/ to view their rented cameras.

## Product Purpose

Säkerhetsmäklarna (SäkerhetsMäklarna i Sverige AB, founded 1999) rents out, installs, connects to an alarm-receiving centre, adjusts and dismantles mobile wireless alarms and camera surveillance. The website exists to turn visitors into phone calls and quote requests. Success, as confirmed by the user: trust first. The site must look established enough for large contractors and procurement, while still letting an acute visitor call within seconds.

## Positioning

A rental-only alarm broker with 25+ years in the trade. Mostly wireless detectors, so the alarm is often live the same day. Photo-verifying detectors let the alarm centre see before guards are dispatched. Full service from installation to dismantling, rented for as long as needed.

## Operating Context

Visitors arrive from search, often on a phone at a site. Phone (08-752 98 00) is the main channel, followed by the quote form. Contractors compare suppliers and check references.

## Capabilities and Constraints

- Static Astro 6 site.
  - Staging: asparagus.se/sakerhetsmaklarna (Inleed).
  - Production later: Loopia.
  - $0/month target, no third-party trackers.
- PHP form handler.
- The camera portal is a mockup until a real Milestone XProtect account is provided.
- Open facts (TODO Tobbe, do not invent):
  - Prices.
  - Rental terms.
  - Whether "samma dag" (same day) applies on weekends and outside Stockholm.
  - Partners and certifications.
  - Confirmation of the customer list.

## Brand Commitments

- Logo (src/assets/logo.png).
- Brand blue #005cb9 and brand yellow #fddd00 are locked.
- Typefaces may be changed (user confirmed 2026-11-24).
- Swedish language, plain and direct voice.

## Evidence on Hand

- Real photos from the old site, in src/assets/img/ (selected) and src/assets/img/original/ (54 images, INDEX.md). Subjects: the branded van, technicians mounting detectors, scaffolding, site signs.
- Customer names in src/data/kunder.json (Arcona, JM, NCC, Skanska and others; unconfirmed).
- References in src/data/referenser.json.
- Not available, never fabricate:
  - Testimonials with quotes.
  - Numbers of installations.
  - Response times.
  - Certifications.

## Product Principles

1. Trust is earned with real proof: real photos, real customer names, 25 years. No stock imagery, no invented figures.
2. The phone number is always one tap away. The acute visitor must never hunt for it.
3. Plain Swedish over sales talk. Say what is included and what happens next.
4. Serious, not alarmist. No fear marketing.

## Accessibility & Inclusion

WCAG 2.1 AA (axe 0 violations on all pages today), keyboard navigable, works well on phones outdoors.
