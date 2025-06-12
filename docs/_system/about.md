## Core Entities 

| Entity                                               | Purpose                                                                                                       | Key fields (examples)                                                                     |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Person** (Participant / Resident / Staff / Alumni) | Captures the “who” behind every contribution                                                                  | name, pronouns, bio, location, skills/tags, website links, avatar                         |
| **Process / Swatch**                                 | Smallest unit of know-how – a repeatable method, setting, recipe, jig, sample, etc.                           | title, description, step-by-step, warnings, materials used, tools used, media, QR-code ID |
| **Project**                                          | A bounded piece of work (installation, prototype, experiment) that bundles several Processes                  | title, story, timeline/updates, outcomes, linked Processes, contributors                  |
| **Material**                                         | Any physical substrate explored (seaweed plastic, copper, glass, etc.)                                        | name, properties, sourcing notes, compatible tools                                        |
| **Tool**                                             | Machine or software required by a Process                                                                     | name, model, setup notes, safety notes                                                    |
| **Event / Program / Year**                           | The context in which people gather (Labs 2025 retreat, Residency 2026, etc.)                                  | title, dates, description                                                                 |
| **Tag**                                              | Free-form or controlled vocabulary that slices across everything (e.g. “laser-cutting”, “bioplastic”, “code”) | value, category                                                                           |
| **Sample** (optional physical object)                | QR-linked artifact stored in the lab                                                                          | sample ID, photo, linked Process                                                          |
| **Asset**                                            | Images, video, CAD files, G-code, etc.                                                                        | type, file refs, license                                                                  |

## Key Relationships 
```
Person  ─┬─ authors →  Process
         └─ contributes_to → Project
Process ── uses → Material
Process ── uses → Tool
Project ── aggregates → Process
Project ── occurs_in → Event   (many-to-one)
Person  ── attends → Event
Material/Tool/Process/Project/Person ── tagged_with → Tag
Sample  ── documents → Process   (physical ↔ digital bridge)

```

## Information Architecture & Navigation 
### Top-level menu

1. **Processes** – filterable index (tags, materials, tools).
2. **Projects** – card grid of finished/ongoing works.
3. **Materials** – encyclopedia-style catalog.
4. **Tools & Machines** – setup + safety sheets.
5. **People** – explorer gallery (mission-aligned but _not_ primary navigation). 
6. **Programs** - Haystack Labs, Fab Lab Residents 

### Other Features: 

**Read Everything Cover to Cover**
Website should be structured in a way where the user could theoretically **Read-Everything** – “cover-to-cover” linear view for power users. This could either be UI that indicates what the user has read/consumed, or perhaps a dedicated view that displays the content differently, or just ensure that all index pages provide the option to view everything and not hide/filter things. 

**Surprise Me** 
A random content picker for serendipity. Could be part of the top-level menu, or built into the index pages, etc. 

*Global search + tag chips appear everywhere.*

### Detail Pages 
| Page                | Content blocks                                                                                            |
| ------------------- | --------------------------------------------------------------------------------------------------------- |
| **Process**         | hero image, quick-facts (tool, material, warnings), step list, downloads, linked Projects, linked Samples |
| **Project**         | story timeline (updates/blog), final gallery, related Processes, contributors                             |
| **Person**          | short bio card, skills, contact, list of their Projects & Processes                                       |
| **Material / Tool** | intro, key specs/settings, linked Processes & Projects                                                    |
| **Event**           | overview, cohort list, gallery                                                                            |