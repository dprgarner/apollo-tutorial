import React from 'react';
import { Query, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';

import ErrorMessage from '../Error';
import Spinner from '../Spinner';

import IssueItem from './IssueItem';

import './styles.css';

const GET_ISSUES_OF_REPOSITORY = gql`
  query(
    $repositoryOwner: String!
    $repositoryName: String!
    $issueState: IssueState!
  ) {
    repository(name: $repositoryName, owner: $repositoryOwner) {
      issues(first: 5, states: [$issueState]) {
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

const ISSUE_STATES = {
  NONE: 'NONE',
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
};

const TRANSITION_STATE = {
  [ISSUE_STATES.NONE]: ISSUE_STATES.OPEN,
  [ISSUE_STATES.OPEN]: ISSUE_STATES.CLOSED,
  [ISSUE_STATES.CLOSED]: ISSUE_STATES.NONE,
};

const TRANSITION_LABELS = {
  [ISSUE_STATES.NONE]: 'Show Open Issues',
  [ISSUE_STATES.OPEN]: 'Show Closed Issues',
  [ISSUE_STATES.CLOSED]: 'Hide Issues',
};

const isShow = issueState => issueState !== ISSUE_STATES.NONE;

const prefetchIssues = (client, repositoryOwner, repositoryName, issue) => {
  const nextIssue = TRANSITION_STATE[issue];

  if (isShow(nextIssue)) {
    client.query({
      query: GET_ISSUES_OF_REPOSITORY,
      variables: {
        repositoryOwner: repositoryOwner,
        repositoryName: repositoryName,
        issueState: nextIssue,
      },
    });
  }
};

const IssueFilter = props => (
  <ApolloConsumer>
    {client => (
      <button
        type="button"
        onClick={() => props.onChangeIssueState(TRANSITION_STATE[props.issue])}
        onMouseOver={() =>
          prefetchIssues(
            client,
            props.repositoryOwner,
            props.repositoryName,
            props.issue
          )
        }
      >
        {TRANSITION_LABELS[props.issue]}
      </button>
    )}
  </ApolloConsumer>
);

class Issues extends React.Component {
  state = { issue: ISSUE_STATES.NONE };

  handleChangeissue = nextIssue => {
    this.setState({ issue: nextIssue });
  };

  render() {
    return (
      <div className="Issues">
        <IssueFilter
          issue={this.state.issue}
          onChangeIssueState={this.handleChangeissue}
          repositoryOwner={this.props.repositoryOwner}
          repositoryName={this.props.repositoryName}
        />
        {isShow(this.state.issue) && (
          <Query
            query={GET_ISSUES_OF_REPOSITORY}
            variables={{
              repositoryOwner: this.props.repositoryOwner,
              repositoryName: this.props.repositoryName,
              issueState: this.state.issue,
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
              const filteredRepository = {
                issues: {
                  edges: repository.issues.edges.filter(
                    issue => issue.node.state === this.state.issue
                  ),
                },
              };

              if (!filteredRepository.issues.edges.length) {
                return <div className="IssueList">No issues.</div>;
              }

              return <IssueList issues={filteredRepository.issues} />;
            }}
          </Query>
        )}
      </div>
    );
  }
}

const IssueList = props => (
  <div className="IssueList">
    {props.issues.edges.map(({ node }) => (
      <IssueItem key={node.id} issue={node} />
    ))}
  </div>
);

export default Issues;
