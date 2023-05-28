import axios from 'axios';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: any;
  phone: string;
  website: string;
  company: any;
};

export const userApi = {
  users: async (): Promise<User[]> => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');

    return response.data;
  },
};
