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
};

export const catApi = {
	allCats: async (): Promise<AllCatsResponse> => {
		const response = await axios.get('/cats');
		return response.data;
	},
};
