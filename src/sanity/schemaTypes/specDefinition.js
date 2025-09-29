const specDefinition = {
  name: 'specDefinition',
  title: 'Özellik Tanımı',
  type: 'document',
  fields: [
    {
      name: 'key',
      title: 'Key',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'label',
      title: 'Etiket',
      type: 'object',
      fields: [
        { name: 'tr', title: 'Türkçe', type: 'string' },
        { name: 'en', title: 'English', type: 'string' }
      ]
    },
    {
      name: 'shortLabel',
      title: 'Kısa Etiket',
      type: 'object',
      fields: [
        { name: 'tr', title: 'Türkçe', type: 'string' },
        { name: 'en', title: 'English', type: 'string' }
      ]
    },
    {
      name: 'unit',
      title: 'Birim',
      type: 'object',
      fields: [
        { name: 'tr', title: 'Türkçe', type: 'string' },
        { name: 'en', title: 'English', type: 'string' }
      ]
    },
    { name: 'type', title: 'Tip', type: 'string' },
    { name: 'enumOptions', title: 'Seçenekler', type: 'array', of: [{ type: 'string' }] },
    { name: 'group', title: 'Grup', type: 'string' },
    { name: 'order', title: 'Sıra', type: 'number' },
    { name: 'showInCard', title: 'Kartta Göster', type: 'boolean' },
    { name: 'filterable', title: 'Filtrelenebilir', type: 'boolean' }
  ],
  preview: {
    select: {
      title: 'label.tr',
      group: 'group',
      unitTr: 'unit.tr'
    },
    prepare({ title, group, unitTr }) {
      const groupTrMap = {
        engine_ratings: 'Motor Güç Değerleri',
        engine_data: 'Motor Verileri',
        basic_tech_data: 'Temel Teknik Veriler',
        intake_exhaust: 'Emme & Egzoz',
        cooling_system: 'Soğutma',
        fuel_system: 'Yakıt Sistemi',
        lubrication_system: 'Yağlama',
        electrical_system: 'Elektrik',
        dimensions: 'Boyut/Ağırlık',
        emission: 'Emisyon',
        test_conditions: 'Test/Standart/Referans',
        sound_level: 'Ses Seviyesi',
      };
      const subtitle = groupTrMap[group] || group || '';
      const unitBadge = unitTr ? ` (${unitTr})` : '';
      return { title: `${title || '—'}${unitBadge}`, subtitle };
    }
  },
  orderings: [
    { title: 'Başlık (TR) A→Z', name: 'titleTrAsc', by: [{ field: 'label.tr', direction: 'asc' }] }
  ]
}

export default specDefinition