import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  // Type-check frontmatter using a schema
  schema: z.object({
    modification: z.coerce.date(),
    title: z.string(),
    excerpt: z.string(),
    authors: z.array(z.string()),
    editors: z.array(z.string()),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    heroImage: z.string(),
  }),
});

export const collections = { blog };
