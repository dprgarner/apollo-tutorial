import React from 'react';
import FlipMove from 'react-flip-move';

import FetchMore from '../FetchMore';
import Issues from '../Issues';

import RepositoryItem from './RepositoryItem';
import './styles.css';

const getUpdateQuery = entry => (prevResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) return prevResult;

  return {
    ...prevResult,
    [entry]: {
      ...prevResult[entry],
      repositories: {
        ...prevResult[entry].repositories,
        ...fetchMoreResult[entry].repositories,
        edges: [
          ...prevResult[entry].repositories.edges,
          ...fetchMoreResult[entry].repositories.edges,
        ],
      },
    },
  };
};

const RepositoryList = props => (
  <React.Fragment>
    <FlipMove verticalAlignment="bottom" maintainContainerHeight>
      {props.repositories.edges.map(({ node }) => (
        <div key={node.id} className="RepositoryItem">
          <RepositoryItem {...node} />

          <Issues
            repositoryName={node.name}
            repositoryOwner={node.owner.login}
          />
        </div>
      ))}
    </FlipMove>

    <FetchMore
      loading={props.loadingMore}
      pageInfo={props.repositories.pageInfo}
      updateQuery={getUpdateQuery(props.entry)}
      fetchMore={props.fetchMore}
    />
  </React.Fragment>
);

export default RepositoryList;
