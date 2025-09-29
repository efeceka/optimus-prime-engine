export default {
  name: 'product',
  title: 'Ürün',
  type: 'document',

  fieldsets: [
    { name: 'titleFs',  title: 'Başlık',      options: { columns: 2 } },
    { name: 'descFs',   title: 'Açıklama',    options: { columns: 2 } },
  ],

  fields: [
    {
      name: 'title',
      title: 'Başlık',
      type: 'object',
      fieldset: 'titleFs',
      fields: [
        { name: 'tr', type: 'string', title: 'TR', validation: R => R.required() },
        { name: 'en', type: 'string', title: 'EN' },
      ],
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.tr', maxLength: 96 },
      validation: R => R.required(),
    },

    {
      name: 'sortOrder',
      title: 'Manuel Sıra',
      type: 'number',
    },

    {
      name: 'image',
      title: 'Kapak Görseli',
      type: 'image',
      options: { hotspot: true },
    },

    // ✅ YENİ: Çoklu görseller
    {
      name: 'images',
      title: 'Görseller (çoklu)',
      type: 'array',
      options: { layout: 'grid' },
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt Metin', type: 'string' }
          ]
        }
      ]
    },

    
    {
  name: 'datasheets',
  title: 'Dökümanlar (PDF)',
  type: 'array',
  of: [{
    type: 'object',
    fields: [
      { name: 'title', title: 'Başlık', type: 'object', fields: [
        { name: 'tr', type: 'string', title: 'TR' },
        { name: 'en', type: 'string', title: 'EN' },
      ]},
      { 
        name: 'file', 
        title: 'PDF', 
        type: 'file',
        options: { accept: 'application/pdf' }
      }
    ],
    preview: {
      select: { t: 'title.tr', url: 'file.asset->url' },
      prepare: ({t, url}) => ({ title: t || 'PDF', subtitle: url ? 'Yüklü' : '—' })
    }
  }]
},
    {
      name: 'description',
      title: 'Açıklama',
      type: 'object',
      fieldset: 'descFs',
      fields: [
        { name: 'tr', type: 'text', title: 'TR' },
        { name: 'en', type: 'text', title: 'EN' },
      ],
    },

    // — Ürün Özellikleri —
    {
      name: 'specs',
      title: 'Özellikler',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'groupKey',
            title: 'Grup',
            type: 'string',
            options: {
              list: [
                {title: 'Motor Güç Değerleri', value: 'engine_ratings'},
                {title: 'Motor Verileri', value: 'engine_data'},
                {title: 'Temel Teknik Veriler', value: 'basic_tech_data'},
                {title: 'Jeneratör için Motor Güç Değerleri (1500–1800 rpm)', value: 'engine_ratings_generator'},
                {title: 'Boyut/Ağırlık', value: 'dimensions'},
                {title: 'Test', value: 'test_conditions'},
                {title: 'Soğutma', value: 'cooling_system'},
                {title: 'Yağlama', value: 'lubrication_system'},
                {title: 'Emme & Egzoz', value: 'intake_exhaust'},
                {title: 'Yakıt Sistemi', value: 'fuel_system'},
                {title: 'Elektrik', value: 'electrical_system'},
                {title: 'Emisyon', value: 'emission'},
                { title: "Enerji Dengesi", value: "energy_balance" },
                {title: 'Ses Seviyesi', value: 'sound_level'},
              ]
            },
            validation: R => R.required(),
          },
          {
            name: 'spec',
            title: 'Özellik',
            type: 'reference',
            to: [{type: 'specDefinition'}],
            options: {
              disableNew: true,
              filter: ({parent}) => {
                const g = parent?.groupKey
                return g ? { filter: 'group == $g', params: { g } } : { filter: '' }
              }
            },
            validation: R => R.required(),
          },
          {
            name: 'valueText',
            title: 'Değer',
            type: 'string',
            description: 'Örn: "24", "650", "CF-4", "1-3-4-2", "1500/1800"...',
          },
         
        ],
        preview: {
          select: {
            groupKey: 'groupKey',
            specTitle: 'spec.label.tr',
            val: 'valueText',
          },
          prepare({groupKey, specTitle, val, unit}) {
            const map = {
              engine_ratings: 'Güç',
              engine_data: 'Motor Verileri',
              basic_tech_data: 'Teknik',
              engine_ratings_generator: 'Jeneratör',
              intake_exhaust: 'Emme/Egzoz',
              cooling_system: 'Soğutma',
              fuel_system: 'Yakıt',
              lubrication_system: 'Yağlama',
              electrical_system: 'Elektrik',
              dimensions: 'Boyut',
              emission: 'Emisyon',
              test_conditions: 'Koşullar',
              sound_level: 'Ses',
            };
            const subtitle = map[groupKey] || '';
            const value = val ? `${val}${unit ? ' ' + unit : ''}` : '';
            return { title: specTitle || 'Özellik', subtitle: [subtitle, value].filter(Boolean).join(' • ') }
          }
        }
      }],
    },
  ],

  preview: {
    select: { title: 'title.tr', media: 'image', subtitle: 'slug.current' },
  },

  // ✅ Önizleme: images[0] varsa onu, yoksa eski image
  preview: {
    select: { 
      title: 'title.tr', 
      images0: 'images.0.asset', 
      media: 'image', 
      subtitle: 'slug.current' 
    },
    prepare({ title, images0, media, subtitle }) {
      // images.0.asset varsa onu media olarak kullan
      const m = images0 ? { _type: 'image', asset: images0 } : media;
      return { title, media: m, subtitle };
    }
  },

}