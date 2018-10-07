import React from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Spinner from '../Spinner';
import ErrorMessage from '../Error';
import RepositoryList, { REPOSITORY_FRAGMENT } from '../RepositoryList';

const GET_REPOSITORIES_OF_ORGANIZATION = gql`
  query($organizationName: String!, $cursor: String) {
    organization(login: $organizationName) {
      repositories(first: 5, after: $cursor) {
        edges {
          node {
            ...repository
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }

  ${REPOSITORY_FRAGMENT}
`;

const Organization = props => (
  <Query
    query={GET_REPOSITORIES_OF_ORGANIZATION}
    variables={{
      organizationName: props.name,
    }}
    skip={!props.name}
  >
    {({ data, loading, error, fetchMore }) => {
      if (error) {
        return <ErrorMessage error={error} />;
      }

      const { organization } = data;
      if (loading && !organization) {
        return <Spinner />;
      }

      return (
        <RepositoryList
          repositories={organization.repositories}
          fetchMore={fetchMore}
          loadingMore={loading && organization}
          entry="organization"
        />
      );
    }}
  </Query>
);

export default Organization;
