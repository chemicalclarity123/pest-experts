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
            validation: (Rule: any) => Rule.required().custom((value: string) => {
                if (!value) return true;
                if (value.includes('\u00A0')) {
                    return 'Title contains non-breaking spaces. Please use regular spaces.';
                }
                if (value !== value.trim()) {
                    return 'Title contains leading or trailing whitespace.';
                }
                return true;
            }),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
                slugify: (input: string) => input
                    .toLowerCase()
                    .replace(/\u00A0/g, ' ')
                    .trim()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w-]+/g, '')
                    .replace(/--+/g, '-')
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
            name: 'isHub',
            title: 'Is Hub Area?',
            type: 'boolean',
            description: 'Check this if this is a major city (Hub) that links to smaller suburbs (Spokes)',
            initialValue: false,
        },
        {
            name: 'nearbyAreas',
            title: 'Nearby Areas (Spoke/Hub Links)',
            type: 'array',
            description: 'Link to other areas. Hubs should link to their Spokes, and Spokes should link back to their Hub.',
            of: [{ type: 'reference', to: [{ type: 'serviceArea' }] }],
        },
        {
            name: 'selectedReviews',
            title: 'Selected Google Reviews',
            type: 'array',
            description: 'Manually select reviews to display for this area. If empty, will fallback to recent 5-star reviews.',
            of: [{ type: 'reference', to: [{ type: 'googleReview' }] }],
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
