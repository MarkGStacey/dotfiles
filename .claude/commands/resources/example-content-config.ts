import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    isDraft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    featuredImage: z.string().optional(),
    canonical: z.string().url().optional(),
  }),
});

const docs = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().optional(),
    isDraft: z.boolean().default(false),
  }),
});

export const collections = {
  blog,
  docs,
};
