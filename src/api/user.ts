import axios from 'axios';

import { env } from 'src/config';

type Paginate<T> = {
  message: string;
  docs: T[];
  page: number;
  limit: number;
  totalDocs: number;
  totalPages: number;
};

type Document = {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  name: string;
  email: string;
} & Document;

export type UsersQueryParams = {
  page: number;
  limit: number;
};

export const userApi = {
  users: async (queryParams: UsersQueryParams) => {
    const response = await axios.get<Paginate<User>>(`${env.api}/api/v1/users`, { params: queryParams });
    return response.data;
  },
};
