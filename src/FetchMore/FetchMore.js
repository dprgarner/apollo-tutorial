import React from 'react';

import Spinner from '../Spinner';

export default props => (
  <React.Fragment>
    {props.loading && <Spinner />}
    {props.pageInfo.hasNextPage &&
      !props.loadingMore && (
        <button
          onClick={() =>
            props.fetchMore({
              variables: {
                cursor: props.pageInfo.endCursor,
              },
              updateQuery: props.updateQuery,
            })
          }
        >
          {'Fetch more'}
        </button>
      )}
  </React.Fragment>
);
