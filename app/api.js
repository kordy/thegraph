const axios = require('axios').default;

const getSubgraphs = () => axios.post('https://api.thegraph.com/explorer/graphql', {
    operationName: "communitySubgraphs",
    query: `
        query communitySubgraphs($first: Int!, $skip: Int!, $searchText: String, $order: CommunitySubgraphsOrder, $filter: CommunitySubgraphsFilter) {
          communitySubgraphs(first: $first, skip: $skip, searchText: $searchText, order: $order, filter: $filter) {
            subgraphs {
              id
              name
              displayName
              draft
              featured
              createdAt
              deployedAt
              __typename
            }
            totalCount
            __typename
         }
        }`,
    variables: {first: 5, skip: 0, searchText: "", order: "RecentlyUpdated", filter: "Deployed"},
  })


const getSubgraphsCount = () => axios.post('https://api.thegraph.com/explorer/graphql', {
  operationName: "communitySubgraphs",
  query: `
        query communitySubgraphs($first: Int!, $skip: Int!, $searchText: String, $order: CommunitySubgraphsOrder, $filter: CommunitySubgraphsFilter) {
          communitySubgraphs(first: $first, skip: $skip, searchText: $searchText, order: $order, filter: $filter) {
            totalCount
            __typename
         }
        }`,
  variables: {first: 0, skip: 0, searchText: "", order: "RecentlyUpdated", filter: "Deployed"},
})

const getGRTPrice = () => axios.get('https://www.binance.com/api/v3/ticker/price', {
  params: {
    symbol: 'GRTUSDT'
  }
});

module.exports = {
  getSubgraphs: getSubgraphs,
  getSubgraphsCount: getSubgraphsCount,
  getGRTPrice: getGRTPrice
}