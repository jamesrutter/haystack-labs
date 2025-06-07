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
    year: z.number(),
    url: z.string().optional(),
    category: z.string().optional(),
    type: z.string().optional(),

    // Media and tools
    photos: z.array(z.string()).optional(),
    videos: z.array(z.string()).optional(),
    tools: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),

    // Legacy fields for backward compatibility
    description: z.string().optional(),
    status: z.string().optional(),
    participants: z.array(z.string()).optional(),
    website_url: z.string().optional(),
    github_repo: z.string().optional(),
    documentation_folder: z.string().optional(),
    presentation_slides: z.string().optional(),
    deliverables: z.array(z.string()).optional(),
    code_repositories: z.array(z.string()).optional(),
    open_source_files: z.array(z.string()).optional(),
    publications: z.array(z.string()).optional(),
    technologies: z.array(z.string()).optional(),
    software_used: z.array(z.string()).optional(),
    hardware_used: z.array(z.string()).optional(),
    sustainability_focus: z.boolean().optional(),
    community_benefit: z.string().optional(),
    educational_value: z.string().optional(),
    image: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    links: z
      .object({
        github: z.string().optional(),
        documentation: z.string().optional(),
      })
      .optional(),
  }),
});

const participants = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "../docs/participants" }),
  schema: z.object({
    name: z.string(),
    year: z.number(),
    email: z.string().optional(),
    website: z.string().optional(),
    type: z.enum(["participant", "staff"]),
    expertise: z.array(z.string()).optional(),
    projects: z.array(z.string()).optional(),
    resources: z.array(z.string()).optional(),
  }),
});

export const collections = { years, projects, participants };
