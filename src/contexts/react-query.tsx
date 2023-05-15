import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { env } from '../config';

type ReactQueryProviderProps = {
	children: ReactNode;
};

const queryClient = new QueryClient();

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			{env.mode === 'development' ? <ReactQueryDevtools initialIsOpen={false} /> : null}
		</QueryClientProvider>
	);
};

export default ReactQueryProvider;
