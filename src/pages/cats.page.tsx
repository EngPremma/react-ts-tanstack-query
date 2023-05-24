import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { catApi, userApi } from 'src/api';

const Cats = () => {
	const [paginate, setPaginate] = useState({ page: 1, limit: 10 });

	const { data, isLoading, isError, error, fetchStatus, isFetching, refetch } = useQuery({
		queryKey: ['cats', paginate.page, paginate.limit],
		queryFn: () => catApi.allCats(paginate.page, paginate.limit),
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
		<div>
			fetch status: {fetchStatus}
			<br />
			is fetching: {isFetching ? <>is refreshing</> : null}
			<button onClick={() => refetch()}>refetch cats</button>
			<h3>Cats</h3>
			{data?.cats.map(cat => {
				return (
					<React.Fragment key={cat._id}>
						<p>{cat.name}</p>
					</React.Fragment>
				);
			})}
		</div>
	);
};

export default Cats;
