import { io } from "socket.io-client";

// Poori app mein yehi ek socket connection reuse hoga
const socket = io("http://localhost:5050");

export default socket;