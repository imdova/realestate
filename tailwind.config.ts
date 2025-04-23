import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        dmSerifDisplay: ["var(--font-dmSerif)"],
        poppins: ["var(--font-poppins)"],
      },
      scale: {
        102: "1.02",
      },
      borderRadius: {
        base: "10px",
      },
      boxShadow: {
        baseShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      },
    },
  },
  plugins: [],
} satisfies Config;
