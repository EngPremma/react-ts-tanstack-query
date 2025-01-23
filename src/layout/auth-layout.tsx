import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router';

import { getUserCookie } from 'src/libs/cookie-util';

const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (getUserCookie() === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <>
      <h1>Auth layout</h1>
      <Outlet />
    </>
  );
};

export default AuthLayout;
