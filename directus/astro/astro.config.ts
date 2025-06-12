// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || process.env.DIRECTUS_URL || '';
const directusHost = directusUrl?.split('//')[1];

const siteUrl = process.env.PUBLIC_SITE_URL || 'http://localhost:4321';

export default defineConfig({
  site: siteUrl,
  adapter: vercel(),
  integrations: [react()],
  image: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: directusHost,
        pathname: '/assets/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8055',
        pathname: '/assets/**',
      },
    ],
  },
  vite: {
    envPrefix: ['PUBLIC_', 'DIRECTUS_'],
    assetsInclude: ['**/*.svg'],
  },
});
