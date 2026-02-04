import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
    // We are bypassing the environment variable to ensure Cloudflare builds successfully
    uri: 'https://vc8zkv1m.api.sanity.io/v1/graphql/production/default',
    cache: new InMemoryCache(),
});