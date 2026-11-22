# Säkerhetsmäklarna – ny webbplats

Statisk sajt byggd med [Astro](https://astro.build) 6. Testmiljö: **https://asparagus.se/sakerhetsmaklarna/** (noindex).

```bash
npm install
npm run dev        # http://localhost:4321/sakerhetsmaklarna/
npm run build      # bygger till dist/
```

## Struktur

| Var | Vad |
|---|---|
| `src/content/tjanster/*.md` | De 5 tjänstesidorna (text, SEO-titel, description, fördelar, FAQ) |
| `src/content/sidor/*.md` | Om oss, Integritetspolicy |
| `src/data/*.json` | Startsidans texter, generell FAQ, referenser, kundnamn |
| `src/lib/site.ts` | Kontaktuppgifter, meny |
| `src/styles/global.css` | Designtokens (färger, typsnitt, spacing) från varumärket |
| `src/assets/img/` | Utvalda bilder (Astro gör WebP i flera storlekar) |
| `src/assets/img/original/` | Alla originalbilder från gamla sajten (ej i git, se INDEX.md) |
| `public/api/offert.php` | Offertformulär. Utan `config.php` = testläge, inget skickas |
| `migration/` | 301-regler och URL-karta från gamla `?page_id=`-adresser |

## Publicering

Push till `main` bygger och laddar upp via SFTP till Inleed (`.github/workflows/deploy-test.yml`).
Repo-secrets: `SFTP_HOST`, `SFTP_PORT`, `SFTP_USERNAME`, `SFTP_PASSWORD`, `SFTP_DIR`, `SFTP_KNOWN_HOSTS`.

## Lansering på sakerhetsmaklarna.se (senare)

1. Bygg med `SITE_URL=https://www.sakerhetsmaklarna.se BASE_PATH=/ PUBLIC_INDEXERA=true`.
2. Ladda upp till Loopia, lägg in `migration/redirects.htaccess` i webbrotens `.htaccess`.
3. Ta bort noindex-raden i `public/.htaccess`, uppdatera `ErrorDocument`.
4. Lägg `public/api/config.php` på servern med riktig mottagare.
5. Rör inte MX/SPF (Microsoft 365). Lägg till DMARC.
6. Search Console: ny sitemap, bevaka 404:or.

## Väntar på svar från Tobbe

Texterna innehåller `<!-- TODO Tobbe: ... -->` och `todo`-fält i `src/data/faq.json`. Viktigast:
- Pris eller från-pris, minsta hyrestid, bindningstid
- Gäller "samma dag" även helger och utanför Stockholm?
- Vad ingår i hyran, vem äger och försäkrar utrustningen
- Vilka larmcentraler och partners får nämnas, certifieringar
- Kamerabevakning: tillstånd, skyltning, lagringstid
- Om oss: får grundarna nämnas, siffror
- Integritetspolicy: org.nr, lagringstider, biträden (utkast, granskas)
- Bekräfta kundlistan (`src/data/kunder.json`)
