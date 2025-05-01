/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#4CAF50', // Light green
                secondary: '#8D6E63', // Earthy brown
                accent: '#4FC3F7', // Light blue
                background: '#F5F5F5', // Off-white
                text: '#333333', // Dark gray
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
                playfair: ['Playfair Display', 'serif'],
            },
        },
    },
    plugins: [],
};
