import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Catálogo Digital')
    .items([
      S.documentTypeListItem('perfume').title('Perfumes'),
      S.divider(),
      // List any other document types if added in the future
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'perfume'
      ),
    ])
