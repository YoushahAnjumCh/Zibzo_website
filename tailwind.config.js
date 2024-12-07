/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
   extend: {
    colors: {
      primary: "#e8ecef",
      secondary: "#f42c37",
      brandYellow:"#fdc62e",
      brandBlue:"#1376f4",
      brandGreen:"#0A8200",
      brandWhite:"#eeeeee",
      homeBannerColor:"#FFAB00",
      homeCardInfoColor: "#F0F0F0",
      homeFooterColor: "#00071B",

    },
  },
  
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "3rem",
     
      },
    },
  },
  plugins: [],
}

