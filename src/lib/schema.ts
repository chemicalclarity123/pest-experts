import type {
    Service,
    LocalBusiness,
    FAQPage,
    AggregateRating,
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

    // Add service type if provided
    if (props.serviceType) {
        schema.serviceType = props.serviceType;
    }

    // Add area served (critical for local SEO)
    if (props.areaServed && props.areaServed.length > 0) {
        schema.areaServed = props.areaServed.length === 1
            ? props.areaServed[0]
            : props.areaServed;
    }

    // Add pest expertise to provider Organization (knowsAbout is valid for Organization, not Service)
    if (props.knowsAbout && props.knowsAbout.length > 0) {
        (schema.provider as any).knowsAbout = props.knowsAbout;
    }

    // Add aggregate rating
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

    // Add legal name if different
    if (props.legalName) {
        (schema as any).legalName = props.legalName;
    }

    // Add logo
    if (props.logo) {
        schema.logo = props.logo;
    }

    // Add contact information
    if (props.telephone) {
        schema.telephone = props.telephone;
    }

    if (props.email) {
        schema.email = props.email;
    }

    // Add address (critical for NAP consistency)
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

    // Add geographic coordinates
    if (props.geo) {
        schema.geo = {
            '@type': 'GeoCoordinates',
            latitude: props.geo.latitude,
            longitude: props.geo.longitude,
        };
    }

    // Add opening hours
    if (props.openingHours && props.openingHours.length > 0) {
        schema.openingHours = props.openingHours;
    }

    // Add price range
    if (props.priceRange) {
        schema.priceRange = props.priceRange;
    }

    // Add aggregate rating (4.8 Google rating!)
    if (props.aggregateRating) {
        schema.aggregateRating = {
            '@type': 'AggregateRating',
            ratingValue: props.aggregateRating.ratingValue,
            reviewCount: props.aggregateRating.reviewCount,
            bestRating: props.aggregateRating.bestRating || 5,
        };
    }

    // Add sameAs (social profiles + Google Maps - critical for verification)
    if (props.sameAs && props.sameAs.length > 0) {
        schema.sameAs = props.sameAs;
    }

    // Add area served
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

// Homepage Schema with LocalBusiness + FAQ composite
interface HomepageSchemaProps extends EnhancedLocalBusinessSchemaProps {
    faqs?: Array<{
        question: string;
        answer: string;
    }>;
    services?: string[];
}

export function generateHomepageSchema(props: HomepageSchemaProps): Array<WithContext<LocalBusiness> | WithContext<FAQPage>> {
    // Start with the LocalBusiness schema
    const businessSchema = generateEnhancedLocalBusinessSchema(props) as any;

    // Add services offered if provided
    if (props.services && props.services.length > 0) {
        businessSchema.hasOfferCatalog = {
            '@type': 'OfferCatalog',
            name: 'Pest Control Services',
            itemListElement: props.services.map((service, index) => ({
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: service,
                },
            })),
        };
    }

    // Create array of schemas starting with LocalBusiness
    const schemas: Array<WithContext<LocalBusiness> | WithContext<FAQPage>> = [businessSchema];

    // Add separate FAQPage schema if FAQs are provided
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
