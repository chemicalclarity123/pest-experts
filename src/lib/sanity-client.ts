import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: 'vc8zkv1m',
  dataset: 'production',
  apiVersion: '2026-02-04',
  // CDN activado — cachea queries de lectura en el edge global de Sanity (~50ms vs ~1500ms)
  useCdn: true,
});

// Image URL builder
const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source).auto('format').fit('max');
}

export { builder as imageBuilder };

/**
 * Normalizes slugs by removing non-breaking spaces and trimming.
 * Defensive measure against messy data in Sanity.
 */
export function normalizeSlug(slug: string | { current: string }): string {
  if (!slug) return '';
  const s = typeof slug === 'string' ? slug : slug.current;
  return s.replace(/\u00A0/g, ' ').trim().replace(/\s+/g, '-').toLowerCase();
}

// GROQ Fragments for reuse
const SEO_FRAGMENT = `
  seo{
    "metaTitle": coalesce(metaTitle, pageTitle),
    "metaDescription": coalesce(metaDesc, metaDescription),
    "shareImage": coalesce(shareImage.asset->url, ogImage.asset->url),
    canonicalUrl,
    keywords
  }
`;

const LOCAL_CONTEXT_FRAGMENT = `
  localContext{
    serviceType,
    pests,
    areas,
    faqs[]{
      question,
      answer
    }
  }
`;

const TESTIMONIALS_FRAGMENT = `
  testimonials{
    title,
    reviews[]{
      customerName,
      rating,
      reviewText,
      location,
      avatar
    }
  }
`;

