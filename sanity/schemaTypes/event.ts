import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
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
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Haystack Labs Retreat', value: 'labs_retreat'},
          {title: 'Residency Program', value: 'residency'},
          {title: 'Workshop', value: 'workshop'},
          {title: 'Conference', value: 'conference'},
          {title: 'Year Program', value: 'year_program'},
          {title: 'Other', value: 'other'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
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
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'participants',
      title: 'Participants',
      type: 'array',
      of: [{type: 'reference', to: {type: 'person'}}],
    }),
    defineField({
      name: 'organizers',
      title: 'Organizers',
      type: 'array',
      of: [{type: 'reference', to: {type: 'person'}}],
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
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
            {
              name: 'photographer',
              type: 'string',
              title: 'Photographer',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'overview_content',
      title: 'Overview Content',
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
    }),
    defineField({
      name: 'website_link',
      title: 'Website Link',
      type: 'url',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tag'}}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
      media: 'gallery.0',
    },
    prepare({title, subtitle}) {
      return {
        title,
        subtitle: subtitle || 'No type specified',
      }
    },
  },
})
