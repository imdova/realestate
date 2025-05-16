import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // fontFamily: {
      //   dmSerifDisplay: ["var(--font-dmSerif)"],
      //   poppins: ["var(--font-poppins)"],
      // },
      colors: {
        main: "var(--main-color)",
      },
      // scale: {
      //   102: "1.02",
      // },
      // borderRadius: {
      //   base: "10px",
      // },
      // boxShadow: {
      //   baseShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      // },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "spin-fast": "spin 500ms linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
