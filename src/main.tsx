import React from 'react';
import ReactDOM from 'react-dom/client';

import { ReactQueryProvider } from './contexts';
import { ReactRouterProvider } from './router/router.tsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ReactQueryProvider>
			<ReactRouterProvider />
		</ReactQueryProvider>
	</React.StrictMode>
);
