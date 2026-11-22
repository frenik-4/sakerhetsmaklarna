import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const tjanster = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/tjanster' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    h1: z.string(),
    short: z.string(),
    order: z.number(),
    benefits: z.array(z.string()),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

const sidor = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/sidor' }),
  schema: z.object({ title: z.string(), description: z.string(), h1: z.string() }),
});

export const collections = { tjanster, sidor };
