import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'sample',
  title: 'Sample',
  type: 'document',
  fields: [
    defineField({
      name: 'sample_id',
      title: 'Sample ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Unique identifier for the physical sample',
    }),
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
      name: 'linked_process',
      title: 'Linked Process',
      type: 'reference',
      to: [{type: 'process'}],
      validation: (Rule) => Rule.required(),
      description: 'The process that created this sample',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief description of what this sample represents',
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
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
              name: 'view_type',
              type: 'string',
              title: 'View Type',
              options: {
                list: [
                  {title: 'Main View', value: 'main'},
                  {title: 'Detail View', value: 'detail'},
                  {title: 'Cross Section', value: 'cross_section'},
                  {title: 'Microscopic', value: 'microscopic'},
                  {title: 'Other', value: 'other'},
                ],
              },
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(1).error('At least one photo is required'),
    }),
    defineField({
      name: 'physical_properties',
      title: 'Physical Properties',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'property', type: 'string', title: 'Property'},
            {name: 'value', type: 'string', title: 'Value'},
            {name: 'unit', type: 'string', title: 'Unit (optional)'},
            {name: 'measurement_method', type: 'string', title: 'Measurement Method'},
          ],
        },
      ],
    }),
    defineField({
      name: 'materials_used',
      title: 'Materials Used',
      type: 'array',
      of: [{type: 'reference', to: {type: 'material'}}],
    }),
    defineField({
      name: 'creation_date',
      title: 'Creation Date',
      type: 'date',
    }),
    defineField({
      name: 'created_by',
      title: 'Created By',
      type: 'array',
      of: [{type: 'reference', to: {type: 'person'}}],
    }),
    defineField({
      name: 'storage_location',
      title: 'Storage Location',
      type: 'string',
      description: 'Where this sample is stored in the lab',
    }),
    defineField({
      name: 'storage_conditions',
      title: 'Storage Conditions',
      type: 'text',
      rows: 2,
      description: 'Special storage requirements (temperature, humidity, etc.)',
    }),
    defineField({
      name: 'qr_code_id',
      title: 'QR Code ID',
      type: 'string',
      description: 'QR code identifier linking physical sample to digital record',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Available', value: 'available'},
          {title: 'In Use', value: 'in_use'},
          {title: 'Damaged', value: 'damaged'},
          {title: 'Lost', value: 'lost'},
          {title: 'Consumed', value: 'consumed'},
          {title: 'Archived', value: 'archived'},
        ],
      },
      initialValue: 'available',
    }),
    defineField({
      name: 'notes',
      title: 'Additional Notes',
      type: 'text',
      rows: 3,
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
      subtitle: 'sample_id',
      media: 'photos.0',
    },
    prepare({title, subtitle}) {
      return {
        title,
        subtitle: subtitle ? `ID: ${subtitle}` : 'No ID assigned',
      }
    },
  },
})
