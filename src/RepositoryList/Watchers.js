import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { REPOSITORY_FRAGMENT } from './fragments';

const SET_WATCH_REPO = gql`
  mutation($id: ID!, $state: SubscriptionState!) {
    updateSubscription(input: { subscribableId: $id, state: $state }) {
      subscribable {
        id
        viewerSubscription
      }
    }
  }
`;

const isWatching = viewerSubscription => viewerSubscription === 'SUBSCRIBED';

const subscriptionToText = state =>
  ({
    SUBSCRIBED: 'subscribed',
    UNSUBSCRIBED: 'unsubscribed',
    IGNORED: 'ignored',
  }[state]);

function updateWatchers(
  client,
  {
    data: {
      updateSubscription: {
        subscribable: { id, viewerSubscription },
      },
    },
  }
) {
  const repository = client.readFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
  });

  const totalCount =
    repository.watchers.totalCount + (isWatching(viewerSubscription) ? 1 : -1);

  client.writeFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
    data: {
      ...repository,
      watchers: {
        ...repository.watchers,
        totalCount,
      },
    },
  });
}

export default props => (
  <div>
    {`${props.watchers.totalCount} watchers (${subscriptionToText(
      props.viewerSubscription
    )})`}
    <Mutation
      mutation={SET_WATCH_REPO}
      variables={{
        id: props.id,
        state: isWatching(props.viewerSubscription)
          ? 'UNSUBSCRIBED'
          : 'SUBSCRIBED',
      }}
      optimisticResponse={{
        updateSubscription: {
          __typename: 'Mutation',
          subscribable: {
            __typename: 'Repository',
            id: props.id,
            viewerSubscription: isWatching(props.viewerSubscription)
              ? 'UNSUBSCRIBED'
              : 'SUBSCRIBED',
          },
        },
      }}
      update={updateWatchers}
    >
      {setWatchRepo => (
        <button onClick={setWatchRepo}>
          {isWatching(props.viewerSubscription) ? 'Unwatch' : 'Watch'}
        </button>
      )}
    </Mutation>
  </div>
);
