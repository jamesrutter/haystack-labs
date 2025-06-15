# Haystack Fab Lab Documentation Hub

This repository houses the comprehensive documentation platform for all research activities at the Haystack Mountain School of Crafts Fab Lab. Our mission is to create a living digital archive that captures the innovation happening at the intersection of craft and technology.

## Scope & Programs

This platform encompasses all research and residency programs coordinated through the Fab Lab:

- **Haystack Labs** - The week-long intensive exploring craft-technology intersections
- **Fab Lab Residents** - Long-term makers developing projects and maintaining the lab
- **Research Projects** - Cross-program experimental work and collaborations
- **Community Workshops** - Educational programs and skill-sharing sessions

## Website | `/website`

A dynamic documentation platform that serves as both archive and active workspace for our community.

**Website URL:** [https://labs.haystack-mtn.org](https://labs.haystack-mtn.org)

### Technical Architecture
- **Frontend**: Astro (Static Site Generator)
- **CMS**: Directus (relational content management)
- **Hosting**: Cloudflare Workers
- **Media Storage**: Cloudflare R2
- **Search**: (TBD)
- **Analytics**: Umami (self-hosted)

## Content Model & Information Architecture

The platform is built around interconnected core entities that capture the full spectrum of research activities:

### Core Entities

| Entity            | Purpose                                                            | Key Relationships                             |
| ----------------- | ------------------------------------------------------------------ | --------------------------------------------- |
| **Person**        | Anyone who contributes - participants, residents, staff, alumni    | Authors Processes, contributes to Projects    |
| **Process**       | Smallest unit of know-how - methods, recipes, techniques, swatches | Uses Materials/Tools, part of Projects        |
| **Project**       | Bounded work that bundles Processes into cohesive outcomes         | Aggregates Processes, involves People         |
| **Material**      | Physical substrates being explored                                 | Used in Processes, linked to Projects         |
| **Tool**          | Machines and software required for work                            | Used in Processes, documented for safety      |
| **Program/Event** | Context where work happens - Labs cohorts, residencies             | Contains Projects, attended by People         |
| **Sample**        | Physical artifacts with QR codes linking digital documentation     | Documents Processes, bridges physical-digital |

### Navigation Structure

1. **Processes** - Filterable library of techniques and methods
2. **Projects** - Showcase of completed and ongoing work  
3. **Materials** - Encyclopedia of substrates and their properties
4. **Tools & Machines** - Setup guides and safety documentation
5. **People** - Community directory and contributor profiles
6. **Programs** - Historical archive of events and cohorts

## Content Contribution Workflow

### For Contributors (Flexible Input)
Contributors can document their work through multiple channels:
- **Markdown files** in this repository
- **Google Docs** for collaborative writing  
- **Direct Directus interface** for structured data entry
- **Media uploads** through the web interface

### Content Processing Pipeline
1. **Flexible Input** - Accept content in contributor's preferred format
2. **Editorial Review** - Ensure quality and completeness  
3. **CMS Integration** - Structure content in Directus with proper relationships
4. **Website Generation** - Astro pulls from Directus API to generate static pages
5. **Cross-linking** - Automatic relationship building between entities

## Key Features

### Physical-Digital Bridge
- QR codes on physical samples link to digital documentation
- Lab inventory management integrated with project documentation
- Tool status and availability tracking

### Knowledge Discovery
- **Global search** across all content types
- **Tag-based filtering** with controlled vocabulary
- **"Surprise Me"** random content discovery
- **"Read Everything"** linear browsing for comprehensive exploration

### Community Building
- Contributor profiles highlighting expertise and interests
- Project collaboration history and networks
- Alumni connection to ongoing work

## Getting Started

### For New Contributors
1. Create your profile in `/docs/people/[your-name]/`
2. Document your projects in `/docs/projects/[project-name]/`
3. Add process documentation as you develop techniques
4. Tag everything for discoverability

### For Developers
See `/website/README.md` for technical setup and deployment instructions.

### For Content Editors
Access the Directus admin interface to manage structured content and relationships.

---

## Philosophy

This platform embodies our belief that innovation emerges from the intersection of making and documentation. By capturing not just outcomes but processes, failures, and iterations, we build a living library that serves both current makers and future innovators.

The physical lab and digital documentation are designed as complementary spaces - the digital extends and amplifies the physical, while the physical grounds the digital in tangible experimentation. 