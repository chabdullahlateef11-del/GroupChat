import { motion, AnimatePresence } from "framer-motion";

// Teen bouncing dots — jab koi type kar raha ho
export default function TypingIndicator({ username }) {
  return (
    <AnimatePresence>
      {username && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          className="flex items-center gap-2 px-1 mb-2"
        >
          <div className="bg-card border border-slate-200 rounded-2xl px-3 py-2 flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-muted"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </div>
          <span className="text-muted text-xs">{username} is typing...</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}