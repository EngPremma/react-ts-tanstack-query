import React, { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { catApi } from 'src/api';

const CatsInfiniteQuery = () => {
  const [paginate] = useState({ page: 1, limit: 1 });

  const {
    data,
    isLoading,
    isError,
    error,
    fetchStatus,
    isFetching,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['cats', paginate.page, paginate.limit, 'infinite-query'],
    queryFn: ({ pageParam = 1 }) => catApi.allCats(pageParam, paginate.limit),
    staleTime: 5000,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < lastPage.numberOfPage) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  if (isLoading) {
    return (
      <>
        <h4>Loading...</h4>
      </>
    );
  }

  if (isError) {
    return <>{error?.message}</>;
  }

  return (
    <>
      fetch status: {fetchStatus}
      <br />
      is fetching: {isFetching ? <>is refreshing</> : null}
      <button onClick={() => refetch()}>refetch cats</button>
      <br />
      <br />
      <br />
      <h3>CatsInfiniteQuery</h3>
      {data.pages.map((group, index) => {
        return (
          <React.Fragment key={index}>
            {group.cats.map(cat => {
              return (
                <React.Fragment key={cat._id}>
                  <p> {cat.name}</p>
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
      })}
      {isFetchingNextPage ? <p>loading...</p> : null}
      <br />
      <br />
      <br />
      <button id='sf' disabled={!hasNextPage} onClick={() => fetchNextPage()}>
        load more
      </button>
    </>
  );
};

export default CatsInfiniteQuery;
