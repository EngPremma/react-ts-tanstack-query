import { lazy, Suspense } from 'react';
import { Navigate, Routes, Route } from 'react-router';

import HomeLayout from 'src/layout/home.layout';

import Loader from 'src/components/loader';

const Home = lazy(() => import('src/pages/home.page'));
const CatsInfiniteQuery = lazy(() => import('src/pages/cats-infinite-query.page'));
const CatsUseQuery = lazy(() => import('src/pages/cats-use-query.page'));
const CreateCat = lazy(() => import('src/pages/create-cat.page'));
const TestPage = lazy(() => import('src/pages/test-page'));
const TanStackTablePage = lazy(() => import('src/pages/tan-stack-table/tan-stack-table'));

const routes = [
  { index: true, element: <Home /> },
  {
    path: 'cats-infinite-query',
    element: <CatsInfiniteQuery />,
  },
  {
    path: 'cats-use-query',
    element: <CatsUseQuery />,
  },
  {
    path: 'new-cat',
    element: <CreateCat />,
  },
  {
    path: 'test',
    element: <TestPage />,
  },
  {
    path: 'tan-stack-table',
    element: <TanStackTablePage />,
  },
];

const AppRoute = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path='/' element={<HomeLayout />}>
          {routes.map((route, index) => (
            <Route key={`${index}${route.path}`} {...route} />
          ))}
        </Route>
        <Route path='/*' element={<Navigate to='/' />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoute;
