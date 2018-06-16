import React from 'react';
import { Query } from 'react-apollo';

import ErrorMessage from '../Error';
import Spinner from '../Spinner';
import RepositoryList, { GET_USER_REPOSITORIES } from '../RepositoryList';

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
