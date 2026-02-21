import { CsvTagInput } from '../components/CsvTagInput'

export const blogPost = {
    name: 'blogPost',
    title: 'Blog Post',
    type: 'document',
    fieldsets: [
        { name: 'seo', title: 'SEO & Social', options: { collapsible: true, collapsed: false } },
        { name: 'cro', title: 'CRO & Linking', options: { collapsible: true, collapsed: false } },
    ],
    fields: [
        {
            name: 'title',
            title: 'Post Title',
            type: 'string',
            description: 'The headline — keep it clear, keyword-rich, and under 70 characters',
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
            description: 'URL path — auto-generated from title',
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
            name: 'featuredImage',
            title: 'Featured Image',
            type: 'image',
            description: 'Hero image and social share fallback. Optimal: 1200x630px',
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
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            description: 'Short summary for cards and meta description fallback (max 200 chars)',
            rows: 3,
            validation: (Rule: any) => Rule.required().max(200).warning('Keep under 200 characters'),
        },
        {
            name: 'author',
            title: 'Author Name',
            type: 'string',
            description: 'Author of this post (for Article schema)',
            initialValue: 'Pest Experts Team',
        },
        {
            name: 'publishedAt',
            title: 'Published Date',
            type: 'datetime',
            description: 'When this post was first published',
            validation: (Rule: any) => Rule.required(),
            options: {
                dateFormat: 'YYYY-MM-DD',
            },
        },
        {
            name: 'updatedAt',
            title: 'Last Updated',
            type: 'datetime',
            description: 'Last time the content was meaningfully updated (improves freshness signals)',
            options: {
                dateFormat: 'YYYY-MM-DD',
            },
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            description: 'Primary content category',
            options: {
                list: [
                    { title: 'Pest Tips', value: 'pest-tips' },
                    { title: 'Seasonal Guides', value: 'seasonal' },
                    { title: 'DIY vs Professional', value: 'diy-vs-pro' },
                    { title: 'Industry News', value: 'industry' },
                ],
                layout: 'radio',
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            description: 'Topic tags for filtering and internal linking',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
            },
            components: {
                input: CsvTagInput
            },
        },
        {
            name: 'readingTime',
            title: 'Reading Time (minutes)',
            type: 'number',
            description: 'Estimated reading time — shown on cards and post header',
            validation: (Rule: any) => Rule.min(1).max(60),
        },
        {
            name: 'featured',
            title: 'Featured Post',
            type: 'boolean',
            description: 'Pin this post to the top of the blog listing',
            initialValue: false,
        },
        {
            name: 'content',
            title: 'Post Content',
            type: 'array',
            description: 'Full article content with rich text, headings, and images',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'H4', value: 'h4' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                    lists: [
                        { title: 'Bullet', value: 'bullet' },
                        { title: 'Numbered', value: 'number' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Bold', value: 'strong' },
                            { title: 'Italic', value: 'em' },
                            { title: 'Underline', value: 'underline' },
                        ],
                        annotations: [
                            {
                                name: 'link',
                                type: 'object',
                                title: 'URL',
                                fields: [
                                    {
                                        name: 'href',
                                        type: 'url',
                                        title: 'URL',
                                        validation: (Rule: any) => Rule.uri({
                                            allowRelative: true,
                                            scheme: ['https', 'http', 'mailto', 'tel'],
                                        }),
                                    },
                                    {
                                        name: 'blank',
                                        type: 'boolean',
                                        title: 'Open in new tab',
                                        initialValue: false,
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        {
                            name: 'alt',
                            title: 'Alt Text',
                            type: 'string',
                            description: 'Describe the image for accessibility',
                            validation: (Rule: any) => Rule.required(),
                        },
                        {
                            name: 'caption',
                            title: 'Caption',
                            type: 'string',
                            description: 'Optional caption displayed below the image',
                        },
                    ],
                },
            ],
        },

        // SEO group
        {
            name: 'seo',
            title: 'SEO & Social',
            type: 'object',
            description: 'Override auto-generated meta tags',
            fieldset: 'seo',
            fields: [
                {
                    name: 'metaTitle',
                    title: 'Meta Title',
                    type: 'string',
                    description: 'Custom title tag (max 60 chars). Leave blank to use post title.',
                    validation: (Rule: any) =>
                        Rule.max(60).warning('Keep under 60 characters'),
                },
                {
                    name: 'metaDescription',
                    title: 'Meta Description',
                    type: 'text',
                    description: 'Custom description (max 160 chars). Leave blank to use excerpt.',
                    validation: (Rule: any) =>
                        Rule.max(160).warning('Keep under 160 characters'),
                },
                {
                    name: 'keywords',
                    title: 'Focus Keywords',
                    type: 'array',
                    description: 'Target keywords for this post',
                    of: [{ type: 'string' }],
                    options: {
                        layout: 'tags',
                    },
                    components: {
                        input: CsvTagInput
                    },
                },
                {
                    name: 'shareImage',
                    title: 'Social Share Image',
                    type: 'image',
                    description: 'Override featured image for social sharing (1200x630px)',
                    options: {
                        hotspot: true,
                    },
                },
            ],
        },

        // CRO group
        {
            name: 'associatedServices',
            title: 'Associated Services',
            type: 'array',
            description: 'Select relevant services from your existing list — shown as CTA cards after content',
            fieldset: 'cro',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'service' }]
                }
            ],
            validation: (Rule: any) => Rule.max(3).warning('Show at most 3 for best conversion'),
        },
        {
            name: 'ctaOverride',
            title: 'CTA Override',
            type: 'object',
            description: 'Custom call-to-action for this post (overrides default)',
            fieldset: 'cro',
            options: { collapsible: true, collapsed: true },
            fields: [
                {
                    name: 'heading',
                    title: 'CTA Heading',
                    type: 'string',
                    description: 'e.g., "Got a termite problem?"',
                },
                {
                    name: 'description',
                    title: 'CTA Description',
                    type: 'text',
                    rows: 2,
                    description: 'e.g., "Get a free quote from our certified technicians"',
                },
                {
                    name: 'buttonText',
                    title: 'Button Text',
                    type: 'string',
                    initialValue: 'Get a Free Quote',
                },
            ],
        },
    ],
    orderings: [
        {
            title: 'Published Date (Newest)',
            name: 'publishedAtDesc',
            by: [{ field: 'publishedAt', direction: 'desc' }],
        },
        {
            title: 'Published Date (Oldest)',
            name: 'publishedAtAsc',
            by: [{ field: 'publishedAt', direction: 'asc' }],
        },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'category',
            media: 'featuredImage',
            date: 'publishedAt',
        },
        prepare({ title, subtitle, media, date }: any) {
            const categoryLabels: Record<string, string> = {
                'pest-tips': 'Pest Tips',
                'seasonal': 'Seasonal',
                'diy-vs-pro': 'DIY vs Pro',
                'industry': 'Industry',
            };
            const formattedDate = date ? new Date(date).toLocaleDateString('en-ZA') : 'No date';
            return {
                title,
                subtitle: `${categoryLabels[subtitle] || subtitle || 'No category'} · ${formattedDate}`,
                media,
            };
        },
    },
}
