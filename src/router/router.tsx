import { lazy, Suspense } from 'react';
import { RouteObject, Outlet } from 'react-router-dom';

import HomeLayout from 'src/layout/home.layout';

import Loading from 'src/components/loading';

const Home = lazy(() => import('src/pages/home.page'));
const CatsInfiniteQuery = lazy(() => import('src/pages/cats-infinite-query.page'));
const CatsUseQuery = lazy(() => import('src/pages/cats-use-query.page'));
const ErrorPage = lazy(() => import('src/pages/error.page'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <HomeLayout>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </HomeLayout>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'cats-infinite-query',
        element: <CatsInfiniteQuery />,
      },
      {
        path: 'cats-use-query',
        element: <CatsUseQuery />,
      },
    ],
  },
];
