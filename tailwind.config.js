/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                dark: {
                    900: '#1a1a1c',
                    600: '#272729',
                    400: '#222223',
                    300: '#2e2f30',
                    200: '#353637'
                }
            }
        }
    },
    plugins: []
};
