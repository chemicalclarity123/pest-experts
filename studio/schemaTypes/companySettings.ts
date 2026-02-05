// studio/schemaTypes/companySettings.ts
import { CsvTagInput } from '../components/CsvTagInput';

export const companySettings = {
    name: 'companySettings',
    title: 'Company Settings',
    type: 'document',
    __experimental_singleton: true, // Only one instance allowed
    fields: [
        {
            name: 'businessName',
            title: 'Business Name',
            type: 'string',
            description: 'Official business name (e.g., "Pest Experts")',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'legalName',
            title: 'Legal Business Name',
            type: 'string',
            description: 'Legal entity name if different from business name',
        },
        {
            name: 'logo',
            title: 'Company Logo',
            type: 'image',
            options: {
                hotspot: true,
            },
            description: 'Company logo (recommended: square format, min 512x512px)',
        },
        {
            name: 'aggregateRating',
            title: 'Aggregate Rating',
            type: 'object',
            description: 'Your Google Business Profile rating - critical for Local SEO',
            fields: [
                {
                    name: 'ratingValue',
                    title: 'Rating Value',
                    type: 'number',
                    description: 'Average rating (e.g., 4.8)',
                    validation: (Rule: any) => Rule.required().min(0).max(5),
                },
                {
                    name: 'reviewCount',
                    title: 'Review Count',
                    type: 'number',
                    description: 'Total number of reviews',
                    validation: (Rule: any) => Rule.required().min(0),
                },
                {
                    name: 'bestRating',
                    title: 'Best Rating',
                    type: 'number',
                    initialValue: 5,
                    description: 'Maximum possible rating (usually 5)',
                },
            ],
        },
        {
            name: 'address',
            title: 'Physical Address',
            type: 'object',
            description: 'NAP (Name, Address, Phone) consistency is critical for Local SEO',
            fields: [
                {
                    name: 'streetAddress',
                    title: 'Street Address',
                    type: 'string',
                    description: 'e.g., "123 Main Road"',
                    validation: (Rule: any) => Rule.required(),
                },
                {
                    name: 'addressLocality',
                    title: 'City/Town',
                    type: 'string',
                    description: 'e.g., "Johannesburg", "Pretoria", "Sandton"',
                    validation: (Rule: any) => Rule.required(),
                },
                {
                    name: 'addressRegion',
                    title: 'Province',
                    type: 'string',
                    description: 'e.g., "Gauteng"',
                    validation: (Rule: any) => Rule.required(),
                    initialValue: 'Gauteng',
                },
                {
                    name: 'postalCode',
                    title: 'Postal Code',
                    type: 'string',
                    description: 'e.g., "2000"',
                    validation: (Rule: any) => Rule.required(),
                },
                {
                    name: 'addressCountry',
                    title: 'Country',
                    type: 'string',
                    initialValue: 'ZA',
                    description: 'ISO country code (ZA for South Africa)',
                    options: {
                        list: [
                            { title: 'South Africa', value: 'ZA' },
                            { title: 'United States', value: 'US' },
                            { title: 'United Kingdom', value: 'GB' },
                        ],
                    },
                },
            ],
        },
        {
            name: 'geo',
            title: 'Geographic Coordinates',
            type: 'object',
            description: 'Precise location - helps Google understand your service area',
            fields: [
                {
                    name: 'latitude',
                    title: 'Latitude',
                    type: 'number',
                    description: 'e.g., -26.2041 (Johannesburg)',
                    validation: (Rule: any) => Rule.required().min(-90).max(90),
                },
                {
                    name: 'longitude',
                    title: 'Longitude',
                    type: 'number',
                    description: 'e.g., 28.0473 (Johannesburg)',
                    validation: (Rule: any) => Rule.required().min(-180).max(180),
                },
            ],
        },
        {
            name: 'contactInfo',
            title: 'Contact Information',
            type: 'object',
            description: 'NAP consistency - use same format everywhere',
            fields: [
                {
                    name: 'telephone',
                    title: 'Phone Number',
                    type: 'string',
                    description: 'Primary phone number (e.g., +27 11 123 4567)',
                    validation: (Rule: any) => Rule.required(),
                },
                {
                    name: 'email',
                    title: 'Email',
                    type: 'string',
                    description: 'Business email address',
                    initialValue: 'info@pestexperts.co.za',
                    validation: (Rule: any) => Rule.email(),
                },
                {
                    name: 'whatsapp',
                    title: 'WhatsApp Number',
                    type: 'string',
                    description: 'WhatsApp business number (popular in SA for lead gen)',
                },
            ],
        },
        {
            name: 'businessHours',
            title: 'Business Hours',
            type: 'array',
            description: 'Opening hours for "Open Now" search filters',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'days',
                            title: 'Days',
                            type: 'string',
                            description: 'e.g., "Mo-Fr" or "Sa"',
                            options: {
                                list: [
                                    { title: 'Monday', value: 'Monday' },
                                    { title: 'Tuesday', value: 'Tuesday' },
                                    { title: 'Wednesday', value: 'Wednesday' },
                                    { title: 'Thursday', value: 'Thursday' },
                                    { title: 'Friday', value: 'Friday' },
                                    { title: 'Saturday', value: 'Saturday' },
                                    { title: 'Sunday', value: 'Sunday' },
                                    { title: 'Monday-Friday', value: 'Mo-Fr' },
                                    { title: 'Monday-Saturday', value: 'Mo-Sa' },
                                    { title: 'Monday-Sunday', value: 'Mo-Su' },
                                    { title: 'Public Holidays', value: 'PH' },
                                ],
                            },
                        },
                        {
                            name: 'opens',
                            title: 'Opens',
                            type: 'string',
                            description: 'Opening time (e.g., "08:00")',
                        },
                        {
                            name: 'closes',
                            title: 'Closes',
                            type: 'string',
                            description: 'Closing time (e.g., "17:00")',
                        },
                    ],
                    preview: {
                        select: {
                            days: 'days',
                            opens: 'opens',
                            closes: 'closes',
                        },
                        prepare({ days, opens, closes }: any) {
                            return {
                                title: `${days}: ${opens} - ${closes}`,
                            };
                        },
                    },
                },
            ],
        },
        {
            name: 'priceRange',
            title: 'Price Range',
            type: 'string',
            description: 'Price range indicator',
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
            name: 'sameAs',
            title: 'Social & Review Profiles',
            type: 'array',
            description: 'URLs to social media, Google Maps, review sites (critical for verification)',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'platform',
                            title: 'Platform',
                            type: 'string',
                            options: {
                                list: [
                                    'Google Maps',
                                    'Facebook',
                                    'Twitter',
                                    'LinkedIn',
                                    'Instagram',
                                    'HelloPeter',
                                    'Snupit',
                                    'Other',
                                ],
                            },
                        },
                        {
                            name: 'url',
                            title: 'URL',
                            type: 'url',
                            validation: (Rule: any) => Rule.required().uri({ scheme: ['http', 'https'] }),
                        },
                    ],
                    preview: {
                        select: {
                            platform: 'platform',
                            url: 'url',
                        },
                        prepare({ platform, url }: any) {
                            return {
                                title: platform,
                                subtitle: url,
                            };
                        },
                    },
                },
            ],
        },
        {
            name: 'serviceAreas',
            title: 'Service Areas',
            type: 'array',
            description: 'Cities and suburbs served (used for schema.org areaServed). Paste comma-separated values to add multiple areas at once.',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
            },
            initialValue: [
                'Pretoria',
                'Centurion',
                'Midrand',
                'Johannesburg South',
                'Sandton',
                'Randburg',
            ],
            components: {
                input: CsvTagInput,
            },
        },
        {
            name: 'serviceArea',
            title: 'Primary Service Area (Legacy)',
            type: 'object',
            description: 'Overall geographic service area for Gauteng (kept for backward compatibility)',
            options: {
                collapsible: true,
                collapsed: true,
            },
            fields: [
                {
                    name: 'areaServed',
                    title: 'Area Description',
                    type: 'string',
                    description: 'e.g., "Greater Johannesburg and Pretoria"',
                    initialValue: 'Gauteng Province',
                },
                {
                    name: 'radius',
                    title: 'Service Radius (km)',
                    type: 'number',
                    description: 'How far from your location you serve (in kilometers)',
                },
                {
                    name: 'gautengAreas',
                    title: 'Gauteng Areas Served',
                    type: 'array',
                    description: 'Specific cities/suburbs in Gauteng for Local SEO targeting',
                    of: [{ type: 'string' }],
                    options: {
                        layout: 'tags',
                    },
                },
            ],
        },
        {
            name: 'certifications',
            title: 'Certifications & Licenses',
            type: 'array',
            description: 'Industry certifications (builds trust and authority)',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'name',
                            title: 'Certification Name',
                            type: 'string',
                            description: 'e.g., "SAPCA Registered", "ISO Certified"',
                        },
                        {
                            name: 'issuingOrganization',
                            title: 'Issuing Organization',
                            type: 'string',
                            description: 'e.g., "South African Pest Control Association"',
                        },
                        {
                            name: 'certificationNumber',
                            title: 'Certificate Number',
                            type: 'string',
                        },
                    ],
                    preview: {
                        select: {
                            name: 'name',
                            org: 'issuingOrganization',
                        },
                        prepare({ name, org }: any) {
                            return {
                                title: name,
                                subtitle: org,
                            };
                        },
                    },
                },
            ],
        },
        {
            name: 'paymentAccepted',
            title: 'Payment Methods',
            type: 'array',
            description: 'Accepted payment methods (helps with local searches)',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Cash', value: 'Cash' },
                    { title: 'Credit Card', value: 'Credit Card' },
                    { title: 'Debit Card', value: 'Debit Card' },
                    { title: 'EFT', value: 'EFT' },
                    { title: 'SnapScan', value: 'SnapScan' },
                    { title: 'Zapper', value: 'Zapper' },
                    { title: 'Invoice', value: 'Invoice' },
                ],
            },
        },
        {
            name: 'languages',
            title: 'Languages Spoken',
            type: 'array',
            description: 'Languages your team speaks (important for SA market)',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'English', value: 'English' },
                    { title: 'Afrikaans', value: 'Afrikaans' },
                    { title: 'Zulu', value: 'Zulu' },
                    { title: 'Xhosa', value: 'Xhosa' },
                    { title: 'Sotho', value: 'Sotho' },
                    { title: 'Tswana', value: 'Tswana' },
                ],
            },
        },
        {
            name: 'emergencyService',
            title: 'Emergency Service Available',
            type: 'boolean',
            description: 'Do you offer 24/7 or emergency services?',
            initialValue: false,
        },
        {
            name: 'yearsInBusiness',
            title: 'Years in Business',
            type: 'number',
            description: 'How many years have you been operating? (builds trust)',
        },
        {
            name: 'testimonials',
            title: 'Customer Testimonials',
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
    ],
    preview: {
        select: {
            title: 'businessName',
            rating: 'aggregateRating.ratingValue',
            area: 'address.addressLocality',
        },
        prepare({ title, rating, area }: any) {
            return {
                title: title || 'Company Settings',
                subtitle: rating ? `⭐ ${rating} | ${area || 'Gauteng'}` : 'Configure your business',
            };
        },
    },
};
