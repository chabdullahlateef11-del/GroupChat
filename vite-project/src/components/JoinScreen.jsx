import { useState } from "react";
import { motion } from "framer-motion";

// Simple, clean join screen — white card on light background
export default function JoinScreen({ onJoin }) {
  const [username, setUsername] = useState("");
  const [group, setGroup] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // Dono fields required hain
    if (!username.trim() || !group.trim()) {
      setError("Please enter both username and group name.");
      return;
    }
    setError("");
    onJoin({ username: username.trim(), group: group.trim() });
  }

  return (
    <motion.div
      key="join"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen w-full bg-bg flex items-center justify-center px-6"
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-sm bg-card rounded-2xl p-8 shadow-lg shadow-slate-200 border border-slate-100"
      >
        <h1 className="text-text text-2xl font-semibold mb-6">Join a Chat Group</h1>

        <label className="block text-muted text-xs font-medium mb-1">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="e.g. Abdullah"
          className="w-full bg-bg text-text placeholder:text-muted/70 rounded-lg px-4 py-3 mb-4 outline-none border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primaryLight transition-all"
        />

        <label className="block text-muted text-xs font-medium mb-1">Group Name</label>
        <input
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          placeholder="e.g. Hafiz Electric Team"
          className="w-full bg-bg text-text placeholder:text-muted/70 rounded-lg px-4 py-3 mb-2 outline-none border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primaryLight transition-all"
        />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          className="w-full mt-6 bg-primary hover:bg-blue-600 transition-colors text-white font-semibold rounded-lg py-3"
        >
          Join
        </motion.button>
      </motion.form>
    </motion.div>
  );
}