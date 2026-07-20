import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Catálogo Digital')
    .items([
      // ── PERFUMES ──────────────────────────────────────────────
      S.listItem()
        .title('Perfumes')
        .icon(() => '🌸')
        .child(
          S.list()
            .title('Perfumes')
            .items([
              S.listItem()
                .title('✅ Com Foto')
                .icon(() => '📷')
                .child(
                  S.documentTypeList('perfume')
                    .title('Perfumes com Foto')
                    .filter('_type == "perfume" && defined(image)')
                ),
              S.listItem()
                .title('❌ Sem Foto')
                .icon(() => '🚫')
                .child(
                  S.documentTypeList('perfume')
                    .title('Perfumes sem Foto')
                    .filter('_type == "perfume" && !defined(image)')
                ),
              S.divider(),
              S.listItem()
                .title('📋 Todos os Perfumes')
                .icon(() => '📋')
                .child(
                  S.documentTypeList('perfume')
                    .title('Todos os Perfumes')
                ),
            ])
        ),

      S.divider(),

      // List any other document types if added in the future
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'perfume'
      ),
    ])
