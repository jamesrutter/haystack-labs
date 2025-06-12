import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tool',
  title: 'Tool',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'model',
      title: 'Model',
      type: 'string',
      description: 'Specific model number or version',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Machine', value: 'machine'},
          {title: 'Software', value: 'software'},
          {title: 'Hand Tool', value: 'hand_tool'},
          {title: 'Measuring Device', value: 'measuring_device'},
          {title: 'Safety Equipment', value: 'safety_equipment'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'setup_notes',
      title: 'Setup Notes',
      type: 'text',
      rows: 4,
      description: 'How to set up and configure this tool',
    }),
    defineField({
      name: 'safety_notes',
      title: 'Safety Notes',
      type: 'text',
      rows: 4,
      description: 'Important safety considerations and precautions',
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'spec', type: 'string', title: 'Specification'},
            {name: 'value', type: 'string', title: 'Value'},
            {name: 'unit', type: 'string', title: 'Unit (optional)'},
          ],
        },
      ],
    }),
    defineField({
      name: 'compatible_materials',
      title: 'Compatible Materials',
      type: 'array',
      of: [{type: 'reference', to: {type: 'material'}}],
    }),
    defineField({
      name: 'location',
      title: 'Location in Lab',
      type: 'string',
      description: 'Where to find this tool in the lab',
    }),
    defineField({
      name: 'maintenance_notes',
      title: 'Maintenance Notes',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'manual_links',
      title: 'Manual/Documentation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'url', type: 'url', title: 'URL'},
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
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
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
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'model',
      media: 'images.0',
    },
    prepare({title, subtitle}) {
      return {
        title,
        subtitle: subtitle || 'No model specified',
      }
    },
  },
})
