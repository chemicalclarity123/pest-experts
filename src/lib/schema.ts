import type { Service, LocalBusiness, WithContext } from 'schema-dts';

interface ServiceSchemaProps {
    name: string;
    description: string;
    provider: {
        name: string;
        url: string;
    };
    areaServed?: string;
    serviceType?: string;
}

interface LocalBusinessSchemaProps {
    name: string;
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
}

export function generateServiceSchema(props: ServiceSchemaProps): WithContext<Service> {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: props.name,
        description: props.description,
        provider: {
            '@type': 'Organization',
            name: props.provider.name,
            url: props.provider.url,
        },
        ...(props.areaServed && { areaServed: props.areaServed }),
        ...(props.serviceType && { serviceType: props.serviceType }),
    };
}

export function generateLocalBusinessSchema(props: LocalBusinessSchemaProps): WithContext<LocalBusiness> {
    return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: props.name,
        description: props.description,
        url: props.url,
        ...(props.telephone && { telephone: props.telephone }),
        ...(props.email && { email: props.email }),
        ...(props.address && {
            address: {
                '@type': 'PostalAddress',
                streetAddress: props.address.streetAddress,
                addressLocality: props.address.addressLocality,
                addressRegion: props.address.addressRegion,
                postalCode: props.address.postalCode,
                addressCountry: props.address.addressCountry,
            },
        }),
        ...(props.geo && {
            geo: {
                '@type': 'GeoCoordinates',
                latitude: props.geo.latitude,
                longitude: props.geo.longitude,
            },
        }),
        ...(props.openingHours && { openingHours: props.openingHours }),
        ...(props.priceRange && { priceRange: props.priceRange }),
    };
}
