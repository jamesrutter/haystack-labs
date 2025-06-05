import { defineCollection, z } from 'astro:content';

const yearsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    year: z.number(),
    description: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    theme: z.string().optional(),
    location: z.string().optional(),
  }),
});

const peopleCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    title: z.string().optional(),
    bio: z.string().optional(),
    year: z.number(),
    expertise: z.array(z.string()).optional(),
    website: z.string().url().optional(),
    social: z.object({
      twitter: z.string().optional(),
      instagram: z.string().optional(),
      linkedin: z.string().optional(),
      github: z.string().optional(),
    }).optional(),
    image: z.string().optional(),
  }),
});

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    year: z.number(),
    participants: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    status: z.enum(['planning', 'in-progress', 'completed', 'ongoing']).optional(),
    image: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    links: z.object({
      github: z.string().url().optional(),
      website: z.string().url().optional(),
      documentation: z.string().url().optional(),
    }).optional(),
  }),
});

const resourcesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(['tutorial', 'guide', 'documentation', 'tool', 'reference']),
    year: z.number().optional(),
    tags: z.array(z.string()).optional(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    author: z.string().optional(),
    links: z.object({
      github: z.string().url().optional(),
      website: z.string().url().optional(),
      download: z.string().url().optional(),
    }).optional(),
  }),
});

export const collections = {
  years: yearsCollection,
  people: peopleCollection,
  projects: projectsCollection,
  resources: resourcesCollection,
};