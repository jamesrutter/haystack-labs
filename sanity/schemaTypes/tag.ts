import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'value',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Process Type', value: 'process_type'},
          {title: 'Material', value: 'material'},
          {title: 'Tool', value: 'tool'},
          {title: 'Skill', value: 'skill'},
          {title: 'Topic', value: 'topic'},
          {title: 'Technique', value: 'technique'},
          {title: 'Safety', value: 'safety'},
          {title: 'General', value: 'general'},
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Hex color code for visual organization',
      validation: (Rule) =>
        Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).error('Must be a valid hex color'),
    }),
  ],
  preview: {
    select: {
      title: 'value',
      subtitle: 'category',
    },
    prepare({title, subtitle}) {
      return {
        title,
        subtitle: subtitle ? `Category: ${subtitle}` : 'No category',
      }
    },
  },
})
