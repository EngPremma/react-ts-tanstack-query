import { lazy, Suspense } from 'react';
import { RouteObject, Outlet } from 'react-router-dom';

import HomeLayout from 'src/layout/home.layout';

import Loading from 'src/components/loading';

const Home = lazy(() => import('src/pages/home.page'));
const Cats = lazy(() => import('src/pages/cats.page'));
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
				path: '/cats',
				element: <Cats />,
			},
		],
	},
	{
		path: 'catt',
		element: <Cats />,
	},
];
