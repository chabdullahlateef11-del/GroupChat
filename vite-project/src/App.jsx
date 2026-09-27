import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import JoinScreen from "./components/JoinScreen";
import ChatRoom from "./components/ChatRoom";
import useSocketChat from "./hooks/useSocketChat";

export default function App() {
  const [session, setSession] = useState(null); // { username, group }
  const { messages, sendMessage, sendTyping, typingUser } = useSocketChat(
    session?.group,
    session?.username
  );

  function handleJoin({ username, group }) {
    setSession({ username, group });
  }

  function handleLeave() {
    setSession(null);
  }

  return (
    <AnimatePresence mode="wait">
      {!session ? (
        <JoinScreen key="join" onJoin={handleJoin} />
      ) : (
        <ChatRoom
          key="chat"
          username={session.username}
          group={session.group}
          messages={messages}
          typingUser={typingUser}
          onSend={sendMessage}
          onTyping={sendTyping}
          onLeave={handleLeave}
        />
      )}
    </AnimatePresence>
  );
}