import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'material',
  title: 'Material',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'properties',
      title: 'Properties',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'property', type: 'string', title: 'Property'},
            {name: 'value', type: 'string', title: 'Value'},
            {name: 'unit', type: 'string', title: 'Unit (optional)'},
          ],
        },
      ],
    }),
    defineField({
      name: 'sourcing_notes',
      title: 'Sourcing Notes',
      type: 'text',
      rows: 3,
      description: 'Where to get this material, suppliers, etc.',
    }),
    defineField({
      name: 'compatible_tools',
      title: 'Compatible Tools',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tool'}}],
    }),
    defineField({
      name: 'safety_notes',
      title: 'Safety Notes',
      type: 'text',
      rows: 3,
      description: 'Important safety considerations when working with this material',
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
    defineField({
      name: 'msds_link',
      title: 'MSDS/Safety Data Sheet Link',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'images.0',
    },
  },
})
