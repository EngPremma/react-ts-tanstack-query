import { ReactNode } from 'react';
import { Navigate } from 'react-router';

import { getUserCookie } from 'src/libs/cookie-util';
import useUrlCallback from 'src/hooks/use-url-callback';
import useGetMe from './hooks/useGetMe';

// for checking login user
const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const { urlCallback } = useUrlCallback();
  const { isError } = useGetMe();

  if (isError || !getUserCookie()) {
    return <Navigate to={`/login?callback=${urlCallback}`} />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
