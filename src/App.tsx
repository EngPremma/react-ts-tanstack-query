import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { env } from './config';
import { catApi, userApi } from './api';

axios.defaults.baseURL = env.api;

const App = () => {
	const { data, isLoading, isError, error, fetchStatus, isFetching, refetch } = useQuery({
		queryKey: ['cats'],
		queryFn: catApi.allCats,
		staleTime: 10000,
	});

	const userQuery = useQuery({
		queryKey: ['users'],
		queryFn: userApi.users,
	});

	if (isLoading || userQuery.isLoading) {
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
			<h3>Users</h3>
			{userQuery?.data?.map(user => {
				return (
					<React.Fragment key={user.id}>
						<p>{user.name}</p>
					</React.Fragment>
				);
			})}
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
