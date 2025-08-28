import { gql } from '@apollo/client';

export const GET_FLIP_RESULTS = gql`
  query GetFlipResults(
    $first: Int!
    $skip: Int!
    $orderBy: String!
    $orderDirection: String!
  ) {
    flipResults(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      id
      player
      betAmount
      choice
      result
      payout
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;

export const GET_RECENT_FLIPS = gql`
  query GetRecentFlips($first: Int!) {
    flipResults(first: $first, orderBy: blockTimestamp, orderDirection: desc) {
      id
      player
      betAmount
      choice
      result
      payout
      blockTimestamp
      transactionHash
    }
  }
`;
// import { gql } from '@apollo/client';

// // Query for fetching flip results with pagination
// export const GET_FLIP_RESULTS = gql`
//   query GetFlipResults(
//     $first: Int!
//     $skip: Int!
//     $orderBy: String!
//     $orderDirection: String!
//   ) {
//     flipResults(
//       first: $first
//       skip: $skip
//       orderBy: $orderBy
//       orderDirection: $orderDirection
//     ) {
//       id
//       player
//       betAmount
//       choice
//       result
//       payout
//       blockNumber
//       blockTimestamp
//       transactionHash
//     }
//   }
// `;

// // Query for recent flips
// export const GET_RECENT_FLIPS = gql`
//   query GetRecentFlips($first: Int!) {
//     flipResults(first: $first, orderBy: blockTimestamp, orderDirection: desc) {
//       id
//       player
//       betAmount
//       choice
//       result
//       payout
//       blockTimestamp
//       transactionHash
//     }
//   }
// `;

// // Query for player statistics
// export const GET_PLAYER_FLIPS = gql`
//   query GetPlayerFlips($player: String!, $first: Int!, $skip: Int!) {
//     flipResults(
//       where: { player: $player }
//       first: $first
//       skip: $skip
//       orderBy: blockTimestamp
//       orderDirection: desc
//     ) {
//       id
//       betAmount
//       choice
//       result
//       payout
//       blockTimestamp
//       transactionHash
//     }
//   }
// `;

// // Query for big wins
// export const GET_BIG_WINS = gql`
//   query GetBigWins($minPayout: String!, $first: Int!) {
//     flipResults(
//       where: { payout_gte: $minPayout }
//       first: $first
//       orderBy: payout
//       orderDirection: desc
//     ) {
//       id
//       player
//       betAmount
//       choice
//       result
//       payout
//       blockTimestamp
//       transactionHash
//     }
//   }
// `;
