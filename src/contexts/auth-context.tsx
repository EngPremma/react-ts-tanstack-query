import React, { createContext, useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router';

import { authApi } from 'src/api/auth';
import { getUserCookie } from 'src/libs/cookie-util';

export type User = {
  email: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  getMe: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({ user: null, getMe: () => Promise.resolve() });

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const callbackUrl = encodeURIComponent(`${pathname}${search}`);

  useEffect(() => {
    if (getUserCookie() === 'true') {
      getMe();
    } else {
      navigate(`/login?callback=${callbackUrl}`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMe = async () => {
    try {
      const res = await authApi.getMe();

      setUser(res.user);
    } catch (error) {
      console.log('error :>> ', error);
      setUser(null);
    }
  };

  return <AuthContext.Provider value={{ user: user, getMe }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

export const useAuthContext = () => {
  return useContext(AuthContext);
};
