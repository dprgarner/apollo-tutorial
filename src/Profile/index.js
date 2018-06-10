import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import ErrorMessage from '../Error';
import Spinner from '../Spinner';
import RepositoryList from '../RepositoryList';

const GET_USER_REPOSITORIES = gql`
  fragment Repository on Repository {
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

  query {
    viewer {
      repositories(first: 5, orderBy: { direction: DESC, field: STARGAZERS }) {
        edges {
          node {
            ...Repository
          }
        }
      }
    }
  }
`;

const Profile = () => (
  <Query query={GET_USER_REPOSITORIES}>
    {({ data, loading, error }) => {
      if (error) {
        return <ErrorMessage error={error} />;
      }

      const { viewer } = data;

      if (loading || !viewer) {
        return <Spinner />;
      }

      return <RepositoryList repositories={viewer.repositories} />;
    }}
  </Query>
);

export default Profile;
