import React from 'react';

import './styles.css';

const Link = props => (
  <a target="_blank" {...props}>
    { props.children }
  </a>
);

const RepositoryItem = props => (
  <div>
    <div className="RepositoryItem-title">
      <h2>
        <Link href={props.url}>{props.name}</Link>
      </h2>

      <h3>
        {`Created at: ${props.createdAt}`}
      </h3>

      <div className="RepositoryItem-title-action">
        {props.stargazers.totalCount} Stars
      </div>
    </div>

    <div className="RepositoryItem-description">
      <div
        className="RepositoryItem-description-info"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: props.descriptionHTML }}
      />

      <div className="RepositoryItem-description-details">
        { props.primaryLanguage && (
          <div>
            <span>
              {`Language: ${props.primaryLanguage.name}`}
            </span>
          </div>
        ) }

        { props.owner && (
          <div>
            <span>
              {'Owner: '}
              <a href={props.owner.url}>{props.owner.login}</a>
            </span>
          </div>
        ) }
      </div>
    </div>
  </div>
);

const RepositoryList = ({ repositories }) => (
  repositories.edges.map(({ node }) => (
    <div key={node.id} className="RepositoryItem">
      <RepositoryItem {...node} />
    </div>
  ))
);

export default RepositoryList;
