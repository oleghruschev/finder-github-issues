import { gql } from 'apollo-boost';

export const GET_ISSUES = gql`
  query($owner: String!, $name: String!, $first: Int!, $after: String $states: [IssueState!]) {
    repository(owner: $owner, name: $name) {
      issues(first: $first, states: $states, after: $after) {
        pageInfo {
          hasNextPage 
        }
        edges {
          cursor
          node {
            id
            number
            title
            comments(first: 100) {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;