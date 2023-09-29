// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// 2. Define a `type` and `schema` for each collection
const postCollection = defineCollection({
  type: 'content', // v2.5.0 and later
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    image: z.string(),
    alt: z.string(),
    tags: z.array(z.string()),
  }),
});
const workCollection = defineCollection({
  type: 'content', // v2.5.0 and later
  schema: z.object({
    name: z.string(),
    sizeclass: z.string(),
    type: z.string(),
    img: z.string(),
    alt: z.string(),
    tags: z.array(z.string()),
    order: z.number(),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  'posts': postCollection,
  'works' : workCollection,
};