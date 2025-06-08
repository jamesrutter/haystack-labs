import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

const years = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "../docs/years" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    year: z.number(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "../docs/projects" }),
  schema: z.object({
    // Basic project info
    title: z.string(),
    year: z.number().transform((val) => val.toString()),
    url: z.string().optional(),
    category: z.string().optional(),
    type: z.string().default("project"),

    // Media and tools
    photos: z.array(z.string()).optional(),
    videos: z.array(z.string()).optional(),
    tools: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const participants = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "../docs/participants" }),
  schema: z.object({
    name: z.string(),
    year: z.number(),
    email: z.string(),
    website: z.string().optional(),
    type: z.enum(["participant", "staff"]),
    expertise: z.array(z.string()).optional(),
    projects: z.array(z.string()).optional(),
    resources: z.array(z.string()).optional(),
  }),
});

export const collections = { years, projects, participants };
