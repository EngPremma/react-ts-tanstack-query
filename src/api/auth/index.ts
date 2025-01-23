import { privateAxios } from 'src/libs/axios';

import { User } from 'src/contexts/auth-context';

type LoginReqData = {
  email: string;
  password: string;
};

type Response = {
  message: string;
};

export const authApi = {
  login: async (data: LoginReqData) => {
    const response = await privateAxios.post<Response & { token: string }>('/users/login', data);
    return response.data;
  },
  logout: async () => {
    const response = await privateAxios.get<Response>('/users/logout');
    return response.data;
  },
  getMe: async () => {
    const response = await privateAxios.get<Response & { user: User }>('/users/me');
    return response.data;
  },
};
