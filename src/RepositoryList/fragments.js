import gql from 'graphql-tag';

export const REPOSITORY_FRAGMENT = gql`
  fragment repository on Repository {
    id
    name
    descriptionHTML
    createdAt
    url

    primaryLanguage {
      name
    }

    owner {
      login
      url
    }

    stargazers {
      totalCount
    }

    watchers {
      totalCount
    }

    viewerSubscription

    viewerHasStarred
  }
`;

export const GET_USER_REPOSITORIES = gql`
  query {
    viewer {
      repositories(first: 5, orderBy: { direction: DESC, field: STARGAZERS }) {
        edges {
          node {
            ...repository
          }
        }
      }
    }
  }

  ${REPOSITORY_FRAGMENT}
`;
