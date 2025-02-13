import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),	
		excerpt: z.string(),
		postedBy: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		heroImage: z.string().optional(),
	}),
});

export const collections = { blog };