import React from 'react';
import FlipMove from 'react-flip-move';

import RepositoryItem from './RepositoryItem';
import './styles.css';

const RepositoryList = ({ repositories }) => (
  <FlipMove verticalAlignment="bottom" maintainContainerHeight>
    {repositories.edges.map(({ node }) => (
      <div key={node.id} className="RepositoryItem">
        <RepositoryItem {...node} />
      </div>
    ))}
  </FlipMove>
);

export default RepositoryList;
