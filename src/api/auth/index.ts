import { publicAxios, privateAxios } from 'src/libs/axios';

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
    const response = await publicAxios.post<Response & { token: string }>('/users/login', data);
    return response.data;
  },
  getMe: async () => {
    const response = await privateAxios.get<Response & { user: User }>('/users/me');
    return response.data;
  },
};