const GOOGLE_REVIEWS_FRAGMENT = `
  "googleReviews": *[_type == "googleReview" && isFeatured == true] | order(publishDate desc) {
    author,
    authorPhoto,
    rating,
    text,
    relativeTime,
    publishDate,
    location
  }
`;

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
      googleBusiness,
      serviceAreas,
      serviceArea,
      ${TESTIMONIALS_FRAGMENT},
      ${GOOGLE_REVIEWS_FRAGMENT}
    }`;
    const settings = await client.fetch(query);
    return settings;
  } catch (error) {
    console.error('Error fetching company settings:', error);
    return null;
  }
}

// Fetch all service areas
export async function fetchServiceAreas() {
  try {
    const query = `*[_type == "serviceArea"] | order(title asc){
      title,
      "slug": slug.current,
      ${SEO_FRAGMENT},
      isHub,
      nearbyAreas[]->{
        title,
        "slug": slug.current
      },
      selectedReviews[]->{
        author,
        rating,
        text,
        relativeTime,
        publishDate,
        authorPhoto,
        location
      }
    }`;
    const areas = await client.fetch(query);
    return areas.map((area: any) => ({
      ...area,
      slug: normalizeSlug(area.slug)
    }));
  } catch (error) {
    console.error('Error fetching service areas:', error);
    return [];
  }
}

// Obtener un service area individual con todos los campos ricos
export async function fetchServiceAreaBySlug(slug: string) {
  try {
    const query = `*[_type == "serviceArea" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      image,
      description,
      heroSubheading,
      introHeadline,
      introShortDescription,
      introBodyText,
      content,
      localPests[]{
        name,
        description,
        icon
      },
      whyLocal{
        title,
        body
      },
      serviceHighlights[]{
        icon,
        title,
        description
      },
      ctaHeading,
      ctaDescription,
      isHub,
      nearbyAreas[]->{
        title,
        "slug": slug.current,
        image,
        description
      },
      selectedReviews[]->{
        author,
        rating,
        text,
        relativeTime,
        publishDate,
        authorPhoto,
        location
      },
      ${SEO_FRAGMENT}
    }`;
    let area = await client.fetch(query, { slug });

    if (!area) {
      const slugsQuery = `*[_type == "serviceArea"]{ "slug": slug.current }`;
      const allSlugs = await client.fetch(slugsQuery);
      const matchingDirty = allSlugs.find((s: any) => normalizeSlug(s.slug) === slug);

      if (matchingDirty?.slug) {
        console.warn(`[WARN] Found dirty serviceArea slug in Sanity matching "${slug}": "${matchingDirty.slug}". Using fallback.`);
        area = await client.fetch(query, { slug: matchingDirty.slug });
      }
    }

    return area;
  } catch (error) {
    console.error(`Error fetching service area "${slug}":`, error);
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
      image,
      features,
      ${SEO_FRAGMENT},
      ${LOCAL_CONTEXT_FRAGMENT},
      pricing
    }`;
    const services = await client.fetch(query);
    return services.map((service: any) => ({
      ...service,
      slug: normalizeSlug(service.slug)
    }));
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
      image,
      features,
      hero{
        subheading,
        ctaText
      },
      overviewHeading,
      overview,
      signsOfInfestation,
      treatmentProcess[]{
        stepTitle,
        stepDescription
      },
      benefits,
      customTestimonials{
        title,
        reviews[]{
          customerName,
          rating,
          reviewText,
          location,
          avatar
        }
      },
      ${SEO_FRAGMENT},
      ${LOCAL_CONTEXT_FRAGMENT},
      pricing
    }`;
    let service = await client.fetch(query, { slug });

    // Fallback for dirty slugs (e.g. ones that accidently contain \u00A0 spaces in Sanity)
    if (!service) {
      const slugsQuery = `*[_type == "service"]{ "slug": slug.current }`;
      const allSlugs = await client.fetch(slugsQuery);
      const matchingDirty = allSlugs.find((s: any) => normalizeSlug(s.slug) === slug);

      if (matchingDirty?.slug) {
        console.warn(`[WARN] Found dirty slug in Sanity matching "${slug}": "${matchingDirty.slug}". Using fallback.`);
        service = await client.fetch(query, { slug: matchingDirty.slug });
      }
    }

    return service;
  } catch (error) {
    console.error(`Error fetching service with slug "${slug}":`, error);
    return null;
  }
}

// Fetch contact page content (singleton)
export async function fetchContactPage() {
  try {
    const query = `*[_type == "contactPage"][0]{
      hero{
        heading,
        subheading,
        "backgroundImage": backgroundImage.asset->url
      },
      content,
      ${SEO_FRAGMENT}
    }`;
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error('Error fetching contact page:', error);
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
      ${TESTIMONIALS_FRAGMENT},
      ${GOOGLE_REVIEWS_FRAGMENT},
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
      },
      ${SEO_FRAGMENT}
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

// Blog post listing — ordered by featured first then publishedAt desc
export async function fetchBlogPosts() {
  try {
    const query = `*[_type == "blogPost"] | order(featured desc, publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      featuredImage,
      category,
      tags,
      readingTime,
      author,
      publishedAt,
      featured
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Single blog post by slug with full content and resolved service references
export async function fetchBlogPostBySlug(slug: string) {
  try {
    const normalized = normalizeSlug(slug);
    const query = `*[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      featuredImage,
      content,
      author,
      publishedAt,
      updatedAt,
      category,
      tags,
      readingTime,
      featured,
      seo,
      ctaOverride,
      "relatedServices": relatedServices[]-> {
        _id,
        title,
        "slug": slug.current,
        description,
        image,
        price
      }
    }`;
    let post = await client.fetch(query, { slug: normalized });

    if (!post) {
      const slugsQuery = `*[_type == "blogPost"]{ "slug": slug.current }`;
      const allSlugs = await client.fetch(slugsQuery);
      const matchingDirty = allSlugs.find((s: any) => normalizeSlug(s.slug) === slug);

      if (matchingDirty?.slug) {
        console.warn(`[WARN] Found dirty blogPost slug in Sanity matching "${slug}": "${matchingDirty.slug}". Using fallback.`);
        post = await client.fetch(query, { slug: matchingDirty.slug });
      }
    }

    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

