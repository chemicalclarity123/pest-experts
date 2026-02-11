import type {
    Service,
    LocalBusiness,
    FAQPage,
    AggregateRating,
    BreadcrumbList,
    Organization,
    WithContext
} from 'schema-dts';

// Enhanced Service Schema with Local SEO data
interface EnhancedServiceSchemaProps {
    name: string;
    description: string;
    serviceType?: string;
    provider: {
        name: string;
        url: string;
    };
    areaServed?: string[];
    knowsAbout?: string[]; // Pest expertise
    aggregateRating?: {
        ratingValue: number;
        reviewCount: number;
        bestRating?: number;
    };
}

// Enhanced LocalBusiness Schema with all SEO elements
interface EnhancedLocalBusinessSchemaProps {
    name: string;
    legalName?: string;
    description: string;
    url: string;
    telephone?: string;
    email?: string;
    address?: {
        streetAddress: string;
        addressLocality: string;
        addressRegion: string;
        postalCode: string;
        addressCountry: string;
    };
    geo?: {
        latitude: number;
        longitude: number;
    };
    openingHours?: string[];
    priceRange?: string;
    aggregateRating?: {
        ratingValue: number;
        reviewCount: number;
        bestRating?: number;
    };
    review?: Array<{
        author: string;
        datePublished: string;
        reviewBody: string;
        reviewRating: {
            ratingValue: number;
            bestRating?: number;
        };
    }>;
    sameAs?: string[]; // Social profiles and Google Maps
    areaServed?: string[];
    logo?: string;
}

// FAQ Schema Props
interface FAQSchemaProps {
    faqs: Array<{
        question: string;
        answer: string;
    }>;
}

// Breadcrumb Schema Props
interface BreadcrumbSchemaProps {
    items: Array<{
        name: string;
        item: string;
    }>;
}

export function generateEnhancedServiceSchema(
    props: EnhancedServiceSchemaProps
): WithContext<Service> {
    const schema: WithContext<Service> = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: props.name,
        description: props.description,
        provider: {
            '@type': 'Organization',
            name: props.provider.name,
            url: props.provider.url,
        },
    };

    if (props.serviceType) {
        schema.serviceType = props.serviceType;
    }

    if (props.areaServed && props.areaServed.length > 0) {
        schema.areaServed = props.areaServed.length === 1
            ? props.areaServed[0]
            : props.areaServed;
    }

    if (props.knowsAbout && props.knowsAbout.length > 0) {
        (schema.provider as any).knowsAbout = props.knowsAbout;
    }

    if (props.aggregateRating) {
        schema.aggregateRating = {
            '@type': 'AggregateRating',
            ratingValue: props.aggregateRating.ratingValue,
            reviewCount: props.aggregateRating.reviewCount,
            bestRating: props.aggregateRating.bestRating || 5,
        };
    }

    return schema;
}

export function generateEnhancedLocalBusinessSchema(
    props: EnhancedLocalBusinessSchemaProps
): WithContext<LocalBusiness> {
    const schema: WithContext<LocalBusiness> = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: props.name,
        description: props.description,
        url: props.url,
    };

    if (props.legalName) {
        (schema as any).legalName = props.legalName;
    }

    if (props.logo) {
        schema.logo = props.logo;
    }

    if (props.telephone) {
        schema.telephone = props.telephone;
    }

    if (props.email) {
        schema.email = props.email;
    }

    if (props.address) {
        schema.address = {
            '@type': 'PostalAddress',
            streetAddress: props.address.streetAddress,
            addressLocality: props.address.addressLocality,
            addressRegion: props.address.addressRegion,
            postalCode: props.address.postalCode,
            addressCountry: props.address.addressCountry,
        };
    }

    if (props.geo) {
        schema.geo = {
            '@type': 'GeoCoordinates',
            latitude: props.geo.latitude,
            longitude: props.geo.longitude,
        };
    }

    if (props.openingHours && props.openingHours.length > 0) {
        schema.openingHours = props.openingHours;
    }

    if (props.priceRange) {
        schema.priceRange = props.priceRange;
    }

    if (props.aggregateRating) {
        schema.aggregateRating = {
            '@type': 'AggregateRating',
            ratingValue: props.aggregateRating.ratingValue,
            reviewCount: props.aggregateRating.reviewCount,
            bestRating: props.aggregateRating.bestRating || 5,
        };
    }

    if (props.review && props.review.length > 0) {
        schema.review = props.review.map(r => ({
            '@type': 'Review',
            author: {
                '@type': 'Person',
                name: r.author
            },
            datePublished: r.datePublished,
            reviewBody: r.reviewBody,
            reviewRating: {
                '@type': 'Rating',
                ratingValue: r.reviewRating.ratingValue,
                bestRating: r.reviewRating.bestRating || 5
            }
        })) as any;
    }

    if (props.sameAs && props.sameAs.length > 0) {
        schema.sameAs = props.sameAs;
    }

    if (props.areaServed && props.areaServed.length > 0) {
        schema.areaServed = props.areaServed.length === 1
            ? props.areaServed[0]
            : props.areaServed;
    }

    return schema;
}

export function generateFAQSchema(props: FAQSchemaProps): WithContext<FAQPage> {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: props.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}

export function generateBreadcrumbSchema(props: BreadcrumbSchemaProps): WithContext<BreadcrumbList> {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: props.items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.item,
        })),
    };
}

export function generateOrganizationSchema(props: {
    name: string;
    url: string;
    logo?: string;
    sameAs?: string[];
}): WithContext<Organization> {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: props.name,
        url: props.url,
        logo: props.logo,
        sameAs: props.sameAs,
    };
}

// Homepage Schema with LocalBusiness + FAQ composite
interface HomepageSchemaProps extends EnhancedLocalBusinessSchemaProps {
    faqs?: Array<{
        question: string;
        answer: string;
    }>;
    services?: string[];
}

export function generateHomepageSchema(props: HomepageSchemaProps): Array<WithContext<LocalBusiness> | WithContext<FAQPage>> {
    const businessSchema = generateEnhancedLocalBusinessSchema(props) as any;

    if (props.services && props.services.length > 0) {
        businessSchema.hasOfferCatalog = {
            '@type': 'OfferCatalog',
            name: 'Pest Control Services',
            itemListElement: props.services.map((service) => ({
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: service,
                },
            })),
        };
    }

    const schemas: Array<WithContext<LocalBusiness> | WithContext<FAQPage>> = [businessSchema];

    if (props.faqs && props.faqs.length > 0) {
        const faqSchema = generateFAQSchema({ faqs: props.faqs });
        schemas.push(faqSchema);
    }

    return schemas;
}

// Legacy functions for backward compatibility
export function generateServiceSchema(props: any) {
    return generateEnhancedServiceSchema(props);
}

export function generateLocalBusinessSchema(props: any) {
    return generateEnhancedLocalBusinessSchema(props);
}
