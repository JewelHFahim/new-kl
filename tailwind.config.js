/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      inter: ["Inter", "sans-serif"],
      roboto: ["Roboto", "sans-serif"],
      worksans: ["Work Sans", "sans-serif"],
    },

    extend: {
      colors: {
        primary: "#9EA2FD",
        textColorBlack: "#3F3F44",
        offWhite: "#CFCFCF",
      },
    },
  },
  plugins: [require("daisyui")],
};