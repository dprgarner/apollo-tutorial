import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import ErrorMessage from '../Error';
import Spinner from '../Spinner';
import RepositoryList, { REPOSITORY_FRAGMENT } from '../RepositoryList';

const GET_USER_REPOSITORIES = gql`
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
