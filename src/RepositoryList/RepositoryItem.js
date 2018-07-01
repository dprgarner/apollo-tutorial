import React from 'react';

import Stars from './Stars';
import Watchers from './Watchers';

const Link = props => (
  <a target="_blank" {...props}>
    {props.children}
  </a>
);

const RepositoryItem = props => (
  <div>
    <div className="RepositoryItem-title">
      <h2>
        <Link href={props.url}>{props.name}</Link>
      </h2>

      <h3>{`Created at: ${props.createdAt}`}</h3>
    </div>

    <div className="RepositoryItem-description">
      <div
        className="RepositoryItem-description-info"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: props.descriptionHTML }}
      />

      <div className="RepositoryItem-description-details">
        {props.primaryLanguage && (
          <div>
            <span>{`Language: ${props.primaryLanguage.name}`}</span>
          </div>
        )}

        {props.owner && (
          <div>
            <span>
              {'Owner: '}
              <a href={props.owner.url}>{props.owner.login}</a>
            </span>
          </div>
        )}
      </div>
    </div>

    <div className="RepositoryItem-buttons">
      <Stars
        id={props.id}
        stargazers={props.stargazers}
        viewerHasStarred={props.viewerHasStarred}
      />

      <Watchers
        id={props.id}
        viewerSubscription={props.viewerSubscription}
        watchers={props.watchers}
      />
    </div>
  </div>
);

export default RepositoryItem;
