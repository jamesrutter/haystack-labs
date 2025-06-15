import { createDirectus, rest } from "@directus/sdk";

type Global = {
  title: string;
  description: string;
};

type Tool = {
  id: string;
  name: string;
  description?: string;
  category?: string;
  location?: string;
  status?: string;
  image?: string;
  slug?: string;
};

type Schema = {
  tools: Tool[];
  global: Global;
};

const directus_url =
  import.meta.env.PUBLIC_DIRECTUS_URL || "http://localhost:8055";

const directus = createDirectus<Schema>(directus_url).with(rest());

export default directus;
