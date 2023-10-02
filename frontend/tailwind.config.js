/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "tomilho-300": "#bbcf98",
        "tomilho-400": "#a6b885",
        "tomilho-500": "#93a375",
        "tomilho-600": "#86916f",
        "tomilho-700": "#757f60",
        "tomilho-800": "#475233",
        babosa: "#98a68b",
        "capim-de-cheiro": "#a6ad97",
        salgueiro: "#b5ab7a",
        "capim-seco": "#7c785c",
        "galho-seco": "#b9af9c",
        "background-custom": "#d6d2c6",
        "gelo-seco": "#ede9e1",
        "background-main": "#F8F8F8",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
