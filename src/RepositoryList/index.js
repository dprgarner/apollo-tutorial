import React from 'react';

import RepositoryItem from './RepositoryItem';
import './styles.css';

const RepositoryList = ({ repositories }) => (
  repositories.edges.map(({ node }) => (
    <div key={node.id} className="RepositoryItem">
      <RepositoryItem {...node} />
    </div>
  ))
);

export default RepositoryList;
