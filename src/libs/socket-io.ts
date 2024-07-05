import { io } from 'socket.io-client';
import { env } from 'src/config';

const URL = env.api;

export const socket = io(URL);
