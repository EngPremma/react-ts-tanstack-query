import axios from 'axios';
import { useRoutes } from 'react-router-dom';

import { ReactQueryProvider } from 'src/contexts';
import AxiosInterceptor from 'src/libs/axios/axios-interceptor.tsx';
import { routerObject } from 'src/router/router';
import { env } from 'src/config';

axios.defaults.baseURL = env.api;

const App = () => {
  const routes = useRoutes(routerObject);
  return (
    <ReactQueryProvider>
      <AxiosInterceptor>{routes}</AxiosInterceptor>
    </ReactQueryProvider>
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
