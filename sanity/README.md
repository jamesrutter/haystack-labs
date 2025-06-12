# Haystack Labs Content Management System

This Sanity CMS instance manages all content for the Haystack Labs website and knowledge base. It implements the information architecture defined in the `docs/_system/about.md` specification.

## Schema Overview

The content management system is built around eight core entities that capture the "who," "what," "how," and "when" of collaborative making and research:

### Core Entities

| Entity       | Purpose                                                             | Key Relationships                                             |
| ------------ | ------------------------------------------------------------------- | ------------------------------------------------------------- |
| **Person**   | People involved in the lab (participants, residents, staff, alumni) | Authors processes, contributes to projects, attends events    |
| **Process**  | Smallest unit of know-how (methods, recipes, techniques)            | Uses materials & tools, created by people, linked to projects |
| **Project**  | Bounded pieces of work (installations, prototypes, experiments)     | Aggregates processes, involves people, occurs in events       |
| **Material** | Physical substrates explored (bioplastics, metals, etc.)            | Used in processes, compatible with tools                      |
| **Tool**     | Machines or software required for processes                         | Used in processes, compatible with materials                  |
| **Event**    | Context for gathering (retreats, residencies, workshops)            | Hosts projects, attended by people                            |
| **Sample**   | QR-linked physical artifacts stored in the lab                      | Documents processes, physical ↔ digital bridge                |
| **Tag**      | Controlled vocabulary for organization                              | Applied across all content types                              |

## Key Features

### Physical ↔ Digital Integration
- **QR Code Support**: Both processes and samples have QR code fields
- **Sample Management**: Track physical artifacts with photos, properties, and storage info
- **Lab Organization**: Tools and materials include location and setup information

### Rich Content Types
- **Step-by-Step Processes**: Detailed instructions with images and warnings
- **Project Timelines**: Chronicle development with updates and galleries
- **Media Management**: Support for images, files, CAD data, G-code, etc.

### Relationship Mapping
- **Cross-References**: Materials ↔ Tools, Processes ↔ Projects
- **Authorship**: Track who created what content
- **Event Context**: Link projects and people to specific programs

### Content Organization
- **Hierarchical Structure**: Custom studio navigation for easy content management
- **Tagging System**: Flexible categorization across all content types
- **Status Tracking**: Monitor project progress and sample availability

## Content Structure in Studio

The Sanity Studio is organized into logical sections:

```
Haystack Labs Content
├── Processes (step-by-step know-how)
├── Projects (bounded works)
├── People (community members)
├── ─────────────────────
├── Lab Resources
│   ├── Materials
│   ├── Tools & Equipment
│   └── Samples
├── ─────────────────────
└── Organization
    ├── Events & Programs
    └── Tags
```

## Usage Guidelines

### Creating Content

1. **Start with Core Entities**: Create people, materials, and tools first
2. **Build Processes**: Document methods with step-by-step instructions
3. **Document Projects**: Show how processes come together in real work
4. **Link Everything**: Use references to create rich interconnections
5. **Tag Thoughtfully**: Use consistent vocabulary for discoverability

### QR Code Workflow

1. **Process QR Codes**: Generate QR stickers for lab signage that link to process pages
2. **Sample Tracking**: Physical samples get QR codes linking to their digital records
3. **Lab Integration**: QR codes bridge physical workspace with digital knowledge base

### Content Best Practices

- **Rich Media**: Include high-quality images for every step and outcome
- **Safety First**: Always document warnings and safety considerations
- **Attribution**: Credit all contributors and maintain authorship records
- **Living Documentation**: Keep content updated as processes evolve

## Development

### Running the Studio

```bash
cd sanity
npm run dev
```

### Deploying

```bash
npm run build
npm run deploy
```

### Schema Changes

When modifying schemas:
1. Update the relevant schema file in `schemaTypes/`
2. Test locally with `npm run dev`
3. Deploy changes with `npm run deploy`

## API Integration

The content is available via Sanity's APIs for integration with the Astro website:

- **GROQ Queries**: Query content with Sanity's graph-relational query language
- **CDN Delivery**: Images and files served via Sanity's global CDN
- **Real-time**: Content updates appear immediately on the website

## Future Enhancements

Potential additions to consider:
- **Version History**: Track process iterations over time
- **Collaborative Editing**: Multiple authors on single documents
- **Advanced Search**: Full-text search across all content
- **Analytics Integration**: Track which processes are most accessed
- **Export Tools**: Generate printable lab guides from digital processes
