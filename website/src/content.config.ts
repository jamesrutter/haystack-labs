import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

const years = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "../docs/years" }),
});
const projects = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "../docs/projects" }),
});
const participants = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "../docs/participants" }),
});

export const collections = { years, projects, participants };
