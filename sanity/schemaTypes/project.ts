import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
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
      name: 'story',
      title: 'Project Story',
      type: 'array',
      of: [
        {type: 'block'},
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
      description: 'Rich text story of the project development',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Planning', value: 'planning'},
          {title: 'In Progress', value: 'in_progress'},
          {title: 'Completed', value: 'completed'},
          {title: 'On Hold', value: 'on_hold'},
          {title: 'Cancelled', value: 'cancelled'},
        ],
        layout: 'radio',
      },
      initialValue: 'planning',
    }),
    defineField({
      name: 'contributors',
      title: 'Contributors',
      type: 'array',
      of: [{type: 'reference', to: {type: 'person'}}],
      validation: (Rule) => Rule.min(1).error('At least one contributor is required'),
    }),
    defineField({
      name: 'event',
      title: 'Associated Event',
      type: 'reference',
      to: [{type: 'event'}],
      description: 'The event/program where this project was created',
    }),
    defineField({
      name: 'linked_processes',
      title: 'Related Processes',
      type: 'array',
      of: [{type: 'reference', to: {type: 'process'}}],
      description: 'Processes developed or used in this project',
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline/Updates',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'date',
              type: 'date',
              title: 'Date',
            },
            {
              name: 'title',
              type: 'string',
              title: 'Update Title',
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
              title: 'Images',
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
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'date',
              media: 'images.0',
            },
            prepare({title, subtitle}) {
              return {
                title: title || 'Untitled Update',
                subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : 'No date',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'outcomes',
      title: 'Outcomes & Results',
      type: 'text',
      rows: 4,
      description: 'What was achieved, learned, or produced',
    }),
    defineField({
      name: 'final_gallery',
      title: 'Final Gallery',
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
            {
              name: 'is_hero',
              type: 'boolean',
              title: 'Use as Hero Image',
              description: 'Mark this as the main project image',
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
      name: 'external_links',
      title: 'External Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'url', type: 'url', title: 'URL'},
            {name: 'description', type: 'text', title: 'Description'},
          ],
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tag'}}],
    }),
    defineField({
      name: 'start_date',
      title: 'Start Date',
      type: 'date',
    }),
    defineField({
      name: 'end_date',
      title: 'End Date',
      type: 'date',
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
      subtitle: 'status',
      media: 'final_gallery.0',
    },
    prepare({title, subtitle, media}) {
      // Find hero image if available
      const heroImage = media?.find?.((img: any) => img.is_hero) || media?.[0] || media
      return {
        title,
        subtitle: subtitle || 'No status set',
        media: heroImage,
      }
    },
  },
})
