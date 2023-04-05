/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        text_color: "rgba(0, 0, 0, 0.8)",
        button_color: "#49E4FA",
        button_hover_color: "rgba(73, 228, 250, 0.8)",
        background_color: "#bfacff",
        background_color_hover: "#795fff",
        navbar_color: "#1a1532",
      },
      images: {
        domains: ["images.unsplash.com", "preview.colorlib.com"],
      },
      fontFamily: {
        poppins: "Poppins, sans-serif",
      },
      backgroundColor: ["active"],
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
