export const serviceArea = {
    name: 'serviceArea',
    title: 'Service Area',
    type: 'document',
    fieldsets: [
        { name: 'hero', title: 'Hero Section', options: { collapsible: true } },
        { name: 'areaIntro', title: 'Intro Content (Under Hero)', options: { collapsible: true } },
        { name: 'localContent', title: 'Local Content (SEO)', options: { collapsible: true } },
        { name: 'cta', title: 'Call to Action', options: { collapsible: true } },
        { name: 'connections', title: 'Hub/Spoke & Reviews', options: { collapsible: true } },
        { name: 'seoFields', title: 'SEO', options: { collapsible: true } },
    ],
    fields: [
        // --- SEO Featured Snippet (Position Zero) ---
        {
            name: 'featuredSnippet',
            title: 'Featured Snippet (Position Zero)',
            type: 'object',
            fieldset: 'seoFields',
            description: 'Highly structured Q&A block designed to win Google Featured Snippets. Renders at the top of the page.',
            options: { collapsible: true, collapsed: false },
            fields: [
                {
                    name: 'snippetQuestion',
                    title: 'Snippet Question (H2)',
                    type: 'string',
                    description: 'The exact question users search for (e.g., "What is the best pest control in Pretoria?")',
                },
                {
                    name: 'snippetAnswer',
                    title: 'Snippet Answer (Paragraph)',
                    type: 'text',
                    rows: 3,
                    description: 'The direct answer. MUST be between 40-60 words for optimal Google pickup.',
                    validation: (Rule: any) => Rule.custom((text: string) => {
                        if (!text) return true;
                        const wordCount = text.trim().split(/\s+/).length;
                        if (wordCount < 30 || wordCount > 70) {
                            return 'For best SEO results, snippet answers should ideally be between 40-60 words.';
                        }
                        return true;
                    }).warning(),
                },
                {
                    name: 'snippetList',
                    title: 'Snippet List (Optional)',
                    type: 'array',
                    of: [{ type: 'string' }],
                    description: 'Optional bullet points to accompany the answer (Google loves lists).',
                },
            ],
        },

        // --- Campos básicos ---
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

        // --- Hero Section ---
        {
            name: 'image',
            title: 'Hero Image',
            type: 'image',
            fieldset: 'hero',
            options: { hotspot: true },
        },
        {
            name: 'description',
            title: 'Hero Subheading',
            type: 'text',
            fieldset: 'hero',
            rows: 3,
            description: 'Short CTA-style subheading displayed under the H1 in the hero section.',
        },
        {
            name: 'heroSubheading',
            title: 'Extended Hero Description',
            type: 'text',
            fieldset: 'hero',
            rows: 3,
            description: 'Optional longer description for the hero. If empty, falls back to "description" above.',
        },

        // --- Intro Content (Under Hero) ---
        {
            name: 'introHeadline',
            title: 'Intro Headline',
            type: 'string',
            fieldset: 'areaIntro',
            description: 'Optional headline just below the hero section. e.g., "Pest Control Services in Pretoria"',
        },
        {
            name: 'introShortDescription',
            title: 'Intro Short Description',
            type: 'text',
            fieldset: 'areaIntro',
            rows: 3,
            description: 'Optional short introductory paragraph below the headline.',
        },
        {
            name: 'introBodyText',
            title: 'Intro Body Text',
            type: 'array',
            fieldset: 'areaIntro',
            of: [{ type: 'block' }],
            description: 'Main body copy for the service area (~400 words recommended). Appears below the short description in two columns.',
        },

        // --- Local Content (SEO) ---
        {
            name: 'localPests',
            title: 'Common Pests in This Area',
            type: 'array',
            fieldset: 'localContent',
            description: 'Add pests common to this area. Appears as cards with local keyword relevance.',
            of: [{
                type: 'object',
                fields: [
                    {
                        name: 'name',
                        title: 'Pest Name',
                        type: 'string',
                        description: 'e.g., "German Cockroaches", "Subterranean Termites"',
                        validation: (Rule: any) => Rule.required(),
                    },
                    {
                        name: 'description',
                        title: 'Short Description',
                        type: 'text',
                        rows: 2,
                        description: 'Why this pest is common in this area (1-2 sentences).',
                    },
                    {
                        name: 'icon',
                        title: 'Icon Name (Font Awesome)',
                        type: 'string',
                        description: 'Font Awesome icon name, e.g. "bug", "spider", "locust". Leave empty for default.',
                    },
                ],
                preview: {
                    select: { title: 'name' },
                },
            }],
        },
        {
            name: 'whyLocal',
            title: 'Why This Area Needs Professional Pest Control',
            type: 'object',
            fieldset: 'localContent',
            description: 'Rich text block explaining local pest challenges — climate, urbanisation, soil type, etc.',
            fields: [
                {
                    name: 'title',
                    title: 'Section Title',
                    type: 'string',
                    description: 'e.g., "Why Pretoria Needs Professional Pest Control"',
                },
                {
                    name: 'body',
                    title: 'Content',
                    type: 'array',
                    of: [{ type: 'block' }],
                },
            ],
        },
        {
            name: 'serviceHighlights',
            title: 'Area-Specific Service Highlights',
            type: 'array',
            fieldset: 'localContent',
            description: 'Feature cards specific to this area. If empty, falls back to homepage "Why Choose Us".',
            of: [{
                type: 'object',
                fields: [
                    {
                        name: 'icon',
                        title: 'Icon Name (Font Awesome)',
                        type: 'string',
                        description: 'e.g., "clock", "shield", "map-location"',
                    },
                    {
                        name: 'title',
                        title: 'Title',
                        type: 'string',
                        validation: (Rule: any) => Rule.required(),
                    },
                    {
                        name: 'description',
                        title: 'Description',
                        type: 'text',
                        rows: 2,
                    },
                ],
                preview: {
                    select: { title: 'title' },
                },
            }],
        },
        {
            name: 'content',
            title: 'Additional Content (Rich Text)',
            type: 'array',
            fieldset: 'localContent',
            of: [{ type: 'block' }],
            description: 'Optional rich text block for any extra local content.',
        },

        // --- Call to Action ---
        {
            name: 'ctaHeading',
            title: 'Bottom CTA Heading',
            type: 'string',
            fieldset: 'cta',
            description: 'e.g., "Ready to Solve Your Pest Problem in Pretoria?"',
        },
        {
            name: 'ctaDescription',
            title: 'Bottom CTA Description',
            type: 'text',
            fieldset: 'cta',
            rows: 2,
            description: 'Supporting text for the bottom CTA section.',
        },

        // --- Hub/Spoke & Reviews ---
        {
            name: 'isHub',
            title: 'Is Hub Area?',
            type: 'boolean',
            fieldset: 'connections',
            description: 'Check this if this is a major city (Hub) that links to smaller suburbs (Spokes)',
            initialValue: false,
        },
        {
            name: 'nearbyAreas',
            title: 'Nearby Areas (Spoke/Hub Links)',
            type: 'array',
            fieldset: 'connections',
            description: 'Link to other areas. Hubs should link to their Spokes, and Spokes should link back to their Hub.',
            of: [{ type: 'reference', to: [{ type: 'serviceArea' }] }],
        },
        {
            name: 'selectedReviews',
            title: 'Selected Google Reviews',
            type: 'array',
            fieldset: 'connections',
            description: 'Manually select reviews to display for this area. If empty, will fallback to recent 5-star reviews.',
            of: [{ type: 'reference', to: [{ type: 'googleReview' }] }],
        },

        // --- SEO ---
        {
            name: 'seo',
            title: 'SEO',
            type: 'object',
            fieldset: 'seoFields',
            fields: [
                {
                    name: 'metaTitle',
                    title: 'Meta Title',
                    type: 'string',
                    description: 'e.g., "Pest Control Pretoria | Licensed Experts | Built For Speed"',
                },
                {
                    name: 'metaDesc',
                    title: 'Meta Description',
                    type: 'text',
                    rows: 3,
                    description: 'Under 160 chars. Include area name + key services.',
                },
            ],
        },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'description',
            media: 'image',
        },
    },
};
