import React, { createContext, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router';

import { authApi } from 'src/api/auth';
import { getAuthToken } from 'src/utils/auth-token';

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

  useEffect(() => {
    if (getAuthToken()) getMe();
    else navigate('/login');
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
