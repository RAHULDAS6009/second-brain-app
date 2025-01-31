/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          "primary": "#5147e4",
          "secondary": "#e0e7ff",
          "sec_text": "#4a42b7",
        },
      },
    },
  },
  plugins: [],
};
