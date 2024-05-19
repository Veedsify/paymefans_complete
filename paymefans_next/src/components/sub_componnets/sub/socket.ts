"use client";

import { io } from "socket.io-client";

const url = process.env.NEXT_PUBLIC_EXPRESS_URL_DIRECT

export const socket = io("http://localhost:3001");