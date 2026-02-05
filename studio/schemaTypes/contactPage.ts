import { defineField, defineType } from 'sanity'

export const contactPage = defineType({
    name: 'contactPage',
    title: 'Contact Page',
    type: 'document',
    fields: [
        defineField({
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            fields: [
                defineField({
                    name: 'heading',
                    title: 'Heading',
                    type: 'string',
                    initialValue: 'Contact Us',
                }),
                defineField({
                    name: 'subheading',
                    title: 'Subheading',
                    type: 'string',
                    initialValue: 'Fast, Effective Pest Control Solutions',
                }),
                defineField({
                    name: 'backgroundImage',
                    title: 'Background Image',
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                    description: 'Optional. Overrides the default map background.',
                }),
            ],
        }),
        defineField({
            name: 'content',
            title: 'Content Section',
            type: 'array',
            of: [{ type: 'block' }],
            description: 'Add custom text, instructions, or extra details below the hero section.',
        }),
        defineField({
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            fields: [
                defineField({
                    name: 'metaTitle',
                    title: 'Meta Title',
                    type: 'string',
                    description: 'Overrides the default page title',
                }),
                defineField({
                    name: 'metaDescription',
                    title: 'Meta Description',
                    type: 'text',
                    rows: 3,
                    description: 'Overrides the default meta description',
                }),
            ],
        }),
    ],
    preview: {
        select: {
            title: 'hero.heading',
        },
        prepare({ title }) {
            return {
                title: title || 'Contact Page',
                subtitle: 'Singleton Page Configuration',
            }
        },
    },
})
