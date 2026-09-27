import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

// Chat room screen — header, message list, reply banner, aur composer
export default function ChatRoom({ username, group, messages, typingUser, onSend, onTyping, onLeave }) {
  const [draft, setDraft] = useState("");
  const [replyTo, setReplyTo] = useState(null); // jis message pe reply ho raha hai
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typingUser]);

  function handleSend(e) {
    e.preventDefault();
    if (!draft.trim()) return;
    onSend(draft.trim(), replyTo);
    setDraft("");
    setReplyTo(null); // reply bhejne ke baad banner clear ho jaye
  }

  function handleChange(e) {
    setDraft(e.target.value);
    onTyping();
  }

  return (
    <motion.div
      key="chat"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen w-full bg-slate-100 flex justify-center px-4 py-6"
    >
      <div className="w-full max-w-2xl flex flex-col bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            <div>
              <h2 className="text-slate-800 text-lg font-semibold leading-tight">{group}</h2>
              <p className="text-slate-500 text-xs">Logged in as {username}</p>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onLeave}
            className="text-blue-600 text-sm font-semibold hover:underline"
          >
            Leave
          </motion.button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="chat-scroll flex-1 overflow-y-auto px-5 py-4">
          {messages.length === 0 && (
            <p className="text-slate-500 text-sm text-center mt-10">
              No messages yet — send the first one!
            </p>
          )}
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <MessageBubble
                key={i}
                message={m}
                isOwn={m.sender === username}
                onReply={setReplyTo}
              />
            ))}
          </AnimatePresence>
          <TypingIndicator username={typingUser} />
        </div>

        {/* Reply banner — jab koi message swipe kiya ho */}
        <AnimatePresence>
          {replyTo && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-5 pt-3 flex items-center justify-between bg-slate-50 border-t border-slate-200"
            >
              <div className="border-l-2 border-blue-500 pl-2 overflow-hidden">
                <p className="text-blue-600 text-xs font-semibold">Replying to {replyTo.sender}</p>
                <p className="text-slate-500 text-xs truncate max-w-xs">{replyTo.text}</p>
              </div>
              <button
                onClick={() => setReplyTo(null)}
                className="text-slate-400 hover:text-slate-600 text-lg px-2"
              >
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Composer */}
        <form onSubmit={handleSend} className="flex items-center gap-3 px-5 py-4 border-t border-slate-200">
          <input
            value={draft}
            onChange={handleChange}
            placeholder="Type a message..."
            className="flex-1 bg-slate-50 text-slate-800 placeholder:text-slate-400 rounded-lg px-4 py-3 outline-none border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
          <motion.button
            type="submit"
            whileTap={{ scale: 0.9 }}
            className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold rounded-lg px-5 py-3"
          >
            Send
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}