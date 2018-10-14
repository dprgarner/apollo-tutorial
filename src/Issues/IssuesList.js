import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import ErrorMessage from '../Error';
import Spinner from '../Spinner';

import IssueItem from './IssueItem';

import './styles.css';

const GET_ISSUES_OF_REPOSITORY = gql`
  query($repositoryOwner: String!, $repositoryName: String!) {
    repository(name: $repositoryName, owner: $repositoryOwner) {
      issues(first: 5) {
        edges {
          node {
            id
            number
            state
            title
            url
            bodyHTML
          }
        }
      }
    }
  }
`;

const Issues = props => (
  <div className="Issues">
    <Query
      query={GET_ISSUES_OF_REPOSITORY}
      variables={{
        repositoryOwner: props.repositoryOwner,
        repositoryName: props.repositoryName,
      }}
    >
      {({ data, loading, error }) => {
        if (error) {
          return <ErrorMessage error={error} />;
        }

        const { repository } = data;
        if (loading && !repository) {
          return <Spinner />;
        }

        if (!repository.issues.edges.length) {
          return <div className="IssueList">No issues.</div>;
        }

        return <IssueList issues={repository.issues} />;
      }}
    </Query>
  </div>
);

const IssueList = props => (
  <div className="IssueList">
    {props.issues.edges.map(({ node }) => (
      <IssueItem key={node.id} issue={node} />
    ))}
  </div>
);

export default Issues;
