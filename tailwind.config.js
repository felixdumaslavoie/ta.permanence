/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: { print: { raw: "print" }, screen: { raw: "screen" } },
  },
  plugins: [
    require("daisyui"),
    require("tailwind-hamburgers"),
  ],
};
