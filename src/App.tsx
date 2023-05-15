import { env } from './config';
import { ReactQueryProvider } from './contexts';

const App = () => {
	return (
		<>
			<ReactQueryProvider>
				hello
				{env.api}
				{env.mode}
			</ReactQueryProvider>
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
