import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { privateAxios } from './';
import { clearAuthToken, getAuthToken } from 'src/utils/auth-token';

const AxiosInterceptor = ({ children }: { children: React.ReactNode }) => {
  const [isSet, setIsSet] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const reqInterceptorOnFulfilled = (config: InternalAxiosRequestConfig) => {
      config.headers.Authorization = `Bearer ${getAuthToken()}`;
      return config;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const reqInterceptorOnRejected = (error: any) => {
      return Promise.reject(error);
    };

    const resInterceptorOnFulfilled = (response: AxiosResponse) => {
      return response;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resInterceptorOnRejected = (error: any) => {
      if (error.response.status === 401) {
        clearAuthToken();
        navigate('/login');
      }

      return Promise.reject(error);
    };

    const reqInterceptor = privateAxios.interceptors.request.use(
      reqInterceptorOnFulfilled,
      reqInterceptorOnRejected,
    );

    const resInterceptor = privateAxios.interceptors.response.use(
      resInterceptorOnFulfilled,
      resInterceptorOnRejected,
    );

    setIsSet(true);

    return () => {
      privateAxios.interceptors.request.eject(reqInterceptor);
      privateAxios.interceptors.response.eject(resInterceptor);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isSet && <>{children}</>;
};

export default AxiosInterceptor;
