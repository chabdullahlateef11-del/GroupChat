import { useState } from "react";
import { motion } from "framer-motion";

// Message bubble — ab isay right swipe kiya ja sakta hai reply karne ke liye
export default function MessageBubble({ message, isOwn, onReply }) {
  const [dragX, setDragX] = useState(0);

  if (message.system) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-slate-500 text-xs my-3"
      >
        {message.text}
      </motion.p>
    );
  }

  const { sender, text, time, replyTo } = message;
  const bubbleAnim = {
    initial: { opacity: 0, y: 10, scale: 0.97 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { type: "spring", stiffness: 400, damping: 30 },
  };

  // Jab swipe threshold (60px) se zyada ho, reply trigger karo
  function handleDragEnd(e, info) {
    if (info.offset.x > 60) {
      onReply(message);
    }
    setDragX(0);
  }

  const replyPreview = replyTo && (
    <div className="border-l-2 border-blue-400 pl-2 mb-1 opacity-80">
      <p className="text-[11px] font-semibold">{replyTo.sender}</p>
      <p className="text-[11px] truncate max-w-[180px]">{replyTo.text}</p>
    </div>
  );

  return (
    <div className={`relative flex ${isOwn ? "justify-end" : "justify-start"} mb-3`}>
      {/* Swipe ke doran dikhne wala reply icon */}
      <motion.div
        className="absolute inset-y-0 left-1 flex items-center text-blue-500 text-lg pointer-events-none"
        style={{ opacity: Math.min(dragX / 60, 1) }}
      >
        ↩
      </motion.div>

      <motion.div
        {...bubbleAnim}
        drag="x"
        dragDirectionLock
        dragConstraints={{ left: 0, right: 80 }}
        dragElastic={0.4}
        onDrag={(e, info) => setDragX(info.offset.x)}
        onDragEnd={handleDragEnd}
        className={
          isOwn
            ? "bg-blue-600 text-white rounded-2xl rounded-br-md px-4 py-2 max-w-[75%] shadow-sm cursor-grab active:cursor-grabbing"
            : "bg-white text-slate-800 rounded-2xl rounded-bl-md px-4 py-2 max-w-[75%] border border-slate-200 shadow-sm cursor-grab active:cursor-grabbing"
        }
      >
        {replyPreview}
        {!isOwn && <p className="text-blue-600 text-xs font-semibold mb-1">{sender}</p>}
        <p className="text-sm leading-relaxed">{text}</p>
        <p className={`text-[10px] text-right mt-1 ${isOwn ? "text-blue-100" : "text-slate-400"}`}>
          {time}
        </p>
      </motion.div>
    </div>
  );
}