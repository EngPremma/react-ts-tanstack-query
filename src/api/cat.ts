import { privateAxios } from 'src/libs/axios';

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

type CreateCatResponse = Response & {
  cat: Cat;
};

export type CreateCat = {
  name: string;
  age: number;
  breed: string;
};

export const catApi = {
  allCats: async (page: number, limit: number, signal: AbortSignal | undefined): Promise<AllCatsResponse> => {
    const response = await privateAxios.get('/cats', { params: { page, limit }, signal });
    return response.data;
  },
  createCat: async (cat: CreateCat): Promise<CreateCatResponse> => {
    const response = await privateAxios.post('/cats', cat);

    return response.data;
  },
};
