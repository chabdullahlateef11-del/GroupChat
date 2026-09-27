import { io } from "socket.io-client";

// Poori app mein yehi ek socket connection reuse hoga
const socket = io("https://glorious-light-production-a173.up.railway.app");

export default socket;