import { lazy, Suspense } from 'react';
import { Navigate, Routes, Route } from 'react-router';

import AuthLayout from 'src/layout/auth-layout';
import DashboardLayout from 'src/layout/dashboard-layout';
// import { AuthProvider } from 'src/context-providers';

import Loader from 'src/components/loading';
import AuthWrapper from 'src/components/auth-wrapper';

const LoginPage = lazy(() => import('src/pages/auth/login-page'));
const Home = lazy(() => import('src/pages/home.page'));
const CatsInfiniteQuery = lazy(() => import('src/pages/cats-infinite-query.page'));
const CatsUseQuery = lazy(() => import('src/pages/cats-use-query.page'));
const CreateCat = lazy(() => import('src/pages/create-cat.page'));
const TestPage = lazy(() => import('src/pages/test-page'));
const TanStackTablePage = lazy(() => import('src/pages/tan-stack-table/tan-stack-table'));

const privateRoutes = [
  { index: true, element: <Home /> },
  { path: 'cats-infinite-query', element: <CatsInfiniteQuery /> },
  { path: 'cats-use-query', element: <CatsUseQuery /> },
  { path: 'new-cat', element: <CreateCat /> },
  { path: 'test', element: <TestPage /> },
  { path: 'tan-stack-table', element: <TanStackTablePage /> },
];

const publicRoutes = [{ path: 'login', element: <LoginPage /> }];

export const AppRoute = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path='/*' element={<Navigate to='/login' />} />
        <Route element={<AuthLayout />}>
          {publicRoutes.map(route => (
            <Route key={route.path} {...route} />
          ))}
        </Route>
        <Route
          path='dashboard'
          element={
            <AuthWrapper>
              <DashboardLayout />
            </AuthWrapper>
          }
        >
          {privateRoutes.map((route, index) => (
            <Route key={`${index}${route.path}`} {...route} />
          ))}
        </Route>
      </Routes>
    </Suspense>
  );
};
