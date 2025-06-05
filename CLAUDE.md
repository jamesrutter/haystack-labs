# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Haystack Labs is a documentation and content project for Haystack Labs, an experimental program that brings together artists, designers, material scientists, machine builders, and coders to explore the integration of emerging technologies with craft.

The repository consists of three main components:
1. **Website** (`/website`): An Astro-based static site deployed to Cloudflare Workers
2. **Documentation** (`/docs`): Markdown content organized by participants, projects, tools, and resources
3. **CMS** (`/cms`): A Strapi-based content management system (optional/future implementation)

## Common Commands

### Website Development (`/website`)

```bash
# Install dependencies (from website directory)
cd website
pnpm install

# Start local development server
pnpm dev  # Starts server at localhost:4321

# Build the website
pnpm build  # Builds site to ./dist/

# Preview production build
pnpm preview

# Deploy to Cloudflare Workers
pnpm deploy
```

### CMS Development (`/cms`)

```bash
# Install dependencies (from cms directory)
cd cms
npm install  # or yarn install

# Start development server
npm run develop  # or yarn develop

# Build the CMS
npm run build  # or yarn build

# Start production server
npm run start  # or yarn start
```

## Architecture

### Website

- Built with **Astro**, a modern static site generator
- Deployed to **Cloudflare Workers**
- Content is primarily written in **Markdown**
- Directory structure:
  - `website/src/components`: Reusable UI components (hero, features, etc.)
  - `website/src/layouts`: Page layouts and templates
  - `website/src/pages`: Page routes and content
  - `website/src/styles`: Global CSS styles
  - `website/public`: Static assets (images, icons)

### Documentation

The `docs` directory contains Markdown files organized by:
- `participants`: Information about individual participants
- `projects`: Documentation for various projects
- `tools`: Information about tools used or developed
- `resources`: Additional resources and guides

All Markdown files from the `docs` directory are rendered by the Astro website.

### CMS (Strapi)

- Built with **Strapi**, an open-source headless CMS
- Uses **SQLite** as the default database (configurable)
- Can be configured to use MySQL or PostgreSQL
- Directory structure follows standard Strapi organization

## Content Management

Content is primarily managed through Markdown files in the `docs` directory. Each section follows a specific format:

1. **Participants** (`docs/participants/`):
   - Each participant has their own folder with kebab-case naming (e.g., `james-rutter`)
   - Each folder contains an `about.md` file with participant information

2. **Projects** (`docs/projects/`):
   - Each project has its own folder with kebab-case naming
   - Each folder contains an `about.md` or `index.md` file

3. **Tools** and **Resources** follow similar conventions

## Deployment

- Website: Deployed to Cloudflare Workers using `pnpm deploy` command
- CMS: Self-hosted deployment (configuration in `cms/config/`)

## Development Workflow

1. Clone the repository
2. Work on website and documentation changes in the respective directories
3. Use the provided commands to start development servers
4. Test changes locally
5. Deploy when ready

## Project Context

Haystack Labs is an invitational program that brings together creative professionals to explore the relationship between craft and technology. The documentation in this repository aims to capture and share the knowledge, projects, and experiences of participants.