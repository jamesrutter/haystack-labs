import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pronouns',
      title: 'Pronouns',
      type: 'string',
      placeholder: 'they/them, she/her, he/him, etc.',
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
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'website_links',
      title: 'Website Links',
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
      name: 'skills',
      title: 'Skills/Tags',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tag'}}],
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          {title: 'Participant', value: 'participant'},
          {title: 'Resident', value: 'resident'},
          {title: 'Staff', value: 'staff'},
          {title: 'Alumni', value: 'alumni'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'events_attended',
      title: 'Events Attended',
      type: 'array',
      of: [{type: 'reference', to: {type: 'event'}}],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'avatar',
    },
  },
})
