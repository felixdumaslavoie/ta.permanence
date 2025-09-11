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
  }),
});
const magazineSchema = z.record(
  z.string(),
  z.object({
    file: z.string(),
    thumbnail: z.string(),
  }),
);
const tractSchema = z.record(
  z.string(),
  z.object({
    file: z.string(),
  }),
);
const videoSchema = z.record(
  z.string(),
  z.object({
    url: z.string(),
    excerpt: z.string(),
  }),
);
const websiteSchema = z.record(
  z.string(),
  z.object(
    {
      url: z.string(),
      excerpt: z.string(),
      thumbnail: z.string(),
    },
  ),
);
const archives = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    // Transform string to Date object
    modification: z.coerce.date(),
    title: z.string(),
    era: z.string(),
    excerpt: z.string(),
    heroVideo: z.string(),
    translations: z.object({
      en: z.string().optional(),
      fr: z.string().optional(),
    }).optional(),
    material: z.object(
      {
        magazines: z.object({
          name: z.string(),
          description: z.string(),
          magazine: z.array(magazineSchema),
        }).optional(),
        tracts: z.object({
          name: z.string(),
          description: z.string(),
          tract: z.array(tractSchema).optional(),
        }).optional(),
        affiches: z.object({
          name: z.string(),
          description: z.string(),
          affiche: z.array(magazineSchema),
        }).optional(),
        videos: z.object({
          name: z.string(),
          description: z.string(),
          video: z.array(videoSchema).optional(),
        }),
        websites: z.object({
          name: z.string(),
          description: z.string(),
          website: z.array(websiteSchema).optional(),
        }),
      },
    ),
  }),
});
export const collections = { blog, archives };
