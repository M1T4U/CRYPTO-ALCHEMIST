/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Enable dark mode using a class
    theme: {
        extend: {
            colors: {
                'brand-blue': '#00B4D8',
                'brand-purple': '#9B5DE5',
                'tech-green': '#2dd4bf',
                'keyword-light': '#0d9488',
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                tertiary: 'var(--color-tertiary)',
                'text-primary': 'var(--color-text-primary)',
                'text-secondary': 'var(--color-text-secondary)',
                'text-muted': 'var(--color-text-muted)',
                'border-color': 'var(--color-border)',
                'chat-bubble-user': 'var(--color-chat-bubble-user)',
                'chat-bubble-user-text': 'var(--color-chat-bubble-user-text)',
                'chat-bubble-ai': 'var(--color-chat-bubble-ai)',
                'chat-bubble-ai-text': 'var(--color-chat-bubble-ai-text)',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            animation: {
                'glow': 'glow 1.5s ease-in-out infinite alternate',
                'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'fade-in-message': 'fadeInMessage 0.5s ease-out forwards',
                'pulse-dot': 'pulseDot 1.4s infinite ease-in-out both',
                'hover': 'hover 20s linear infinite alternate',
                'blink': 'blink 1s step-end infinite',
            },
            keyframes: {
                glow: {
                    'from': { 'box-shadow': '0 0 5px #9B5DE5, 0 0 10px #9B5DE5' },
                    'to': { 'box-shadow': '0 0 20px #9B5DE5, 0 0 30px #9B5DE5' },
                },
                fadeInMessage: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                pulseDot: {
                    '0%, 80%, 100%': { transform: 'scale(0)', opacity: '0.5' },
                    '40%': { transform: 'scale(1.0)', opacity: '1' },
                },
                hover: {
                    '0%': { transform: 'translate(0px, 0px) scale(1) rotate(0deg)' },
                    '25%': { transform: 'translate(40px, -60px) scale(1.1) rotate(5deg)' },
                    '50%': { transform: 'translate(-40px, 40px) scale(0.9) rotate(-5deg)' },
                    '75%': { transform: 'translate(60px, 80px) scale(1.2) rotate(10deg)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1) rotate(0deg)' },
                },
                blink: {
                    '50%': { opacity: '0' },
                },
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        color: 'var(--color-text-secondary)',
                        a: {
                            color: 'var(--color-brand-blue)',
                            '&:hover': { color: 'var(--color-brand-purple)' },
                        },
                        h1: { color: 'var(--color-text-primary)' },
                        h2: { color: 'var(--color-text-primary)' },
                        h3: { color: 'var(--color-text-primary)' },
                        h4: { color: 'var(--color-text-primary)' },
                        strong: { color: 'var(--color-text-primary)' },
                        code: {
                            color: 'var(--color-text-primary)',
                            backgroundColor: 'var(--color-tertiary)',
                            padding: '0.2em 0.4em',
                            borderRadius: '0.25rem',
                        },
                        'code::before': { content: '""' },
                        'code::after': { content: '""' },
                        pre: {
                            color: 'var(--color-text-primary)',
                            backgroundColor: 'var(--color-tertiary)',
                        },
                        'ul > li::marker': {
                            color: 'var(--color-brand-blue)',
                        },
                    },
                },
                invert: {
                    css: {
                        color: 'var(--color-text-secondary)',
                        a: {
                            color: 'var(--color-brand-blue)',
                            '&:hover': { color: 'var(--color-brand-purple)' },
                        },
                        h1: { color: 'var(--color-text-primary)' },
                        h2: { color: 'var(--color-text-primary)' },
                        h3: { color: 'var(--color-text-primary)' },
                        h4: { color: 'var(--color-text-primary)' },
                        strong: { color: 'var(--color-text-primary)' },
                        code: {
                            color: 'var(--color-text-primary)',
                            backgroundColor: 'var(--color-tertiary)',
                        },
                        pre: {
                            color: 'var(--color-text-primary)',
                            backgroundColor: 'var(--color-tertiary)',
                        },
                        'ul > li::marker': {
                            color: 'var(--color-brand-blue)',
                        },
                    },
                },
            }),
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
