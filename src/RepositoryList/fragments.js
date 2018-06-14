import gql from 'graphql-tag';

const REPOSITORY_FRAGMENT = gql`
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

export default REPOSITORY_FRAGMENT;
