import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { GET_USER_REPOSITORIES, REPOSITORY_FRAGMENT } from './fragments';

const Link = props => (
  <a target="_blank" {...props}>
    {props.children}
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

function updateRepositoryFragment(client, id, change) {
  const repository = client.readFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
  });

  const totalCount = repository.stargazers.totalCount + change;

  client.writeFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
    data: {
      ...repository,
      stargazers: {
        ...repository.stargazers,
        totalCount,
      },
    },
  });
}

function sortRepositoryConnectionQuery(client, id) {
  const connectionQuery = client.readQuery({
    query: GET_USER_REPOSITORIES,
  });
  if (!connectionQuery.viewer.repositories.edges) return;

  let { edges } = connectionQuery.viewer.repositories;
  edges = [...edges].sort((edge1, edge2) => {
    if (!edge1 || !edge2 || !edge1.node || !edge2.node) return 0;

    return edge2.node.stargazers.totalCount - edge1.node.stargazers.totalCount;
  });

  client.writeQuery({
    query: GET_USER_REPOSITORIES,
    data: {
      ...connectionQuery,
      viewer: {
        ...connectionQuery.viewer,
        repositories: {
          ...connectionQuery.viewer.repositories,
          edges,
        },
      },
    },
  });
}

function updateAddStar(
  client,
  {
    data: {
      addStar: {
        starrable: { id },
      },
    },
  }
) {
  updateRepositoryFragment(client, id, +1);
  sortRepositoryConnectionQuery(client, id);
}

function updateRemoveStar(
  client,
  {
    data: {
      removeStar: {
        starrable: { id },
      },
    },
  }
) {
  updateRepositoryFragment(client, id, -1);
  sortRepositoryConnectionQuery(client, id);
}

const RepositoryItem = props => (
  <div>
    <div className="RepositoryItem-title">
      <h2>
        <Link href={props.url}>{props.name}</Link>
      </h2>

      <h3>{`Created at: ${props.createdAt}`}</h3>

      <div>
        {props.viewerHasStarred ? (
          <Mutation
            mutation={UNSTAR_REPOSITORY}
            variables={{ id: props.id }}
            update={updateRemoveStar}
          >
            {removeStar => (
              <button
                className="RepositoryItem-title-action"
                onClick={removeStar}
              >
                {`${props.stargazers.totalCount} Stars (Unstar)`}
              </button>
            )}
          </Mutation>
        ) : (
          <Mutation
            mutation={STAR_REPOSITORY}
            variables={{ id: props.id }}
            update={updateAddStar}
          >
            {addStar => (
              <button className="RepositoryItem-title-action" onClick={addStar}>
                {`${props.stargazers.totalCount} Stars (Star)`}
              </button>
            )}
          </Mutation>
        )}
      </div>
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
  </div>
);

export default RepositoryItem;
