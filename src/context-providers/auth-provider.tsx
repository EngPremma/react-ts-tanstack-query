import React, { createContext, useEffect, useState, useContext } from 'react';

import { authApi } from 'src/api/auth';
import { getUserCookie } from 'src/libs/cookie-util';
import useUrlCallback from 'src/hooks/use-url-callback';

export type User = {
  email: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  getMe: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({ user: null, getMe: () => Promise.resolve() });

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { navigateToLoginWithUrlCallback } = useUrlCallback();

  useEffect(() => {
    if (getUserCookie() === 'true') {
      getMe();
    } else {
      navigateToLoginWithUrlCallback();
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

export default AuthProvider;

export const useAuthContext = () => {
  return useContext(AuthContext);
};
