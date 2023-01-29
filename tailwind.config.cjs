/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        12: ["12px", "18px"],
        14: ["14px", "21px"],
        16: ["16px", "24px"],
        18: ["18px", "27px"],
        20: ["20px", "30px"],
        24: ["24px", "36px"],
        28: ["28px", "42px"],
        32: ["32px", "48px"],
        36: ["36px", "54px"],
        48: ["48px", "72px"],
        64: ["64px", "96px"],
      },
    },
  },
  plugins: [],
};
