# Haystack Fab Lab Documentation Platform

## Vision & Goals

The Haystack Fab Lab is where traditional craft meets emerging technology. This platform extends the energy of hands-on making into a **living digital ecosystem** where all research activities are documented, connected, and discoverable.

The platform serves multiple research programs:
- **Haystack Labs** - Intensive week-long explorations of craft-technology intersections
- **Fab Lab Residents** - Long-term makers developing projects and maintaining the lab  
- **Research Collaborations** - Cross-program experimental work
- **Community Programs** - Workshops, skill-shares, and educational initiatives

### Core Objectives

* **Document processes** with rich media, step-by-step guides, and safety notes
* **Connect knowledge** through sophisticated relationship mapping between people, projects, materials, and techniques
* **Bridge physical-digital** with QR-coded samples linking lab artifacts to documentation
* **Enable discovery** through multiple navigation paths, search, and serendipitous exploration
* **Build community** by highlighting collaboration networks and expertise
* **Preserve institutional memory** across programs and years

---

## Content Model & Information Architecture

### Core Entities

| Entity            | Purpose                                             | Key Fields                                                                      | Relationships                                                |
| ----------------- | --------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **Person**        | Contributors across all programs                    | name, pronouns, bio, location, skills, contact, avatar                          | authors → Process, contributes_to → Project, attends → Event |
| **Process**       | Atomic units of know-how                            | title, description, steps, warnings, materials_used, tools_used, media, QR_code | uses → Material/Tool, part_of → Project, documents → Sample  |
| **Project**       | Bounded work aggregating processes                  | title, story, timeline, outcomes, gallery, repo_link                            | aggregates → Process, involves → Person, occurs_in → Event   |
| **Material**      | Physical substrates being explored                  | name, properties, sourcing, safety_notes, compatibility                         | used_in → Process, featured_in → Project                     |
| **Tool**          | Equipment and software                              | name, model, setup_guide, safety_sheet, status                                  | required_for → Process, used_in → Project                    |
| **Event/Program** | Context for work (Labs 2025, Residency Spring 2026) | title, dates, description, type, banner_image                                   | contains → Project, attended_by → Person                     |
| **Sample**        | Physical artifacts with QR links                    | sample_ID, photo, location, condition                                           | documents → Process, created_in → Project                    |
| **Tag**           | Cross-cutting categorization                        | value, category, color                                                          | applied_to → everything                                      |
| **Asset**         | Media files                                         | type, file_path, license, caption                                               | attached_to → everything                                     |

### Relationship Mapping
```
Person ─┬─ authors → Process ─┬─ uses → Material
        └─ contributes_to → Project ─── uses → Tool
                                    └─ aggregates → Process
Process ── documents → Sample (QR bridge)
Event ─┬─ contains → Project
       └─ attended_by → Person
Tag ── applied_to → [all entities]
```

---

## Navigation & Information Architecture

### Primary Navigation
1. **Processes** - Filterable library of techniques (primary content discovery)
2. **Projects** - Portfolio of completed and ongoing work
3. **Materials** - Encyclopedia of substrates and properties  
4. **Tools & Machines** - Equipment guides and status
5. **People** - Community directory and expertise finder
6. **Programs** - Historical archive organized by events/cohorts

### Discovery Features
- **Global Search** - Full-text across all content types
- **Tag Clouds** - Visual clustering of related content
- **"Surprise Me"** - Random content picker for serendipity
- **"Read Everything"** - Linear browsing with progress tracking
- **Related Content** - Algorithm-powered suggestions based on relationships

### Detail Page Templates

| Page Type    | Content Blocks                                                                                                                                           |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Process**  | Hero image, quick-facts (tools/materials/warnings), step-by-step guide, media gallery, downloads, related projects, linked samples, contributor profiles |
| **Project**  | Story timeline with updates, final gallery, contributor network, process inventory, outcomes/downloads, related work                                     |
| **Person**   | Bio card, skills/expertise, contact info, contribution history (processes authored, projects involved), collaboration network                            |
| **Material** | Properties overview, sourcing info, safety notes, compatible tools, featured processes/projects                                                          |
| **Tool**     | Setup guide, safety sheet, current status, required processes, project history                                                                           |
| **Event**    | Program overview, cohort directory, project showcase, timeline/updates                                                                                   |

---

## Technical Architecture

### Core Stack
- **Frontend Framework**: Astro 
- **Content Management**: Directus 


### Content Pipeline
1. **Flexible Input** - Contributors use preferred tools (Markdown, Google Docs, direct CMS)
2. **Editorial Processing** - Content review and enhancement
3. **CMS Structuring** - Import into Directus with proper entity relationships
4. **Static Generation** - Astro pulls from Directus API to build optimized site
5. **Edge Deployment** - Fast global delivery via Cloudflare

### Physical-Digital Integration
- **QR Code System** - Each physical sample gets unique code linking to documentation
- **Lab Inventory** - Tool status and availability integrated with documentation
- **Mobile Interface** - Workshop-optimized views for in-lab reference

---

## Functional Requirements

### MVP Features
1. **Content Management** - Directus admin for all entity types and relationships
2. **Static Site Generation** - Astro consuming Directus API
3. **Multi-format Content** - Rich text, image galleries, video embeds, file downloads
4. **Cross-linking System** - Automatic relationship discovery and manual curation
5. **Search & Filter** - Full-text search with faceted filtering by tags, materials, tools
6. **Responsive Design** - Mobile-first approach for lab and workshop use
7. **QR Code Integration** - Generate and track codes for physical samples

### Phase 2 Enhancements
1. **Advanced Search** - Semantic search, visual similarity
2. **Collaboration Tools** - Comments, annotations, version control
3. **Personal Collections** - Users can bookmark and organize content
4. **API Access** - External integrations and data exports
5. **Analytics Dashboard** - Content usage and community insights

---

## Success Metrics

### Content Quality
- Process documentation completion rate
- Cross-linking density between entities
- Media richness (images, videos per process/project)

### Community Engagement  
- Active contributors across programs
- Collaboration network density
- Knowledge reuse (process references in new projects)

### Discovery & Access
- Search success rate and query diversity
- Content view distribution (are niche processes being found?)
- Physical-digital bridge usage (QR code scans)

---

## Content Strategy

### Editorial Workflow
1. **Contributor Onboarding** - Templates and guidelines for each content type
2. **Review Process** - Editorial enhancement and relationship mapping
3. **Quality Standards** - Media specifications, safety note requirements
4. **Community Moderation** - Peer review and collaborative improvement

### Institutional Memory
- **Program Continuity** - Document practices that span multiple cohorts
- **Knowledge Evolution** - Track how processes improve over time
- **Alumni Network** - Maintain connections between past and current participants

