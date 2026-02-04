// studio/schemaTypes/service.ts
export const service = {
    name: 'service',
    title: 'Service',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Service Name',
            type: 'string',
            description: 'e.g., "Termite Control", "Rodent Removal"',
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
            title: 'Service Image',
            type: 'image',
            description: 'Main service image for cards and previews',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    title: 'Alt Text',
                    type: 'string',
                    description: 'Describe the image for accessibility',
                },
            ],
        },
        {
            name: 'price',
            title: 'Starting Price (ZAR)',
            type: 'number',
            description: 'Simple starting price for display (e.g., 500)',
        },
        {
            name: 'features',
            title: 'Key Features',
            type: 'array',
            description: 'Bullet-point features for service cards',
            of: [{ type: 'string' }],
        },
        {
            name: 'featured',
            title: 'Featured Service',
            type: 'boolean',
            description: 'Display prominently on homepage',
            initialValue: false,
        },
        {
            name: 'seo',
            title: 'SEO & Social',
            type: 'object',
            description: 'Critical for SERP performance',
            fields: [
                {
                    name: 'metaTitle',
                    title: 'Meta Title',
                    type: 'string',
                    description: 'Max 60 characters for optimal display',
                    validation: (Rule: any) =>
                        Rule.max(60).warning('Keep under 60 characters for best results'),
                },
                {
                    name: 'metaDesc',
                    title: 'Meta Description',
                    type: 'text',
                    description: 'Max 160 characters',
                    validation: (Rule: any) =>
                        Rule.max(160).warning('Keep under 160 characters for best results'),
                },
                {
                    name: 'shareImage',
                    title: 'Social Share Image',
                    type: 'image',
                    description: 'Optimal size: 1200x630px',
                    options: {
                        hotspot: true,
                    },
                },
            ],
        },
        {
            name: 'description',
            title: 'Short Description',
            type: 'text',
            description: 'Brief service overview (used in cards and previews)',
            rows: 3,
        },
        {
            name: 'content',
            title: 'Full Content',
            type: 'array',
            description: 'Detailed service information',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                    lists: [
                        { title: 'Bullet', value: 'bullet' },
                        { title: 'Numbered', value: 'number' },
                    ],
                },
            ],
        },
        {
            name: 'localContext',
            title: 'Local SEO Data',
            type: 'object',
            description: 'Powers Local Pack dominance in Gauteng',
            fields: [
                {
                    name: 'serviceType',
                    title: 'Service Type',
                    type: 'string',
                    description: 'Schema.org service type (e.g., "Pest Control Service")',
                },
                {
                    name: 'pests',
                    title: 'Pests Handled (knowsAbout)',
                    type: 'array',
                    description: 'Specific pest expertise for schema markup',
                    of: [{ type: 'string' }],
                    options: {
                        layout: 'tags',
                    },
                },
                {
                    name: 'areas',
                    title: 'Gauteng Areas Served',
                    type: 'array',
                    description: 'Specific Gauteng cities/suburbs - critical for local ranking',
                    of: [{ type: 'string' }],
                    options: {
                        layout: 'tags',
                    },
                },
                {
                    name: 'faqs',
                    title: 'FAQs',
                    type: 'array',
                    description: 'Powers FAQ Schema for SERP real estate',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                {
                                    name: 'question',
                                    title: 'Question',
                                    type: 'string',
                                    validation: (Rule: any) => Rule.required(),
                                },
                                {
                                    name: 'answer',
                                    title: 'Answer',
                                    type: 'text',
                                    rows: 3,
                                    validation: (Rule: any) => Rule.required(),
                                },
                            ],
                            preview: {
                                select: {
                                    title: 'question',
                                    subtitle: 'answer',
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            name: 'pricing',
            title: 'Pricing Information',
            type: 'object',
            description: 'Pricing details for lead generation',
            fields: [
                {
                    name: 'priceRange',
                    title: 'Price Range',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'R (Budget)', value: 'R' },
                            { title: 'RR (Moderate)', value: 'RR' },
                            { title: 'RRR (Premium)', value: 'RRR' },
                            { title: 'RRRR (Luxury)', value: 'RRRR' },
                        ],
                    },
                },
                {
                    name: 'startingPrice',
                    title: 'Starting Price (ZAR)',
                    type: 'number',
                    description: 'Minimum service cost in South African Rands',
                },
                {
                    name: 'currency',
                    title: 'Currency',
                    type: 'string',
                    initialValue: 'ZAR',
                    description: 'Currency code',
                    options: {
                        list: [
                            { title: 'South African Rand (ZAR)', value: 'ZAR' },
                            { title: 'US Dollar (USD)', value: 'USD' },
                        ],
                    },
                },
            ],
        },
        {
            name: 'leadGen',
            title: 'Lead Generation',
            type: 'object',
            description: 'Lead generation specific fields',
            fields: [
                {
                    name: 'responseTime',
                    title: 'Typical Response Time',
                    type: 'string',
                    description: 'How quickly you respond to inquiries',
                    options: {
                        list: [
                            { title: 'Within 1 hour', value: 'PT1H' },
                            { title: 'Within 2 hours', value: 'PT2H' },
                            { title: 'Within 4 hours', value: 'PT4H' },
                            { title: 'Same day', value: 'P1D' },
                            { title: 'Within 24 hours', value: 'PT24H' },
                        ],
                    },
                },
                {
                    name: 'freeQuote',
                    title: 'Free Quote Available',
                    type: 'boolean',
                    description: 'Do you offer free quotes/inspections?',
                    initialValue: true,
                },
                {
                    name: 'guaranteeOffered',
                    title: 'Guarantee/Warranty',
                    type: 'string',
                    description: 'e.g., "6-month guarantee", "Money-back guarantee"',
                },
            ],
        },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'description',
            media: 'seo.shareImage',
            areas: 'localContext.areas',
        },
        prepare({ title, subtitle, media, areas }: any) {
            const areaCount = areas?.length || 0;
            return {
                title,
                subtitle: areaCount > 0 ? `${areaCount} Gauteng areas` : subtitle,
                media,
            };
        },
    },
};
