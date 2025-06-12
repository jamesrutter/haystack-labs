#!/usr/bin/env node

/**
 * Haystack Labs Directus Schema Setup
 *
 * This script programmatically creates all the collections, fields, and relationships
 * needed for the Haystack Labs content management system.
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
  url: "http://localhost:8055",
  email: process.env.ADMIN_EMAIL || "admin@example.com",
  password: process.env.ADMIN_PASSWORD || "password",
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
        translations: null,
        archive_field: null,
        archive_app_filter: true,
        archive_value: null,
        unarchive_value: null,
        sort_field: "sort",
        accountability: "all",
        color: "#6644FF",
        item_duplication_fields: null,
        sort: 1,
        group: null,
        collapse: "open",
      },
      schema: {
        name: "people",
      },
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
        translations: null,
        archive_field: null,
        archive_app_filter: true,
        archive_value: null,
        unarchive_value: null,
        sort_field: "sort",
        accountability: "all",
        color: "#00C897",
        item_duplication_fields: null,
        sort: 2,
        group: null,
        collapse: "open",
      },
      schema: {
        name: "processes",
      },
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
        translations: null,
        archive_field: null,
        archive_app_filter: true,
        archive_value: null,
        unarchive_value: null,
        sort_field: "sort",
        accountability: "all",
        color: "#FF6B35",
        item_duplication_fields: null,
        sort: 3,
        group: null,
        collapse: "open",
      },
      schema: {
        name: "projects",
      },
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
        translations: null,
        archive_field: null,
        archive_app_filter: true,
        archive_value: null,
        unarchive_value: null,
        sort_field: "sort",
        accountability: "all",
        color: "#A855F7",
        item_duplication_fields: null,
        sort: 4,
        group: null,
        collapse: "open",
      },
      schema: {
        name: "materials",
      },
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
        translations: null,
        archive_field: null,
        archive_app_filter: true,
        archive_value: null,
        unarchive_value: null,
        sort_field: "sort",
        accountability: "all",
        color: "#F59E0B",
        item_duplication_fields: null,
        sort: 5,
        group: null,
        collapse: "open",
      },
      schema: {
        name: "tools",
      },
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
        translations: null,
        archive_field: null,
        archive_app_filter: true,
        archive_value: null,
        unarchive_value: null,
        sort_field: "sort",
        accountability: "all",
        color: "#EF4444",
        item_duplication_fields: null,
        sort: 6,
        group: null,
        collapse: "open",
      },
      schema: {
        name: "events",
      },
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
        translations: null,
        archive_field: null,
        archive_app_filter: true,
        archive_value: null,
        unarchive_value: null,
        sort_field: "sort",
        accountability: "all",
        color: "#8B5CF6",
        item_duplication_fields: null,
        sort: 7,
        group: null,
        collapse: "open",
      },
      schema: {
        name: "tags",
      },
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
        translations: null,
        archive_field: null,
        archive_app_filter: true,
        archive_value: null,
        unarchive_value: null,
        sort_field: "sort",
        accountability: "all",
        color: "#10B981",
        item_duplication_fields: null,
        sort: 8,
        group: null,
        collapse: "open",
      },
      schema: {
        name: "samples",
      },
    },
    // Junction tables for many-to-many relationships
    {
      collection: "people_projects",
      meta: {
        collection: "people_projects",
        icon: "link",
        note: "People to Projects relationship",
        hidden: true,
        singleton: false,
      },
      schema: {
        name: "people_projects",
      },
    },
    {
      collection: "people_events",
      meta: {
        collection: "people_events",
        icon: "link",
        note: "People to Events relationship",
        hidden: true,
        singleton: false,
      },
      schema: {
        name: "people_events",
      },
    },
    {
      collection: "processes_materials",
      meta: {
        collection: "processes_materials",
        icon: "link",
        note: "Processes to Materials relationship",
        hidden: true,
        singleton: false,
      },
      schema: {
        name: "processes_materials",
      },
    },
    {
      collection: "processes_tools",
      meta: {
        collection: "processes_tools",
        icon: "link",
        note: "Processes to Tools relationship",
        hidden: true,
        singleton: false,
      },
      schema: {
        name: "processes_tools",
      },
    },
    {
      collection: "projects_processes",
      meta: {
        collection: "projects_processes",
        icon: "link",
        note: "Projects to Processes relationship",
        hidden: true,
        singleton: false,
      },
      schema: {
        name: "projects_processes",
      },
    },
  ];

  for (const collection of collections) {
    try {
      await client.request(createCollection(collection));
      console.log(`  ✓ Created collection: ${collection.collection}`);
    } catch (error) {
      if (error.message.includes("already exists")) {
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
      field: "media_gallery",
      type: "alias",
      meta: { interface: "files", width: "full" },
    },
    {
      field: "downloads",
      type: "alias",
      meta: { interface: "files", width: "full" },
    },
    {
      field: "author",
      type: "uuid",
      meta: { interface: "select-dropdown-m2o", width: "half" },
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
      field: "gallery",
      type: "alias",
      meta: { interface: "files", width: "full" },
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
      field: "event",
      type: "uuid",
      meta: { interface: "select-dropdown-m2o", width: "half" },
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
      field: "gallery",
      type: "alias",
      meta: { interface: "files", width: "full" },
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
      field: "process",
      type: "uuid",
      meta: { interface: "select-dropdown-m2o", width: "half" },
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

  // Junction table fields
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

  const all_fields = {
    people: people_fields,
    processes: processes_fields,
    projects: projects_fields,
    materials: materials_fields,
    tools: tools_fields,
    events: events_fields,
    tags: tags_fields,
    samples: samples_fields,
    ...junction_fields,
  };

  for (const [collection, fields] of Object.entries(all_fields)) {
    console.log(`  Creating fields for ${collection}...`);
    for (const field of fields) {
      try {
        await client.request(createField(collection, field));
        console.log(`    ✓ Created field: ${field.field}`);
      } catch (error) {
        if (error.message.includes("already exists")) {
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
  const relationships = [
    // People -> Processes (one-to-many: author)
    {
      collection: "processes",
      field: "author",
      related_collection: "people",
      meta: {
        many_collection: "processes",
        many_field: "author",
        one_collection: "people",
        one_field: "authored_processes",
        one_collection_field: null,
        one_allowed_collections: null,
        junction_field: null,
        sort_field: null,
        one_deselect_action: "nullify",
      },
      schema: {
        table: "processes",
        column: "author",
        foreign_key_table: "people",
        foreign_key_column: "id",
        constraint_name: "processes_author_foreign",
        on_update: "NO ACTION",
        on_delete: "SET NULL",
      },
    },

    // Projects -> Events (many-to-one)
    {
      collection: "projects",
      field: "event",
      related_collection: "events",
      meta: {
        many_collection: "projects",
        many_field: "event",
        one_collection: "events",
        one_field: "projects",
        one_collection_field: null,
        one_allowed_collections: null,
        junction_field: null,
        sort_field: null,
        one_deselect_action: "nullify",
      },
      schema: {
        table: "projects",
        column: "event",
        foreign_key_table: "events",
        foreign_key_column: "id",
        constraint_name: "projects_event_foreign",
        on_update: "NO ACTION",
        on_delete: "SET NULL",
      },
    },

    // Samples -> Processes (many-to-one)
    {
      collection: "samples",
      field: "process",
      related_collection: "processes",
      meta: {
        many_collection: "samples",
        many_field: "process",
        one_collection: "processes",
        one_field: "samples",
        one_collection_field: null,
        one_allowed_collections: null,
        junction_field: null,
        sort_field: null,
        one_deselect_action: "nullify",
      },
      schema: {
        table: "samples",
        column: "process",
        foreign_key_table: "processes",
        foreign_key_column: "id",
        constraint_name: "samples_process_foreign",
        on_update: "NO ACTION",
        on_delete: "SET NULL",
      },
    },

    // Many-to-many relationships via junction tables

    // People <-> Projects
    {
      collection: "people",
      field: "projects",
      related_collection: "projects",
      meta: {
        many_collection: "people",
        many_field: "projects",
        one_collection: "projects",
        one_field: "contributors",
        one_collection_field: null,
        one_allowed_collections: null,
        junction_field: "people_id",
        sort_field: null,
        one_deselect_action: "nullify",
      },
      schema: {
        table: "people_projects",
        column: "people_id",
        foreign_key_table: "people",
        foreign_key_column: "id",
        constraint_name: "people_projects_people_id_foreign",
        on_update: "NO ACTION",
        on_delete: "CASCADE",
      },
    },
    {
      collection: "projects",
      field: "contributors",
      related_collection: "people",
      meta: {
        many_collection: "projects",
        many_field: "contributors",
        one_collection: "people",
        one_field: "projects",
        one_collection_field: null,
        one_allowed_collections: null,
        junction_field: "projects_id",
        sort_field: null,
        one_deselect_action: "nullify",
      },
      schema: {
        table: "people_projects",
        column: "projects_id",
        foreign_key_table: "projects",
        foreign_key_column: "id",
        constraint_name: "people_projects_projects_id_foreign",
        on_update: "NO ACTION",
        on_delete: "CASCADE",
      },
    },

    // People <-> Events
    {
      collection: "people",
      field: "events",
      related_collection: "events",
      meta: {
        many_collection: "people",
        many_field: "events",
        one_collection: "events",
        one_field: "attendees",
        one_collection_field: null,
        one_allowed_collections: null,
        junction_field: "people_id",
        sort_field: null,
        one_deselect_action: "nullify",
      },
      schema: {
        table: "people_events",
        column: "people_id",
        foreign_key_table: "people",
        foreign_key_column: "id",
        constraint_name: "people_events_people_id_foreign",
        on_update: "NO ACTION",
        on_delete: "CASCADE",
      },
    },
    {
      collection: "events",
      field: "attendees",
      related_collection: "people",
      meta: {
        many_collection: "events",
        many_field: "attendees",
        one_collection: "people",
        one_field: "events",
        one_collection_field: null,
        one_allowed_collections: null,
        junction_field: "events_id",
        sort_field: null,
        one_deselect_action: "nullify",
      },
      schema: {
        table: "people_events",
        column: "events_id",
        foreign_key_table: "events",
        foreign_key_column: "id",
        constraint_name: "people_events_events_id_foreign",
        on_update: "NO ACTION",
        on_delete: "CASCADE",
      },
    },

    // Processes <-> Materials
    {
      collection: "processes",
      field: "materials",
      related_collection: "materials",
      meta: {
        many_collection: "processes",
        many_field: "materials",
        one_collection: "materials",
        one_field: "processes",
        one_collection_field: null,
        one_allowed_collections: null,
        junction_field: "processes_id",
        sort_field: null,
        one_deselect_action: "nullify",
      },
      schema: {
        table: "processes_materials",
        column: "processes_id",
        foreign_key_table: "processes",
        foreign_key_column: "id",
        constraint_name: "processes_materials_processes_id_foreign",
        on_update: "NO ACTION",
        on_delete: "CASCADE",
      },
    },
    {
      collection: "materials",
      field: "processes",
      related_collection: "processes",
      meta: {
        many_collection: "materials",
        many_field: "processes",
        one_collection: "processes",
        one_field: "materials",
        one_collection_field: null,
        one_allowed_collections: null,
        junction_field: "materials_id",
        sort_field: null,
        one_deselect_action: "nullify",
      },
      schema: {
        table: "processes_materials",
        column: "materials_id",
        foreign_key_table: "materials",
        foreign_key_column: "id",
        constraint_name: "processes_materials_materials_id_foreign",
        on_update: "NO ACTION",
        on_delete: "CASCADE",
      },
    },

    // Processes <-> Tools
    {
      collection: "processes",
      field: "tools",
      related_collection: "tools",
      meta: {
        many_collection: "processes",
        many_field: "tools",
        one_collection: "tools",
        one_field: "processes",
        one_collection_field: null,
        one_allowed_collections: null,
        junction_field: "processes_id",
        sort_field: null,
        one_deselect_action: "nullify",
      },
      schema: {
        table: "processes_tools",
        column: "processes_id",
        foreign_key_table: "processes",
        foreign_key_column: "id",
        constraint_name: "processes_tools_processes_id_foreign",
        on_update: "NO ACTION",
        on_delete: "CASCADE",
      },
    },
    {
      collection: "tools",
      field: "processes",
      related_collection: "processes",
      meta: {
        many_collection: "tools",
        many_field: "processes",
        one_collection: "processes",
        one_field: "tools",
        one_collection_field: null,
        one_allowed_collections: null,
        junction_field: "tools_id",
        sort_field: null,
        one_deselect_action: "nullify",
      },
      schema: {
        table: "processes_tools",
        column: "tools_id",
        foreign_key_table: "tools",
        foreign_key_column: "id",
        constraint_name: "processes_tools_tools_id_foreign",
        on_update: "NO ACTION",
        on_delete: "CASCADE",
      },
    },

    // Projects <-> Processes
    {
      collection: "projects",
      field: "processes",
      related_collection: "processes",
      meta: {
        many_collection: "projects",
        many_field: "processes",
        one_collection: "processes",
        one_field: "projects",
        one_collection_field: null,
        one_allowed_collections: null,
        junction_field: "projects_id",
        sort_field: "order",
        one_deselect_action: "nullify",
      },
      schema: {
        table: "projects_processes",
        column: "projects_id",
        foreign_key_table: "projects",
        foreign_key_column: "id",
        constraint_name: "projects_processes_projects_id_foreign",
        on_update: "NO ACTION",
        on_delete: "CASCADE",
      },
    },
    {
      collection: "processes",
      field: "projects",
      related_collection: "projects",
      meta: {
        many_collection: "processes",
        many_field: "projects",
        one_collection: "projects",
        one_field: "processes",
        one_collection_field: null,
        one_allowed_collections: null,
        junction_field: "processes_id",
        sort_field: null,
        one_deselect_action: "nullify",
      },
      schema: {
        table: "projects_processes",
        column: "processes_id",
        foreign_key_table: "processes",
        foreign_key_column: "id",
        constraint_name: "projects_processes_processes_id_foreign",
        on_update: "NO ACTION",
        on_delete: "CASCADE",
      },
    },
  ];

  for (const relation of relationships) {
    try {
      await client.request(createRelation(relation));
      console.log(
        `  ✓ Created relationship: ${relation.collection}.${relation.field} -> ${relation.related_collection}`
      );
    } catch (error) {
      if (error.message.includes("already exists")) {
        console.log(
          `  ⚠ Relationship already exists: ${relation.collection}.${relation.field}`
        );
      } else {
        console.error(
          `  ❌ Error creating relationship ${relation.collection}.${relation.field}:`,
          error.message
        );
      }
    }
  }
}

// Run the setup
setup_schema().catch(console.error);
