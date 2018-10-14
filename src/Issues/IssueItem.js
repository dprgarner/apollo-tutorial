import React from 'react';
import './styles.css';

const IssueItem = props => (
  <div className="IssueItem">
    <div className="IssueItem-content">
      <h3>
        <a href={props.issue.url}>{props.issue.title}</a>
      </h3>

      <div dangerouslySetInnerHTML={{ __html: props.issue.bodyHTML }} />
    </div>
  </div>
);

export default IssueItem;
