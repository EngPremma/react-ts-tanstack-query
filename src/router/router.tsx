import { lazy, Suspense } from 'react';
import { Outlet, Navigate, RouteObject } from 'react-router-dom';

import AuthLayout from 'src/layout/auth-layout';
import DashboardLayout from 'src/layout/dashboard-layout';
import { AuthContextProvider } from 'src/contexts';

import Loading from 'src/components/loading';

const LoginPage = lazy(() => import('src/pages/auth/login-page'));
const Home = lazy(() => import('src/pages/home.page'));
const CatsInfiniteQuery = lazy(() => import('src/pages/cats-infinite-query.page'));
const CatsUseQuery = lazy(() => import('src/pages/cats-use-query.page'));
const CreateCat = lazy(() => import('src/pages/create-cat.page'));
const ErrorPage = lazy(() => import('src/pages/error.page'));

export const routerObject: RouteObject[] = [
  {
    path: '/',
    element: (
      <AuthLayout>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </AuthLayout>
    ),
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <AuthContextProvider>
        <DashboardLayout>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthContextProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/dashboard/cats-infinite-query',
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
    ],
  },
  {
    path: '*',
    element: <Navigate to='/dashboard' />,
  },
];
