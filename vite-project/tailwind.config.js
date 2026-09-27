/** @type {import('tailwindcss').Config} */
// Yahan sirf color tokens define kiye hain — light theme + light-blue accent
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F1F5F9", // page background — light gray
        card: "#FFFFFF", // white card / panel
        primary: "#3B82F6", // main blue accent (buttons, sent bubbles)
        primaryLight: "#DBEAFE", // light blue (hover / received highlight)
        text: "#1E293B", // main dark text
        muted: "#64748B", // secondary/gray text
      },
      fontFamily: {
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};