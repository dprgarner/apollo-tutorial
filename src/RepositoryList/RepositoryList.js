import React from 'react';
import FlipMove from 'react-flip-move';

import FetchMore from '../FetchMore';

import RepositoryItem from './RepositoryItem';
import './styles.css';

function updateQuery(prevResult, { fetchMoreResult }) {
  if (!fetchMoreResult) return prevResult;

  return {
    ...prevResult,
    viewer: {
      ...prevResult.viewer,
      repositories: {
        ...prevResult.viewer.repositories,
        ...fetchMoreResult.viewer.repositories,
        edges: [
          ...prevResult.viewer.repositories.edges,
          ...fetchMoreResult.viewer.repositories.edges,
        ],
      },
    },
  };
}

const RepositoryList = props => (
  <React.Fragment>
    <FlipMove verticalAlignment="bottom" maintainContainerHeight>
      {props.repositories.edges.map(({ node }) => (
        <div key={node.id} className="RepositoryItem">
          <RepositoryItem {...node} />
        </div>
      ))}
    </FlipMove>

    <FetchMore
      loading={props.loadingMore}
      pageInfo={props.repositories.pageInfo}
      updateQuery={updateQuery}
      fetchMore={props.fetchMore}
    />
  </React.Fragment>
);

export default RepositoryList;
