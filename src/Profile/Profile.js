import React from 'react';
import { Query } from 'react-apollo';

import ErrorMessage from '../Error';
import Spinner from '../Spinner';
import RepositoryList, { GET_USER_REPOSITORIES } from '../RepositoryList';

const Profile = () => (
  <Query query={GET_USER_REPOSITORIES} notifyOnNetworkStatusChange={true}>
    {({ data, loading, error, fetchMore }) => {
      if (error) {
        return <ErrorMessage error={error} />;
      }

      if (loading && !data.viewer) {
        return <Spinner />;
      }

      return (
        <RepositoryList
          repositories={data.viewer.repositories}
          fetchMore={fetchMore}
          loadingMore={loading && data.viewer}
        />
      );
    }}
  </Query>
);

export default Profile;
