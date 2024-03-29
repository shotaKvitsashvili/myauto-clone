import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '16px',
                sm: '16px',
                lg: '24px',
                xl: '20px',
                '2xl': '33px',
            },
        },
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                primary: '#FD4100',
                secondary: '#4A6CFA',
                'secondary-yellow': '#FEC900',
                success: '#1aba6b',
                'black-500': '#8C929B',
                'black-600': '#6F7383',
                'black-800': '#272a37',
                'black-900': '#1B1D25',
                'gray-100': '#E9E9F0',
                'gray-200': '#E2E5EB'
            }
        },
    },
    plugins: [],
};
export default config;
