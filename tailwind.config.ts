import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "rose-blood": "#D32F2F",
                "rose-pink": "#FFCDD2",
                "void-black": "#050505",
                "liquid-silver": "#E0E0E0",
            },
            fontFamily: {
                cinzel: ["var(--font-cinzel)"],
                lato: ["var(--font-lato)"],
            },
        },
    },
    plugins: [],
};
export default config;
