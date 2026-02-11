import { CsvTagInput } from '../components/CsvTagInput'

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
                    .replace(/\u00A0/g, ' ') // Replace NBSP with space
                    .trim()
                    .replace(/\s+/g, '-')    // Replace spaces with hyphens
                    .replace(/[^\w-]+/g, '') // Remove non-word characters
                    .replace(/--+/g, '-')    // Replace multiple hyphens with single hyphen
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
                    components: {
                        input: CsvTagInput
                    }
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
                    components: {
                        input: CsvTagInput
                    }
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
        {
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            options: { collapsible: true, collapsed: false },
            fields: [
                {
                    name: 'subheading',
                    title: 'Subheading',
                    type: 'string',
                    description: 'Appears below the main title (e.g., "Fast, Reliable, & Safe")',
                },
                {
                    name: 'ctaText',
                    title: 'CTA Button Text',
                    type: 'string',
                    initialValue: 'Get a Free Quote',
                },
            ],
        },
        {
            name: 'overviewHeading',
            title: 'Overview Section Heading',
            type: 'string',
            description: 'Heading for the overview section (e.g., "Why Choose Professional Pest Control?")',
        },
        {
            name: 'overview',
            title: 'Service Overview',
            type: 'array',
            of: [{ type: 'block' }],
            description: 'Introduction to the service (SEO rich text)',
        },
        {
            name: 'signsOfInfestation',
            title: 'Common Signs of Infestation',
            type: 'array',
            description: 'List of signs that potential customers should look out for',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
            },
            components: {
                input: CsvTagInput
            }
        },
        {
            name: 'treatmentProcess',
            title: 'Treatment Process',
            type: 'array',
            description: 'Step-by-step process of how you handle this service',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'stepTitle',
                            title: 'Step Title',
                            type: 'string',
                            validation: (Rule: any) => Rule.required(),
                        },
                        {
                            name: 'stepDescription',
                            title: 'Step Description',
                            type: 'text',
                            rows: 2,
                            validation: (Rule: any) => Rule.required(),
                        },
                    ],
                },
            ],
        },
        {
            name: 'benefits',
            title: 'Why Professional Treatment?',
            type: 'array',
            of: [{ type: 'block' }],
            description: 'Benefits of using professional service vs DIY',
        },
        {
            name: 'customTestimonials',
            title: 'Service-Specific Testimonials',
            type: 'object',
            description: 'Override global testimonials with service-specific ones',
            options: { collapsible: true, collapsed: true },
            fields: [
                {
                    name: 'title',
                    title: 'Section Title',
                    type: 'string',
                    initialValue: 'What Our Customers Say',
                },
                {
                    name: 'reviews',
                    title: 'Reviews',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                {
                                    name: 'customerName',
                                    title: 'Customer Name',
                                    type: 'string',
                                    validation: (Rule: any) => Rule.required(),
                                },
                                {
                                    name: 'rating',
                                    title: 'Rating',
                                    type: 'number',
                                    validation: (Rule: any) => Rule.required().min(1).max(5),
                                    initialValue: 5,
                                },
                                {
                                    name: 'reviewText',
                                    title: 'Review Text',
                                    type: 'text',
                                    rows: 4,
                                },
                                {
                                    name: 'location',
                                    title: 'Location',
                                    type: 'string',
                                },
                                {
                                    name: 'avatar',
                                    title: 'Avatar Image',
                                    type: 'image',
                                    options: { hotspot: true },
                                },
                            ],
                        },
                    ],
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
}
