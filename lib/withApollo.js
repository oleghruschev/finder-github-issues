import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';

const token = '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';

export default withApollo(
  ({ ctx, headers, initialState }) =>
    new ApolloClient({
      uri: 'https://api.github.com/graphql',
      cache: new InMemoryCache().restore(initialState || {}),
      getDataFromTree: 'ssr',
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
);
