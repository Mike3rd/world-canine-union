import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Add these lines inside the 'extend' object
        logo: ["Merriweather", "serif"],
        heading: ["var(--font-oxanium)", "sans-serif"],
        body: ["var(--font-ibm-plex-sans)", "sans-serif"], // Use your CSS variable
        body2: ["var(--font-inter)", "sans-serif"], // Use your CSS variable
      },
    },
  },
} satisfies Config;
