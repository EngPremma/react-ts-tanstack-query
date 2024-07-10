import axios from 'axios';

import { env } from 'src/config';

export const privateAxios = axios.create({
  baseURL: `${env.api}/api/v1`,
  withCredentials: true,
  timeout: 5000,
});

export const publicAxios = axios.create({
  baseURL: `${env.api}/api/v1`,
  timeout: 5000,
});