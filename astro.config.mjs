// @ts-check
import { defineConfig } from 'astro/config';

// Test/utveckling: https://asparagus.se/sakerhetsmaklarna/
// Vid lansering: byt site till https://www.sakerhetsmaklarna.se och base till '/'.
export default defineConfig({
  site: process.env.SITE_URL || 'https://asparagus.se',
  base: process.env.BASE_PATH || '/sakerhetsmaklarna',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
