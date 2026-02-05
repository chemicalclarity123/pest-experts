export const serviceArea = {
    name: 'serviceArea',
    title: 'Service Area',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Area Name',
            type: 'string',
            description: 'e.g., "Pretoria", "Centurion"',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'image',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'description',
            title: 'Short Description',
            type: 'text',
            rows: 3,
            description: 'Brief overview for cards and previews',
        },
        {
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [{ type: 'block' }],
        },
        {
            name: 'seo',
            title: 'SEO',
            type: 'object',
            fields: [
                {
                    name: 'metaTitle',
                    title: 'Meta Title',
                    type: 'string',
                },
                {
                    name: 'metaDesc',
                    title: 'Meta Description',
                    type: 'text',
                },
            ],
        },
    ],
};
