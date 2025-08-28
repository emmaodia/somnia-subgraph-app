import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri:
    process.env.NEXT_PUBLIC_SUBGRAPH_URL ||
    // 'https://proxy.somnia.chain.love/subgraphs/name/somnia-testnet/SomFlip',
    'https://api.subgraph.somnia.network/api/public/07eee000-3aca-430d-aee7-e2a66b63b33f/subgraphs/somFlip/FlipResults/gn',
  cache: new InMemoryCache(),
});

export default client;
