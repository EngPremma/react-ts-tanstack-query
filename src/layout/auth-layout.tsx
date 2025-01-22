import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { getAuthToken } from 'src/utils/auth-token';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const token = getAuthToken();

  useEffect(() => {
    if (token) navigate('/dashboard');
    else navigate('/login');
  }, [navigate, token]);

  return (
    <>
      <h1>Auth layout</h1>
      {children}
    </>
  );
};

export default AuthLayout;
