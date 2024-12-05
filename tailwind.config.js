/** @type {import('tailwindcss').Config} */
export default  {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        durazno: "#c36b3e",
        cafe: "#b55e3c",
        piel: "#FFE4CC",
      },
    },
  },
  plugins: [],
};
