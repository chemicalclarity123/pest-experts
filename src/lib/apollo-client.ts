import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import fetch from 'cross-fetch';

export const client = new ApolloClient({
    // We are bypassing the environment variable to ensure Cloudflare builds successfully
    link: new HttpLink({
        uri: 'https://vc8zkv1m.api.sanity.io/v1/graphql/production/default',
        fetch,
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
        query: {
            fetchPolicy: 'no-cache',
        },
    },
});