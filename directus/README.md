# Haystack Labs Directus CMS

This is the Directus CMS backend for the Haystack Labs knowledge management system. It provides a headless CMS for managing people, processes, projects, materials, tools, events, tags, and physical samples.

## Quick Start

### 1. Environment Setup

Copy the Docker Compose environment file and customize it:

```bash
# Copy the example environment file
cp directus/docker-compose.yaml directus/.env

# Edit the .env file with your configuration
# Key variables to set:
# - ADMIN_EMAIL: Your admin email
# - ADMIN_PASSWORD: Your admin password  
# - DIRECTUS_SECRET: A random secret key
# - DB_PASSWORD: Database password
```

### 2. Start Directus

```bash
cd directus
npm run dev
```

This will start Directus at `http://localhost:8055`.

### 3. Install Dependencies & Run Schema Setup

```bash
# Install dependencies
npm install

# Run the schema setup script
npm run setup-schema
```

### 4. Access Admin Panel

Visit `http://localhost:8055` and log in with your admin credentials to see your configured collections.

## Schema Overview

The schema is designed around the core entities from `docs/_system/about.md`:

### Core Collections

- **People** - Participants, residents, staff, and alumni
- **Processes** - Swatches, methods, recipes, and know-how
- **Projects** - Bounded pieces of work that bundle processes
- **Materials** - Physical substrates and materials  
- **Tools** - Machines and software
- **Events** - Programs, years, and gathering contexts
- **Tags** - Free-form and controlled vocabulary
- **Samples** - QR-linked physical artifacts

### Key Relationships

```
Person  ─┬─ authors →  Process
         └─ contributes_to → Project
Process ── uses → Material
Process ── uses → Tool
Project ── aggregates → Process
Project ── occurs_in → Event
Person  ── attends → Event
Sample  ── documents → Process
```

## API Usage

After setup, you can access your data via:

- **REST API**: `http://localhost:8055/items/{collection}`
- **GraphQL**: `http://localhost:8055/graphql`

Example queries:

```bash
# Get all processes
curl "http://localhost:8055/items/processes"

# Get a person with their projects
curl "http://localhost:8055/items/people/1?fields=*,projects.projects_id.*"

# Get processes with their materials and tools
curl "http://localhost:8055/items/processes?fields=*,materials.materials_id.*,tools.tools_id.*"
```

## Frontend Integration

Use the Directus SDK in your Astro frontend:

```typescript
// In your Astro pages
import { createDirectus, rest, readItems } from '@directus/sdk';

const directus = createDirectus('http://localhost:8055').with(rest());

// Fetch processes
const processes = await directus.request(readItems('processes'));
```

## Collections Detail

### People
- **Fields**: name, pronouns, bio, location, skills, website_links, avatar, person_type
- **Types**: participant, resident, staff, alumni

### Processes  
- **Fields**: title, description, steps, warnings, qr_code_id, hero_image, author
- **Relationships**: author (person), materials (M2M), tools (M2M), projects (M2M), samples

### Projects
- **Fields**: title, story, timeline_updates, outcomes, hero_image, start_date, end_date, event
- **Relationships**: event, contributors (people M2M), processes (M2M)

### Materials
- **Fields**: name, description, properties, sourcing_notes, image
- **Relationships**: processes (M2M)

### Tools
- **Fields**: name, model, description, setup_notes, safety_notes, image
- **Relationships**: processes (M2M)

### Events
- **Fields**: title, description, start_date, end_date, event_type, location, hero_image
- **Types**: haystack_labs, fab_lab_residency, workshop, program
- **Relationships**: projects, attendees (people M2M)

### Tags
- **Fields**: value, category, description, color
- **Categories**: process_type, material_type, tool_type, skill, technique, general

### Samples
- **Fields**: sample_id, name, description, photo, location, date_created, process
- **Relationships**: process (M2O)

## Development Commands

```bash
# Start Directus development server
npm run dev

# Stop Directus
npm run down

# View logs
npm run logs

# Reset and re-run schema setup
npm run setup-schema
```

## Troubleshooting

### Schema Setup Issues

If the schema setup fails:

1. Make sure Directus is running (`npm run dev`)
2. Check that your admin credentials are correct in the environment
3. Verify the Directus URL is accessible
4. Check the logs: `npm run logs`

### Permission Issues

If you get permission errors when accessing data:

1. Go to Settings > Access Policies in the Directus admin
2. Edit the "Public" policy to grant appropriate permissions
3. For development, you can grant full access to all collections

### Common API Errors

- **Invalid token**: Check your authentication setup
- **Collection not found**: Ensure the schema setup completed successfully
- **Permission denied**: Update your access policies in Directus admin

## Next Steps

1. **Content Entry**: Use the Directus admin panel to start adding your people, processes, projects, etc.
2. **Public Access**: Configure public permissions for collections you want to expose via API
3. **Frontend Integration**: Use the Directus SDK in your Astro frontend to fetch and display data
4. **Customization**: Extend the schema as needed for your specific use cases

The schema is designed to be flexible and extensible. You can add new fields, collections, and relationships as your project evolves.
