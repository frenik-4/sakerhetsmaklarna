export const SITE = {
  namn: 'Säkerhetsmäklarna',
  juridisktNamn: 'SäkerhetsMäklarna i Sverige AB',
  telefon: '08-752 98 00',
  telefonHref: 'tel:+4687529800',
  epost: 'info@sakerhetsmaklarna.se',
  gata: 'Strålgatan 11',
  postnr: '112 63',
  ort: 'Stockholm',
  grundat: 1999,
  // Testmiljö: indexeras inte av sökmotorer förrän PUBLIC_INDEXERA=true
  indexera: import.meta.env.PUBLIC_INDEXERA === 'true',
  // Kundlistan är obekräftad (TODO Tobbe): visas i testmiljön men inte i produktion
  // förrän PUBLIC_KUNDER_BEKRAFTADE=true.
  visaKunder: import.meta.env.PUBLIC_INDEXERA !== 'true' || import.meta.env.PUBLIC_KUNDER_BEKRAFTADE === 'true',
};

/** Bygger en länk som respekterar base-sökvägen (/sakerhetsmaklarna/ i test). */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`.replace(/\/{2,}/g, '/');
}

export const NAV = [
  { href: '/bygglarm/', label: 'Bygglarm' },
  { href: '/stallningslarm/', label: 'Ställningslarm' },
  { href: '/butik-kontor/', label: 'Butik & kontor' },
  { href: '/kamerabevakning/', label: 'Kamerabevakning' },
  { href: '/larmvaska/', label: 'Larmväska' },
  { href: '/referenser/', label: 'Referenser' },
];
