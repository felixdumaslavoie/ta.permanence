import { defineCollection, z } from "astro:content";
const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    pubDate: z.coerce.date(),
    modification: z.coerce.date(),
    title: z.string(),
    excerpt: z.string(),
    authors: z.array(z.string()),
    editors: z.array(z.string()),
    // Transform string to Date object
    heroImage: z.string(),
    translation: z.string().optional(),
    legendes: z.array(z.string()).optional(),
  }),
});

const about = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    // Transform string to Date object
    modification: z.coerce.date(),
    title: z.string(),
    excerpt: z.string(),
    heroVideo: z.string(),
    legendes: z.array(z.string()).optional(),
    translation: z.string().optional(),
  }),
});

const archives = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    // Transform string to Date object
    modification: z.coerce.date(),
    title: z.string(),
    excerpt: z.string(),
    heroVideo: z.string(),
    legendes: z.array(z.string()).optional(),
    translation: z.string().optional(),
  }),
});
export const collections = { about, blog, archives };
