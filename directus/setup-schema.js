#!/usr/bin/env node

/**
 * Haystack Labs Directus Schema Setup
 *
 * This script programmatically creates all the collections, fields, and relationships
 * needed for the Haystack Labs content management system based on the entities
 * defined in docs/_system/about.md
 */

import {
  createDirectus,
  rest,
  readCollections,
  createCollection,
  createField,
  createRelation,
  authentication,
  login,
} from "@directus/sdk";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration - update these based on your setup
const config = {
  url: process.env.DIRECTUS_URL || "http://localhost:8055",
  email: process.env.ADMIN_EMAIL || "james@haystack-mtn.org",
  password: process.env.ADMIN_PASSWORD || "Fablab8922!",
};

const client = createDirectus(config.url).with(rest()).with(authentication());

async function setup_schema() {
  try {
    console.log("🚀 Starting Haystack Labs schema setup...");

    // Login to Directus
    await client.login(config.email, config.password);
    console.log("✅ Successfully logged in to Directus");

    // Create collections
    await create_collections();
    console.log("✅ Collections created");

    // Create fields for each collection
    await create_fields();
    console.log("✅ Fields created");

    // Create relationships
    await create_relationships();
    console.log("✅ Relationships created");

    console.log("🎉 Schema setup complete!");
  } catch (error) {
    console.error("❌ Error setting up schema:", error);
    process.exit(1);
  }
}

async function create_collections() {
  const collections = [
    {
      collection: "people",
      meta: {
        collection: "people",
        icon: "person",
        note: "Participants, residents, staff, and alumni",
        display_template: "{{name}}",
        hidden: false,
        singleton: false,
        sort_field: "sort",
        accountability: "all",
        color: "#6644FF",
        sort: 1,
      },
      schema: { name: "people" },
    },
    {
      collection: "processes",
      meta: {
        collection: "processes",
        icon: "build_circle",
        note: "Swatches, methods, recipes, and know-how",
        display_template: "{{title}}",
        hidden: false,
        singleton: false,
        sort_field: "sort",
        accountability: "all",
        color: "#00C897",
        sort: 2,
      },
      schema: { name: "processes" },
    },
    {
      collection: "projects",
      meta: {
        collection: "projects",
        icon: "folder_special",
        note: "Bounded pieces of work that bundle processes",
        display_template: "{{title}}",
        hidden: false,
        singleton: false,
        sort_field: "sort",
        accountability: "all",
        color: "#FF6B35",
        sort: 3,
      },
      schema: { name: "projects" },
    },
    {
      collection: "materials",
      meta: {
        collection: "materials",
        icon: "category",
        note: "Physical substrates and materials",
        display_template: "{{name}}",
        hidden: false,
        singleton: false,
        sort_field: "sort",
        accountability: "all",
        color: "#A855F7",
        sort: 4,
      },
      schema: { name: "materials" },
    },
    {
      collection: "tools",
      meta: {
        collection: "tools",
        icon: "handyman",
        note: "Machines and software",
        display_template: "{{name}}",
        hidden: false,
        singleton: false,
        sort_field: "sort",
        accountability: "all",
        color: "#F59E0B",
        sort: 5,
      },
      schema: { name: "tools" },
    },
    {
      collection: "events",
      meta: {
        collection: "events",
        icon: "event",
        note: "Programs, years, and gathering contexts",
        display_template: "{{title}}",
        hidden: false,
        singleton: false,
        sort_field: "sort",
        accountability: "all",
        color: "#EF4444",
        sort: 6,
      },
      schema: { name: "events" },
    },
    {
      collection: "tags",
      meta: {
        collection: "tags",
        icon: "local_offer",
        note: "Free-form and controlled vocabulary",
        display_template: "{{value}}",
        hidden: false,
        singleton: false,
        sort_field: "sort",
        accountability: "all",
        color: "#8B5CF6",
        sort: 7,
      },
      schema: { name: "tags" },
    },
    {
      collection: "samples",
      meta: {
        collection: "samples",
        icon: "qr_code_2",
        note: "QR-linked physical artifacts",
        display_template: "{{sample_id}}",
        hidden: false,
        singleton: false,
        sort_field: "sort",
        accountability: "all",
        color: "#10B981",
        sort: 8,
      },
      schema: { name: "samples" },
    },
  ];

  for (const collection of collections) {
    try {
      await client.request(createCollection(collection));
      console.log(`  ✓ Created collection: ${collection.collection}`);
    } catch (error) {
      if (error.message?.includes("already exists")) {
        console.log(`  ⚠ Collection already exists: ${collection.collection}`);
      } else {
        console.error(
          `  ❌ Error creating collection ${collection.collection}:`,
          error.message
        );
      }
    }
  }
}

