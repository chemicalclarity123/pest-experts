// studio/schemaTypes/googleReview.ts
import { defineType, defineField } from 'sanity'

export const googleReview = defineType({
    name: 'googleReview',
    title: 'Google Review',
    type: 'document',
    fields: [
        defineField({
            name: 'author',
            title: 'Author Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'authorPhoto',
            title: 'Author Photo URL',
            type: 'url',
            description: 'URL to the reviewer\'s profile photo',
        }),
        defineField({
            name: 'rating',
            title: 'Rating',
            type: 'number',
            validation: (Rule) => Rule.required().min(1).max(5),
        }),
        defineField({
            name: 'text',
            title: 'Review Text',
            type: 'text',
            rows: 5,
        }),
        defineField({
            name: 'relativeTime',
            title: 'Relative Time Description',
            type: 'string',
            description: 'Literal string from Google (e.g., "2 weeks ago")',
        }),
        defineField({
            name: 'publishDate',
            title: 'Publish Date',
            type: 'datetime',
            description: 'Used for sorting reviews',
        }),
        defineField({
            name: 'googleReviewId',
            title: 'Google Review ID',
            type: 'string',
            description: 'Unique identifier from Google to prevent duplicates',
            validation: (Rule) => Rule.required(),
            readOnly: true,
        }),
        defineField({
            name: 'isFeatured',
            title: 'Featured Review',
            type: 'boolean',
            initialValue: true,
            description: 'Toggle to show/hide this review on the frontend',
        }),
        defineField({
            name: 'location',
            title: 'Reviewer Location',
            type: 'string',
            description: 'Optional location (e.g., "Pretoria")',
        }),
    ],
    preview: {
        select: {
            title: 'author',
            subtitle: 'text',
            rating: 'rating',
        },
        prepare({ title, subtitle, rating }) {
            return {
                title: `${title} (${rating} ⭐)`,
                subtitle: subtitle,
            }
        },
    },
    orderings: [
        {
            title: 'Newest First',
            name: 'publishDateDesc',
            by: [{ field: 'publishDate', direction: 'desc' }],
        },
        {
            title: 'Highest Rating',
            name: 'ratingDesc',
            by: [{ field: 'rating', direction: 'desc' }],
        },
    ],
})
