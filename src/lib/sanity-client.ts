import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'vc8zkv1m',
  dataset: 'production',
  apiVersion: '2026-02-04',
  useCdn: false,
});

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source).auto('format').fit('max');
}

export { builder as imageBuilder };

// Fetch company settings (singleton)
export async function fetchCompanySettings() {
  try {
    const query = `*[_type == "companySettings"][0]{
      businessName,
      legalName,
      "logo": logo.asset->url,
      aggregateRating,
      address,
      geo,
      contactInfo,
      businessHours,
      priceRange,
      sameAs[]{
        platform,
        url
      },
      serviceAreas,
      serviceArea
    }`;
    const settings = await client.fetch(query);
    return settings;
  } catch (error) {
    console.error('Error fetching company settings:', error);
    return null;
  }
}

// Fetch all services with local SEO data
export async function fetchServices() {
  try {
    const query = `*[_type == "service"] | order(featured desc, title asc){
      _id,
      _type,
      title,
      "slug": slug.current,
      featured,
      description,
      seo,
      localContext{
        serviceType,
        pests,
        areas,
        faqs[]{
          question,
          answer
        }
      },
      pricing
    }`;
    const services = await client.fetch(query);
    return services;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

// Fetch a single service by slug with all data
export async function fetchServiceBySlug(slug: string) {
  try {
    const query = `*[_type == "service" && slug.current == $slug][0]{
      _id,
      _type,
      title,
      "slug": slug.current,
      featured,
      description,
      content,
      seo{
        metaTitle,
        metaDesc,
        "shareImage": shareImage.asset->url
      },
      localContext{
        serviceType,
        pests,
        areas,
        faqs[]{
          question,
          answer
        }
      },
      pricing
    }`;
    const service = await client.fetch(query, { slug });
    return service;
  } catch (error) {
    console.error(`Error fetching service with slug "${slug}":`, error);
    return null;
  }
}

// Fetch homepage content (singleton)
export async function fetchHomepage() {
  try {
    const query = `*[_type == "homepage"][0]{
      hero{
        headline,
        subheadline,
        ctaText,
        backgroundImage,
        trustBadges
      },
      services{
        title,
        description,
        serviceCards[]{
          image,
          "imageAlt": image.alt,
          heading,
          description,
          link
        }
      },
      serviceAreas{
        title,
        description,
        mapImage
      },
      whyChooseUs{
        title,
        features[]{
          icon,
          title,
          description
        }
      },
      testimonials{
        title,
        reviews[]{
          customerName,
          rating,
          reviewText,
          location,
          avatar
        }
      },
      stats,
      formSection,
      leadForm{
        title,
        description,
        successMessage
      },
      faq{
        title,
        questions[]{
          question,
          answer
        }
      }
    }`;
    const homepage = await client.fetch(query);
    return homepage;
  } catch (error) {
    console.error('Error fetching homepage:', error);
    return null;
  }
}

// Helper function to fetch all document types
export async function fetchAllDocumentTypes() {
  try {
    const query = `array::unique(*[]._type)`;
    const types = await client.fetch(query);
    return types;
  } catch (error) {
    console.error('Error fetching document types:', error);
    return [];
  }
}

// Helper function to fetch documents by type
export async function fetchDocumentsByType(type: string) {
  try {
    const query = `*[_type == "${type}"]`;
    const documents = await client.fetch(query);
    return documents;
  } catch (error) {
    console.error(`Error fetching documents of type "${type}":`, error);
    return [];
  }
}
