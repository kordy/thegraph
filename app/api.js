const axios = require('axios').default;

async function getSubgraphs() {
  return await axios.post('https://api.thegraph.com/explorer/graphql', {
    operationName: "communitySubgraphs",
    query: `
        query communitySubgraphs($first: Int!, $skip: Int!, $searchText: String, $order: CommunitySubgraphsOrder, $filter: CommunitySubgraphsFilter) {
          communitySubgraphs(first: $first, skip: $skip, searchText: $searchText, order: $order, filter: $filter) {
            subgraphs {
              id
              name
              displayName
              image
              draft
              featured
              subtitle
              createdAt
              deployedAt
              account {
                id
                name
                displayName
                accountType
                role
                __typename
              }
              __typename
            }
            totalCount
            __typename
         }
        }`,
    variables: {first: 5, skip: 0, searchText: "", order: "RecentlyUpdated", filter: "Deployed"},
  })
}

module.exports = {
  getSubgraphs: getSubgraphs
}