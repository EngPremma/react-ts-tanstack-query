import axios from 'axios';

type Cat = {
  _id: string;
  name: string;
  age: number;
  breed: string;
  createdAt: string;
  updatedAt: string;
};

type Response = { message?: string };

type AllCatsResponse = Response & {
  cats: Cat[];
  numberOfPage: number;
};

export const catApi = {
  allCats: async (page: number, limit: number): Promise<AllCatsResponse> => {
    const response = await axios.get('/cats', { params: { page, limit } });
    return response.data;
  },
};
