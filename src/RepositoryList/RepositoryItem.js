import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const Link = props => (
  <a target="_blank" {...props}>
    { props.children }
  </a>
);

const STAR_REPOSITORY = gql`
  mutation($id: ID!) {
    addStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

const UNSTAR_REPOSITORY = gql`
  mutation($id: ID!) {
    removeStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

const RepositoryItem = props => (
  <div>
    <div className="RepositoryItem-title">
      <h2>
        <Link href={props.url}>{props.name}</Link>
      </h2>

      <h3>
        {`Created at: ${props.createdAt}`}
      </h3>

      <div>
        <Mutation
          mutation={
            props.viewerHasStarred ? UNSTAR_REPOSITORY : STAR_REPOSITORY
          }
          variables={{ id: props.id }}
        >
          { (changeStar) => (
            <button
              className="RepositoryItem-title-action"
              onClick={changeStar}
            >
              {props.stargazers.totalCount} Stars
            </button>
          ) }
        </Mutation>
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

export default RepositoryItem;
