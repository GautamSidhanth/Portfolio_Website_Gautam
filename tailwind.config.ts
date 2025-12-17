import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      zIndex: {
        "999": "999",
        "9999": "9999",
      },
      spacing: {
        "112": "28rem",
        "113": "28.25rem",
        "125": "31.25rem",
        "132": "33rem",
        "140": "35rem",
        "200": "50rem",
        "275": "68.75rem",
        "400": "100rem",
      },
      width: {
        "lg": "32rem",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
