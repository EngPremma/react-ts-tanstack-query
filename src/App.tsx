import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { env } from 'src/config';
import { catApi, userApi } from 'src/api';

axios.defaults.baseURL = env.api;

const App = () => {
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
	// const userQuery = useQuery({
	// 	queryKey: ['users'],
	// 	queryFn: userApi.users,
	// });

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
			<h3>Cats</h3>
			{data?.cats.map(cat => {
				return (
					<React.Fragment key={cat._id}>
						<p>{cat.name}</p>
					</React.Fragment>
				);
			})}
			{/* <h3>Users</h3> */}
			{/* {userQuery?.data?.map(user => {
				return (
					<React.Fragment key={user.id}>
						<p>{user.name}</p>
					</React.Fragment>
				);
			})} */}
		</>
	);
};

// type Todo = { id: number; name: string; done: boolean }

// // ✅ typing the return value of fetchTodo
// const fetchTodo = async (id: number): Promise<Todo> => {
//   const response = await axios.get(`/todos/${id}`)
//   return response.data
// }

// // ✅ no generics on useQuery
// const query = useQuery({
//   queryKey: ['todos', id],
//   queryFn: () => fetchTodo(id),
// })

// // 🙌 types are still properly inferred
// query.data
// //    ^?(property) data: Todo | undefined

export default App;