async function create_fields() {
  // Fields for People collection
  const people_fields = [
    {
      field: "name",
      type: "string",
      meta: { required: true, interface: "input", width: "full" },
    },
    {
      field: "pronouns",
      type: "string",
      meta: { interface: "input", width: "half" },
    },
    {
      field: "bio",
      type: "text",
      meta: { interface: "input-rich-text-html", width: "full" },
    },
    {
      field: "location",
      type: "string",
      meta: { interface: "input", width: "half" },
    },
    {
      field: "skills",
      type: "json",
      meta: {
        interface: "tags",
        width: "full",
        options: { placeholder: "Add skills..." },
      },
    },
    {
      field: "website_links",
      type: "json",
      meta: { interface: "list", width: "full" },
    },
    {
      field: "avatar",
      type: "uuid",
      meta: { interface: "file-image", width: "half" },
    },
    {
      field: "person_type",
      type: "string",
      meta: {
        interface: "select-dropdown",
        width: "half",
        options: {
          choices: [
            { text: "Participant", value: "participant" },
            { text: "Resident", value: "resident" },
            { text: "Staff", value: "staff" },
            { text: "Alumni", value: "alumni" },
          ],
        },
      },
    },
    {
      field: "sort",
      type: "integer",
      meta: { interface: "input", hidden: true },
    },
  ];

  // Fields for Processes collection
  const processes_fields = [
    {
      field: "title",
      type: "string",
      meta: { required: true, interface: "input", width: "full" },
    },
    {
      field: "description",
      type: "text",
      meta: { interface: "input-rich-text-html", width: "full" },
    },
    {
      field: "steps",
      type: "text",
      meta: {
        interface: "input-rich-text-html",
        width: "full",
        note: "Step-by-step instructions",
      },
    },
    {
      field: "warnings",
      type: "text",
      meta: { interface: "input-rich-text-html", width: "full" },
    },
    {
      field: "qr_code_id",
      type: "string",
      meta: {
        interface: "input",
        width: "half",
        note: "Unique QR code identifier",
      },
    },
    {
      field: "hero_image",
      type: "uuid",
      meta: { interface: "file-image", width: "half" },
    },
    {
      field: "sort",
      type: "integer",
      meta: { interface: "input", hidden: true },
    },
  ];

  // Fields for Projects collection
  const projects_fields = [
    {
      field: "title",
      type: "string",
      meta: { required: true, interface: "input", width: "full" },
    },
    {
      field: "story",
      type: "text",
      meta: { interface: "input-rich-text-html", width: "full" },
    },
    {
      field: "timeline_updates",
      type: "json",
      meta: {
        interface: "list",
        width: "full",
        note: "Blog-style timeline updates",
      },
    },
    {
      field: "outcomes",
      type: "text",
      meta: { interface: "input-rich-text-html", width: "full" },
    },
    {
      field: "hero_image",
      type: "uuid",
      meta: { interface: "file-image", width: "half" },
    },
    {
      field: "start_date",
      type: "date",
      meta: { interface: "datetime", width: "half" },
    },
    {
      field: "end_date",
      type: "date",
      meta: { interface: "datetime", width: "half" },
    },
    {
      field: "sort",
      type: "integer",
      meta: { interface: "input", hidden: true },
    },
  ];

  // Fields for Materials collection
  const materials_fields = [
    {
      field: "name",
      type: "string",
      meta: { required: true, interface: "input", width: "full" },
    },
    {
      field: "description",
      type: "text",
      meta: { interface: "input-rich-text-html", width: "full" },
    },
    {
      field: "properties",
      type: "json",
      meta: { interface: "list", width: "full" },
    },
    {
      field: "sourcing_notes",
      type: "text",
      meta: { interface: "input-rich-text-html", width: "full" },
    },
    {
      field: "image",
      type: "uuid",
      meta: { interface: "file-image", width: "half" },
    },
    {
      field: "sort",
      type: "integer",
      meta: { interface: "input", hidden: true },
    },
  ];

  // Fields for Tools collection
  const tools_fields = [
    {
      field: "name",
      type: "string",
      meta: { required: true, interface: "input", width: "full" },
    },
    {
      field: "model",
      type: "string",
      meta: { interface: "input", width: "half" },
    },
    {
      field: "description",
      type: "text",
      meta: { interface: "input-rich-text-html", width: "full" },
    },
    {
      field: "setup_notes",
      type: "text",
      meta: { interface: "input-rich-text-html", width: "full" },
    },
    {
      field: "safety_notes",
      type: "text",
      meta: { interface: "input-rich-text-html", width: "full" },
    },
    {
      field: "image",
      type: "uuid",
      meta: { interface: "file-image", width: "half" },
    },
    {
      field: "sort",
      type: "integer",
      meta: { interface: "input", hidden: true },
    },
  ];

  // Fields for Events collection
  const events_fields = [
    {
      field: "title",
      type: "string",
      meta: { required: true, interface: "input", width: "full" },
    },
    {
      field: "description",
      type: "text",
      meta: { interface: "input-rich-text-html", width: "full" },
    },
    {
      field: "start_date",
      type: "date",
      meta: { interface: "datetime", width: "half" },
    },
    {
      field: "end_date",
      type: "date",
      meta: { interface: "datetime", width: "half" },
    },
    {
      field: "event_type",
      type: "string",
      meta: {
        interface: "select-dropdown",
        width: "half",
        options: {
          choices: [
            { text: "Haystack Labs", value: "haystack_labs" },
            { text: "Fab Lab Residency", value: "fab_lab_residency" },
            { text: "Workshop", value: "workshop" },
            { text: "Program", value: "program" },
          ],
        },
      },
    },
    {
      field: "location",
      type: "string",
      meta: { interface: "input", width: "half" },
    },
    {
      field: "hero_image",
      type: "uuid",
      meta: { interface: "file-image", width: "half" },
    },
    {
      field: "sort",
      type: "integer",
      meta: { interface: "input", hidden: true },
    },
  ];

  // Fields for Tags collection
  const tags_fields = [
    {
      field: "value",
      type: "string",
      meta: { required: true, interface: "input", width: "half" },
    },
    {
      field: "category",
      type: "string",
      meta: {
        interface: "select-dropdown",
        width: "half",
        options: {
          choices: [
            { text: "Process Type", value: "process_type" },
            { text: "Material Type", value: "material_type" },
            { text: "Tool Type", value: "tool_type" },
            { text: "Skill", value: "skill" },
            { text: "Technique", value: "technique" },
            { text: "General", value: "general" },
          ],
        },
      },
    },
    {
      field: "description",
      type: "text",
      meta: { interface: "input", width: "full" },
    },
    {
      field: "color",
      type: "string",
      meta: { interface: "select-color", width: "half" },
    },
    {
      field: "sort",
      type: "integer",
      meta: { interface: "input", hidden: true },
    },
  ];

  // Fields for Samples collection
  const samples_fields = [
    {
      field: "sample_id",
      type: "string",
      meta: {
        required: true,
        interface: "input",
        width: "half",
        note: "Unique physical sample ID",
      },
    },
    {
      field: "name",
      type: "string",
      meta: { interface: "input", width: "half" },
    },
    {
      field: "description",
      type: "text",
      meta: { interface: "input-rich-text-html", width: "full" },
    },
    {
      field: "photo",
      type: "uuid",
      meta: { interface: "file-image", width: "half" },
    },
    {
      field: "location",
      type: "string",
      meta: {
        interface: "input",
        width: "half",
        note: "Physical storage location",
      },
    },
    {
      field: "date_created",
      type: "timestamp",
      meta: { interface: "datetime", width: "half" },
    },
    {
      field: "sort",
      type: "integer",
      meta: { interface: "input", hidden: true },
    },
  ];

  const all_fields = {
    people: people_fields,
    processes: processes_fields,
    projects: projects_fields,
    materials: materials_fields,
    tools: tools_fields,
    events: events_fields,
    tags: tags_fields,
    samples: samples_fields,
  };

  for (const [collection, fields] of Object.entries(all_fields)) {
    console.log(`  Creating fields for ${collection}...`);
    for (const field of fields) {
      try {
        await client.request(createField(collection, field));
        console.log(`    ✓ Created field: ${field.field}`);
      } catch (error) {
        if (error.message?.includes("already exists")) {
          console.log(`    ⚠ Field already exists: ${field.field}`);
        } else {
          console.error(
            `    ❌ Error creating field ${field.field}:`,
            error.message
          );
        }
      }
    }
  }
}

