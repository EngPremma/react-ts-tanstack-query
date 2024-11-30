import { lazy, Suspense } from 'react';
import { RouteObject, Outlet, Navigate } from 'react-router';

import HomeLayout from 'src/layout/home.layout';

import Loading from 'src/components/loading';

const Home = lazy(() => import('src/pages/home.page'));
const CatsInfiniteQuery = lazy(() => import('src/pages/cats-infinite-query.page'));
const CatsUseQuery = lazy(() => import('src/pages/cats-use-query.page'));
const CreateCat = lazy(() => import('src/pages/create-cat.page'));
const ErrorPage = lazy(() => import('src/pages/error.page'));
const TestPage = lazy(() => import('src/pages/test-page'));

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
        path: '*',
        element: (
          <>
            <Navigate to='/' />
          </>
        ),
      },
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
    ],
  },
];
