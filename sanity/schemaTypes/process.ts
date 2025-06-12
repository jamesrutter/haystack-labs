import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'process',
  title: 'Process',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Brief overview of what this process achieves',
    }),
    defineField({
      name: 'qr_code_id',
      title: 'QR Code ID',
      type: 'string',
      description: 'Unique identifier for QR code stickers in the lab',
    }),
    defineField({
      name: 'hero_image',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{type: 'reference', to: {type: 'person'}}],
      validation: (Rule) => Rule.min(1).error('At least one author is required'),
    }),
    defineField({
      name: 'materials_used',
      title: 'Materials Used',
      type: 'array',
      of: [{type: 'reference', to: {type: 'material'}}],
    }),
    defineField({
      name: 'tools_used',
      title: 'Tools Used',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tool'}}],
    }),
    defineField({
      name: 'difficulty_level',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'},
          {title: 'Expert', value: 'expert'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'estimated_time',
      title: 'Estimated Time',
      type: 'string',
      description: 'e.g., "2 hours", "30 minutes", "3 days"',
    }),
    defineField({
      name: 'warnings',
      title: 'Warnings & Safety Notes',
      type: 'text',
      rows: 3,
      description: 'Important safety considerations and warnings',
    }),
    defineField({
      name: 'steps',
      title: 'Step-by-Step Instructions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'step_number',
              type: 'number',
              title: 'Step Number',
            },
            {
              name: 'title',
              type: 'string',
              title: 'Step Title',
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
              rows: 3,
            },
            {
              name: 'images',
              type: 'array',
              title: 'Step Images',
              of: [
                {
                  type: 'image',
                  options: {hotspot: true},
                  fields: [
                    {
                      name: 'caption',
                      type: 'string',
                      title: 'Caption',
                    },
                  ],
                },
              ],
            },
            {
              name: 'notes',
              type: 'text',
              title: 'Additional Notes',
              rows: 2,
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'step_number',
              media: 'images.0',
            },
            prepare({title, subtitle}) {
              return {
                title: title || 'Untitled Step',
                subtitle: subtitle ? `Step ${subtitle}` : 'No step number',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'media_gallery',
      title: 'Additional Media',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
        {
          type: 'file',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Title',
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'downloads',
      title: 'Downloadable Files',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Title',
            },
            {
              name: 'file',
              type: 'file',
              title: 'File',
            },
            {
              name: 'file_type',
              type: 'string',
              title: 'File Type',
              options: {
                list: [
                  {title: 'CAD File', value: 'cad'},
                  {title: 'G-code', value: 'gcode'},
                  {title: 'PDF', value: 'pdf'},
                  {title: 'Code', value: 'code'},
                  {title: 'Image', value: 'image'},
                  {title: 'Other', value: 'other'},
                ],
              },
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'linked_projects',
      title: 'Related Projects',
      type: 'array',
      of: [{type: 'reference', to: {type: 'project'}}],
      description: 'Projects that use this process',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tag'}}],
    }),
    defineField({
      name: 'created_at',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'updated_at',
      title: 'Updated At',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'hero_image',
    },
  },
})
