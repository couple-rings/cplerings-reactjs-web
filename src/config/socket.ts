import { io } from "socket.io-client";

const URL = import.meta.env.VITE_NESTJS_SERVER_URL;

export const socket = io(URL);
