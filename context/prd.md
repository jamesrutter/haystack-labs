# Haystack Labs Documentation Website 

## Vision & Goals

Haystack Labs fosters innovation at the intersection of craft and technology. The platform will extend the energy of the one‑week on‑campus experience into a **living digital hub** where participants can:

* **Document projects** with rich media, process notes, and source files
* **Showcase participant profiles** and make lasting professional connections
* **Archive each year’s cohort** for historical reference and institutional memory
* **Share knowledge** through tutorials, resources, and discussion threads
* **Discover** past work via robust search, tags, and cross‑linking

---


## Functional Requirements (MVP)

1. **Project Pages**
2. **Participant Profiles**
3. **Year Collections** 
4. **Submission Workflow** - participant contributions 
5. **Search & Filter** 
6. **Responsive, accessible UI**

---


## Content Model

| Collection      | Fields                                                                                                                                   | Notes                             |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| **project**     | id (slug), title, summary, body (MDX), year (ref), participants (refs), tags \[], heroImage, gallery \[], repoLink, createdAt, updatedAt | Derived pages: `/projects/[slug]` |
| **participant** | id (slug), name, bio, avatar, website \[], social {}, yearsAttended \[], skills \[]                                                      | Page: `/people/[slug]`            |
| **year**        | id (`2025`), description, bannerImage, startDate, endDate                                                                                | Page: `/years/2025`               |
| **resource**    | id, title, body, link, type (tutorial, reading, tool)                                                                                    | Global docs                       |

---

## Tech‑Stack

**Website Framework**: Astro

**Hosting Platform**: Cloudflare (Workers)

**Content Management System**: ??? strapi, directus, payload

**Markdown Editor**: Obsidian

**Media Storage**: Cloudflare R2

**Search**: ???

**Analytics**: Umami (self-hosted)

**Auth**: ???

**Data Storage**: ???

**Media**: ???

