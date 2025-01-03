import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { catApi } from 'src/api';

const CatsUseQuery = () => {
  const [paginate, setPaginate] = useState({ page: 1, limit: 1 });

  const { data, isLoading, isError, error, fetchStatus, isFetching, refetch } = useQuery({
    queryKey: ['cats', paginate.page, paginate.limit, 'use-query'],
    queryFn: ({ signal }) => catApi.allCats(paginate.page, paginate.limit, signal),
    staleTime: 10000,
    retry: false,
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

  return (
    <>
      fetch status: {fetchStatus}
      <br />
      is fetching: {isFetching ? <>is refreshing</> : null}
      <button onClick={() => refetch()}>refetch cats</button>
      <br />
      <br />
      <br />
      <h3>CatsUseQuery</h3>
      {data?.cats.map(cat => {
        return (
          <React.Fragment key={cat._id}>
            <p>{cat.name}</p>
          </React.Fragment>
        );
      })}
      <br />
      <br />
      <br />
      <button onClick={handlePrevPage} disabled={paginate.page === 1}>
        prev
      </button>
      {paginate.page}
      <button onClick={handleNextPage} disabled={paginate.page === data?.numberOfPage}>
        next
      </button>
    </>
  );
};

export default CatsUseQuery;
