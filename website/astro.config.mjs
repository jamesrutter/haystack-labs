// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  integrations: [
    starlight({
      title: "Haystack Labs",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/jamesrutter/haystack-labs",
        },
      ],
      sidebar: [
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Example Guide", slug: "guides/example" },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
    }),
  ],

  adapter: cloudflare({
    imageService: "passthrough",
    platformProxy: {
      enabled: true,
    },
  }),
});
