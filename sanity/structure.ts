import {StructureBuilder} from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Haystack Labs Content')
    .items([
      // Main content sections
      S.listItem()
        .title('Processes')
        .child(S.documentTypeList('process').title('Processes').filter('_type == "process"')),

      S.listItem()
        .title('Projects')
        .child(S.documentTypeList('project').title('Projects').filter('_type == "project"')),

      S.listItem()
        .title('People')
        .child(S.documentTypeList('person').title('People').filter('_type == "person"')),

      S.divider(),

      // Resources section
      S.listItem()
        .title('Lab Resources')
        .child(
          S.list()
            .title('Lab Resources')
            .items([
              S.listItem()
                .title('Materials')
                .child(
                  S.documentTypeList('material').title('Materials').filter('_type == "material"'),
                ),

              S.listItem()
                .title('Tools & Equipment')
                .child(
                  S.documentTypeList('tool').title('Tools & Equipment').filter('_type == "tool"'),
                ),

              S.listItem()
                .title('Samples')
                .child(S.documentTypeList('sample').title('Samples').filter('_type == "sample"')),
            ]),
        ),

      S.divider(),

      // Organization section
      S.listItem()
        .title('Organization')
        .child(
          S.list()
            .title('Organization')
            .items([
              S.listItem()
                .title('Events & Programs')
                .child(
                  S.documentTypeList('event').title('Events & Programs').filter('_type == "event"'),
                ),

              S.listItem()
                .title('Tags')
                .child(S.documentTypeList('tag').title('Tags').filter('_type == "tag"')),
            ]),
        ),

      S.divider(),

      // All content fallback
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['process', 'project', 'person', 'material', 'tool', 'sample', 'event', 'tag'].includes(
            listItem.getId() || '',
          ),
      ),
    ])
