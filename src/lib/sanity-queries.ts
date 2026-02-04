import { client } from './apollo-client';
import { gql } from '@apollo/client';

// Introspection query to explore available types
export const INTROSPECTION_QUERY = gql`
  query IntrospectionQuery {
    __schema {
      queryType {
        name
        fields {
          name
          description
        }
      }
      types {
        name
        kind
        description
      }
    }
  }
`;

// Query to get all services
export const GET_ALL_SERVICES = gql`
  query GetAllServices {
    allService {
      _id
      _type
      title
      slug {
        current
      }
      description
      serviceType
      areaServed
    }
  }
`;

// Query to get a single service by slug
export const GET_SERVICE_BY_SLUG = gql`
  query GetServiceBySlug($slug: String!) {
    allService(where: { slug: { current: { eq: $slug } } }) {
      _id
      _type
      title
      slug {
        current
      }
      description
      serviceType
      areaServed
      content
    }
  }
`;

// Helper function to fetch all services
export async function fetchAllServices() {
    try {
        const { data } = await client.query({
            query: GET_ALL_SERVICES,
        });
        return data.allService || [];
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
}

// Helper function to fetch a service by slug
export async function fetchServiceBySlug(slug: string) {
    try {
        const { data } = await client.query({
            query: GET_SERVICE_BY_SLUG,
            variables: { slug },
        });
        return data.allService?.[0] || null;
    } catch (error) {
        console.error(`Error fetching service with slug "${slug}":`, error);
        return null;
    }
}

// Helper function to explore schema
export async function exploreSchema() {
    try {
        const { data } = await client.query({
            query: INTROSPECTION_QUERY,
        });
        return data.__schema;
    } catch (error) {
        console.error('Error exploring schema:', error);
        return null;
    }
}
