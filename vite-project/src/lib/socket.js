import { io } from "socket.io-client";

// Poori app mein yehi ek socket connection reuse hoga
const socket = io("chatgroupbackend-production.up.railway.app");

export default socket;