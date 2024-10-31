/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main-img': "url('./img/think.png')",
        // 'footer-texture': "url('/images/footer-texture.png')",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        pry: "#543EE0",
      },
    },
  },
  plugins: [],
};