async function create_relationships() {
  // Create junction tables first for many-to-many relationships
  const junction_collections = [
    {
      collection: "people_projects",
      meta: { hidden: true },
      schema: { name: "people_projects" },
    },
    {
      collection: "people_events",
      meta: { hidden: true },
      schema: { name: "people_events" },
    },
    {
      collection: "processes_materials",
      meta: { hidden: true },
      schema: { name: "processes_materials" },
    },
    {
      collection: "processes_tools",
      meta: { hidden: true },
      schema: { name: "processes_tools" },
    },
    {
      collection: "projects_processes",
      meta: { hidden: true },
      schema: { name: "projects_processes" },
    },
  ];

  // Create junction collections
  for (const collection of junction_collections) {
    try {
      await client.request(createCollection(collection));
      console.log(`  ✓ Created junction collection: ${collection.collection}`);
    } catch (error) {
      if (error.message?.includes("already exists")) {
        console.log(
          `  ⚠ Junction collection already exists: ${collection.collection}`
        );
      } else {
        console.error(
          `  ❌ Error creating junction collection ${collection.collection}:`,
          error.message
        );
      }
    }
  }

  // Add fields to junction tables
  const junction_fields = {
    people_projects: [
      {
        field: "people_id",
        type: "uuid",
        meta: { interface: "select-dropdown-m2o", hidden: true },
      },
      {
        field: "projects_id",
        type: "uuid",
        meta: { interface: "select-dropdown-m2o", hidden: true },
      },
      {
        field: "role",
        type: "string",
        meta: { interface: "input", width: "full", note: "Role in project" },
      },
    ],
    people_events: [
      {
        field: "people_id",
        type: "uuid",
        meta: { interface: "select-dropdown-m2o", hidden: true },
      },
      {
        field: "events_id",
        type: "uuid",
        meta: { interface: "select-dropdown-m2o", hidden: true },
      },
      {
        field: "role",
        type: "string",
        meta: { interface: "input", width: "full", note: "Role in event" },
      },
    ],
    processes_materials: [
      {
        field: "processes_id",
        type: "uuid",
        meta: { interface: "select-dropdown-m2o", hidden: true },
      },
      {
        field: "materials_id",
        type: "uuid",
        meta: { interface: "select-dropdown-m2o", hidden: true },
      },
      {
        field: "quantity",
        type: "string",
        meta: { interface: "input", width: "half" },
      },
      {
        field: "notes",
        type: "text",
        meta: { interface: "input", width: "full" },
      },
    ],
    processes_tools: [
      {
        field: "processes_id",
        type: "uuid",
        meta: { interface: "select-dropdown-m2o", hidden: true },
      },
      {
        field: "tools_id",
        type: "uuid",
        meta: { interface: "select-dropdown-m2o", hidden: true },
      },
      {
        field: "settings",
        type: "json",
        meta: {
          interface: "list",
          width: "full",
          note: "Tool settings for this process",
        },
      },
    ],
    projects_processes: [
      {
        field: "projects_id",
        type: "uuid",
        meta: { interface: "select-dropdown-m2o", hidden: true },
      },
      {
        field: "processes_id",
        type: "uuid",
        meta: { interface: "select-dropdown-m2o", hidden: true },
      },
      {
        field: "order",
        type: "integer",
        meta: {
          interface: "input",
          width: "half",
          note: "Order in project workflow",
        },
      },
    ],
  };

  // Add junction table fields
  for (const [collection, fields] of Object.entries(junction_fields)) {
    console.log(`  Creating junction fields for ${collection}...`);
    for (const field of fields) {
      try {
        await client.request(createField(collection, field));
        console.log(`    ✓ Created junction field: ${field.field}`);
      } catch (error) {
        if (error.message?.includes("already exists")) {
          console.log(`    ⚠ Junction field already exists: ${field.field}`);
        } else {
          console.error(
            `    ❌ Error creating junction field ${field.field}:`,
            error.message
          );
        }
      }
    }
  }

  // Add relationship fields to main collections
  const relationship_fields = [
    // Add author field to processes (references people)
    {
      collection: "processes",
      field: "author",
      type: "uuid",
      meta: { interface: "select-dropdown-m2o", width: "half" },
    },
    // Add event field to projects (references events)
    {
      collection: "projects",
      field: "event",
      type: "uuid",
      meta: { interface: "select-dropdown-m2o", width: "half" },
    },
    // Add process field to samples (references processes)
    {
      collection: "samples",
      field: "process",
      type: "uuid",
      meta: { interface: "select-dropdown-m2o", width: "half" },
    },
  ];

  for (const field of relationship_fields) {
    try {
      await client.request(createField(field.collection, field));
      console.log(
        `  ✓ Created relationship field: ${field.collection}.${field.field}`
      );
    } catch (error) {
      if (error.message?.includes("already exists")) {
        console.log(
          `  ⚠ Relationship field already exists: ${field.collection}.${field.field}`
        );
      } else {
        console.error(
          `  ❌ Error creating relationship field ${field.collection}.${field.field}:`,
          error.message
        );
      }
    }
  }

  console.log(
    "✅ Schema setup complete! You can now access Directus admin panel to see your collections."
  );
}

// Run the setup
setup_schema().catch(console.error);
