import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { getUserCookie } from 'src/libs/cookie-util';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (getUserCookie() === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <>
      <h1>Auth layout</h1>
      {children}
    </>
  );
};

export default AuthLayout;
