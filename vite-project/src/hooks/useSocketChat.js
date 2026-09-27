import { useCallback, useEffect, useRef, useState } from "react";
import socket from "../lib/socket";

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// Ye hook asli backend (Socket.io server) ke sath connect ho kar
// real group chat chalata hai — pehle wale BroadcastChannel hook ki jagah
export default function useSocketChat(group, username) {
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (!group || !username) return;

    // Room join karo
    socket.emit("join", { roomId: group, username });

    function handleMessage(payload) {
      setMessages((prev) => [...prev, payload]);
    }

    function handleSystem(payload) {
      setMessages((prev) => [...prev, { system: true, text: payload.text, time: nowTime() }]);
    }

    function handleTyping(payload) {
      if (payload.username === username) return;
      setTypingUser(payload.username);
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => setTypingUser(null), 1500);
    }

    socket.on("message", handleMessage);
    socket.on("system", handleSystem);
    socket.on("typing", handleTyping);

    return () => {
      socket.emit("leave", group);
      socket.off("message", handleMessage);
      socket.off("system", handleSystem);
      socket.off("typing", handleTyping);
      clearTimeout(typingTimeoutRef.current);
    };
  }, [group, username]);

  const sendMessage = useCallback(
    (text, replyTo) => {
      const payload = {
        room: group,
        sender: username,
        text,
        time: nowTime(),
        replyTo: replyTo ? { sender: replyTo.sender, text: replyTo.text } : null,
      };
      // Apna message turant screen pe dikhayein — server sirf DOOSRON ko bhejta hai
      setMessages((prev) => [...prev, payload]);
      socket.emit("send", payload);
    },
    [group, username]
  );

  const sendTyping = useCallback(() => {
    socket.emit("typing", { room: group, username });
  }, [group, username]);

  return { messages, sendMessage, sendTyping, typingUser };
}