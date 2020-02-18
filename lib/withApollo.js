import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';

const token = '33896f0065219e6bea45fe90c68db91c506c0b5b';

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
