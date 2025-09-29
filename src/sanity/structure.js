export const structure = (S) =>
  S.list()
    .title('İçerik')
    .items([
      S.documentTypeListItem('product').title('Ürünler'),
      S.documentTypeListItem('specDefinition').title('Özellik Tanımları'),
      // varsayılan diğer tüm tipler:
      ...S.documentTypeListItems().filter(
        (li) => !['product','specDefinition'].includes(li.getId())
      ),
    ])