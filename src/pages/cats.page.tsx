import React, { useState } from 'react';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

import { catApi } from 'src/api';

const Cats = () => {
  const [paginate, setPaginate] = useState({ page: 1, limit: 1 });

  // const { data, isLoading, isError, error, fetchStatus, isFetching, refetch } = useQuery({
  // 	queryKey: ['cats', paginate.page, paginate.limit],
  // 	queryFn: () => catApi.allCats(paginate.page, paginate.limit),
  // 	staleTime: 10000,
  // 	retry: false,
  // });

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
    queryKey: ['cats', paginate.page, paginate.limit],
    queryFn: ({ pageParam = 1 }) => catApi.allCats(pageParam, paginate.limit),
    staleTime: 10000,
    getNextPageParam: (lastPage, pages) => {
      console.log('pages :>> ', pages, lastPage.numberOfPage);
      if (pages.length < lastPage.numberOfPage) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  const handleNextPage = () => {
    setPaginate(prev => ({ ...prev, page: prev.page + 1 }));
  };

  const handlePrevPage = () => {
    setPaginate(prev => ({ ...prev, page: prev.page - 1 }));
  };
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

  console.log('hasNextPage :>> ', hasNextPage);
  return (
    <div>
      fetch status: {fetchStatus}
      <br />
      is fetching: {isFetching ? <>is refreshing</> : null}
      <button onClick={() => refetch()}>refetch cats</button>
      <br />
      <br />
      <br />
      <h3>Cats</h3>
      {/* {data?.cats.map(cat => {
				return (
					<React.Fragment key={cat._id}>
						<p>{cat.name}</p>
					</React.Fragment>
				);
			})} */}
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
      {/* <button onClick={handlePrevPage} disabled={paginate.page === 1}>
				prev
			</button>
			{paginate.page}
			<button onClick={handleNextPage} disabled={paginate.page === data.numberOfPage}>
				next
			</button> */}
    </div>
  );
};

export default Cats;
