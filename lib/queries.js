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

export const GET_ISSUE_DETAIL = gql`
  query($owner: String!, $name: String!, $number: Int!, $countComments: Int!) {
    repository(owner: $owner, name: $name) {
      issue(number: $number) {
        title
        number
        createdAt 
        body
        author {
          login
          avatarUrl
        }
        comments(first: $countComments) {
          pageInfo {
            hasNextPage 
          }
          edges {
            cursor
            node {
              id
              createdAt 
              body
              author {
                login
                avatarUrl
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_COMMENTS = gql`
  query($owner: String!, $name: String!, $number: Int!, $countComments: Int!, $after: String) {
    repository(owner: $owner, name: $name) {
      issue(number: $number) {
        comments(first: $countComments, after: $after) {
          pageInfo {
            hasNextPage 
          }
          edges {
            cursor
            node {
              id
              createdAt 
              body
              author {
                login
                avatarUrl
              }
            }
          }
        }
      }
    }
  }
`;