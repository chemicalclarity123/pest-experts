// studio/schemaTypes/homepage.ts
export const homepage = {
    name: 'homepage',
    title: 'Homepage',
    type: 'document',
    __experimental_singleton: true,
    fields: [
        // 1. SEO Section (First - affects search engines)
        {
            name: 'seo',
            title: '1. SEO & Meta Data',
            type: 'object',
            description: 'Critical SEO fields for search engines and social sharing',
            options: {
                collapsible: true,
                collapsed: true,
            },
            fields: [
                {
                    name: 'pageTitle',
                    title: 'Page Title',
                    type: 'string',
                    description: 'SEO title (50-60 characters recommended)',
                    validation: (Rule: any) => Rule.required().max(60).warning('Keep under 60 characters for optimal display'),
                },
                {
                    name: 'metaDescription',
                    title: 'Meta Description',
                    type: 'text',
                    rows: 3,
                    description: 'SEO description (150-160 characters recommended)',
                    validation: (Rule: any) => Rule.required().max(160).warning('Keep under 160 characters for optimal display'),
                },
                {
                    name: 'keywords',
                    title: 'Focus Keywords',
                    type: 'array',
                    description: 'Primary keywords for this page',
                    of: [{ type: 'string' }],
                    options: {
                        layout: 'tags',
                    },
                },
                {
                    name: 'ogImage',
                    title: 'Open Graph Image',
                    type: 'image',
                    description: 'Social sharing image (1200x630px recommended)',
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
                    name: 'canonicalUrl',
                    title: 'Canonical URL',
                    type: 'url',
                    description: 'Preferred URL for this page (optional)',
                },
            ],
        },
        // Quick Access Hero Fields (Root Level)
        {
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'string',
            description: 'Main hero headline (also available in Hero Section below)',
        },
        {
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'string',
            description: 'Hero subheadline (also available in Hero Section below)',
        },
        {
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            description: 'Hero background image (also available in Hero Section below)',
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
        // Modular Content Blocks
        {
            name: 'contentBlocks',
            title: 'Content Blocks (Modular Page Builder)',
            type: 'array',
            description: 'Build your homepage with modular content blocks',
            of: [
                {
                    type: 'object',
                    name: 'heroBlock',
                    title: 'Hero Block',
                    fields: [
                        {
                            name: 'blockType',
                            type: 'string',
                            initialValue: 'hero',
                            hidden: true,
                        },
                        {
                            name: 'headline',
                            title: 'Headline',
                            type: 'string',
                        },
                        {
                            name: 'subheadline',
                            title: 'Subheadline',
                            type: 'string',
                        },
                        {
                            name: 'backgroundImage',
                            title: 'Background Image',
                            type: 'image',
                            options: { hotspot: true },
                        },
                    ],
                    preview: {
                        select: { title: 'headline' },
                        prepare({ title }: any) {
                            return { title: `Hero: ${title || 'Untitled'}` };
                        },
                    },
                },
                {
                    type: 'object',
                    name: 'servicesBlock',
                    title: 'Services Block',
                    fields: [
                        {
                            name: 'blockType',
                            type: 'string',
                            initialValue: 'services',
                            hidden: true,
                        },
                        {
                            name: 'title',
                            title: 'Section Title',
                            type: 'string',
                        },
                        {
                            name: 'description',
                            title: 'Description',
                            type: 'text',
                        },
                    ],
                    preview: {
                        prepare() {
                            return { title: 'Services Section' };
                        },
                    },
                },
                {
                    type: 'object',
                    name: 'featuresBlock',
                    title: 'Features Block',
                    fields: [
                        {
                            name: 'blockType',
                            type: 'string',
                            initialValue: 'features',
                            hidden: true,
                        },
                        {
                            name: 'title',
                            title: 'Section Title',
                            type: 'string',
                        },
                    ],
                    preview: {
                        prepare() {
                            return { title: 'Features Section' };
                        },
                    },
                },
                {
                    type: 'object',
                    name: 'testimonialsBlock',
                    title: 'Testimonials Block',
                    fields: [
                        {
                            name: 'blockType',
                            type: 'string',
                            initialValue: 'testimonials',
                            hidden: true,
                        },
                        {
                            name: 'title',
                            title: 'Section Title',
                            type: 'string',
                        },
                    ],
                    preview: {
                        prepare() {
                            return { title: 'Testimonials Section' };
                        },
                    },
                },
                {
                    type: 'object',
                    name: 'faqBlock',
                    title: 'FAQ Block',
                    fields: [
                        {
                            name: 'blockType',
                            type: 'string',
                            initialValue: 'faq',
                            hidden: true,
                        },
                        {
                            name: 'title',
                            title: 'Section Title',
                            type: 'string',
                        },
                    ],
                    preview: {
                        prepare() {
                            return { title: 'FAQ Section' };
                        },
                    },
                },
                {
                    type: 'object',
                    name: 'ctaBlock',
                    title: 'CTA Block',
                    fields: [
                        {
                            name: 'blockType',
                            type: 'string',
                            initialValue: 'cta',
                            hidden: true,
                        },
                        {
                            name: 'title',
                            title: 'CTA Title',
                            type: 'string',
                        },
                        {
                            name: 'buttonText',
                            title: 'Button Text',
                            type: 'string',
                        },
                    ],
                    preview: {
                        select: { title: 'title' },
                        prepare({ title }: any) {
                            return { title: `CTA: ${title || 'Untitled'}` };
                        },
                    },
                },
            ],
        },
        // 2. Hero Section (Legacy - kept for backward compatibility)
        {
            name: 'hero',
            title: '2. Hero Section',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: false,
            },
            fields: [
                {
                    name: 'headline',
                    title: 'Main Headline',
                    type: 'string',
                    description: 'Main headline (e.g., "Gauteng\'s Trusted Pest Control")',
                    validation: (Rule: any) => Rule.required(),
                },
                {
                    name: 'subheadline',
                    title: 'Subheadline',
                    type: 'string',
                    description: 'Supporting text (e.g., "Fast, Local, Effective")',
                },
                {
                    name: 'ctaText',
                    title: 'CTA Button Text',
                    type: 'string',
                    initialValue: 'Get A Quote',
                },
                {
                    name: 'backgroundImage',
                    title: 'Background Image',
                    type: 'image',
                    description: 'Hero background (recommended: 1920x1080px)',
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        {
                            name: 'alt',
                            title: 'Alt Text',
                            type: 'string',
                            description: 'Describe the image for accessibility and SEO',
                            validation: (Rule: any) => Rule.required(),
                        },
                    ],
                },
                {
                    name: 'trustBadges',
                    title: 'Trust Badges',
                    type: 'array',
                    description: 'Quick trust indicators (e.g., "24/7 Service", "Licensed")',
                    of: [{ type: 'string' }],
                },
            ],
        },
        // 3. Services Section
        {
            name: 'services',
            title: '3. Services Section',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: false,
            },
            fields: [
                {
                    name: 'title',
                    title: 'Section Title',
                    type: 'string',
                    initialValue: 'Our Services',
                },
                {
                    name: 'description',
                    title: 'Section Description',
                    type: 'text',
                    rows: 2,
                },
                {
                    name: 'serviceCards',
                    title: 'Service Cards',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                {
                                    name: 'image',
                                    title: 'Service Image',
                                    type: 'image',
                                    options: {
                                        hotspot: true,
                                    },
                                    fields: [
                                        {
                                            name: 'alt',
                                            title: 'Alt Text',
                                            type: 'string',
                                            validation: (Rule: any) => Rule.required(),
                                        },
                                    ],
                                },
                                {
                                    name: 'heading',
                                    title: 'Service Heading',
                                    type: 'string',
                                    validation: (Rule: any) => Rule.required(),
                                },
                                {
                                    name: 'description',
                                    title: 'Service Description',
                                    type: 'text',
                                    rows: 3,
                                },
                                {
                                    name: 'link',
                                    title: 'Link URL',
                                    type: 'string',
                                    description: 'Optional link to service page',
                                },
                            ],
                            preview: {
                                select: {
                                    title: 'heading',
                                    subtitle: 'description',
                                    media: 'image',
                                },
                            },
                        },
                    ],
                },
            ],
        },
        // 4. Service Areas Section
        {
            name: 'serviceAreas',
            title: '4. Service Areas Section',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: true,
            },
            fields: [
                {
                    name: 'title',
                    title: 'Section Title',
                    type: 'string',
                    description: 'Main headline (e.g., "Gauteng\'s Trusted Pest Control")',
                    validation: (Rule: any) => Rule.required(),
                },
                {
                    name: 'description',
                    title: 'Description',
                    type: 'text',
                    rows: 2,
                },
                {
                    name: 'mapImage',
                    title: 'Map Image',
                    type: 'image',
                    description: 'Gauteng service area map',
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        {
                            name: 'alt',
                            title: 'Alt Text',
                            type: 'string',
                            description: 'Describe the map for accessibility',
                            validation: (Rule: any) => Rule.required(),
                        },
                    ],
                },
            ],
        },
        // 5. Why Choose Us Section
        {
            name: 'whyChooseUs',
            title: '5. Why Choose Us Section',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: true,
            },
            fields: [
                {
                    name: 'title',
                    title: 'Section Title',
                    type: 'string',
                    initialValue: 'Why Choose Us',
                },
                {
                    name: 'features',
                    title: 'Features',
                    type: 'array',
                    description: 'Key benefits/features',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                {
                                    name: 'icon',
                                    title: 'Font Awesome Icon',
                                    type: 'string',
                                    description: 'Enter Font Awesome icon name (e.g., "shield-halved", "award", "clock", "users"). Search icons at fontawesome.com/icons',
                                    validation: (Rule: any) => Rule.required().custom((value: string) => {
                                        if (!value) return 'Icon is required';
                                        if (!/^[a-z0-9-]+$/.test(value)) {
                                            return 'Icon name should only contain lowercase letters, numbers, and hyphens';
                                        }
                                        return true;
                                    }),
                                    placeholder: 'e.g., shield-halved, award, users',
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
                                select: {
                                    title: 'title',
                                    subtitle: 'description',
                                },
                            },
                        },
                    ],
                },
            ],
        },
        // 6. Testimonials Section
        {
            name: 'testimonials',
            title: '6. Testimonials Section',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: true,
            },
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
                                    description: 'e.g., "Pretoria" or "Johannesburg"',
                                },
                                {
                                    name: 'avatar',
                                    title: 'Avatar Image',
                                    type: 'image',
                                    options: {
                                        hotspot: true,
                                    },
                                },
                            ],
                            preview: {
                                select: {
                                    title: 'customerName',
                                    subtitle: 'reviewText',
                                    media: 'avatar',
                                },
                            },
                        },
                    ],
                },
            ],
        },
        // 7. FAQ Section
        {
            name: 'faq',
            title: '7. FAQ Section',
            type: 'object',
            description: 'Frequently Asked Questions with schema markup for SEO',
            options: {
                collapsible: true,
                collapsed: true,
            },
            fields: [
                {
                    name: 'title',
                    title: 'Section Title',
                    type: 'string',
                    initialValue: 'Frequently Asked Questions',
                },
                {
                    name: 'questions',
                    title: 'Questions',
                    type: 'array',
                    description: 'Add FAQ items',
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
                                    rows: 4,
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
        // 8. Lead Form Section
        {
            name: 'leadForm',
            title: '8. Lead Form Section',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: true,
            },
            fields: [
                {
                    name: 'title',
                    title: 'Form Title',
                    type: 'string',
                    initialValue: 'Get A Free Quote',
                },
                {
                    name: 'description',
                    title: 'Form Description',
                    type: 'text',
                    rows: 2,
                },
                {
                    name: 'successMessage',
                    title: 'Success Message',
                    type: 'text',
                    initialValue: 'Thank you! We\'ll contact you within 1 hour.',
                },
            ],
        },
    ],
    preview: {
        prepare() {
            return {
                title: 'Homepage Content',
            };
        },
    },
};
