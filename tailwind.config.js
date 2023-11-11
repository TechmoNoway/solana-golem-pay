module.exports = {
    darkMode: ['class'],
    mode: 'jit',
    content: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
    // darkMode: 'media',
    plugins: [require('daisyui'), require('@tailwindcss/typography'), require('tailwindcss-animate')],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
            },
            // borderRadius: {
            //     lg: 'var(--radius)',
            //     md: 'calc(var(--radius) - 2px)',
            //     sm: 'calc(var(--radius) - 4px)',
            // },
            keyframes: {
                'accordion-down': {
                    from: { height: 0 },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: 0 },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
        },
    },
    // daisyui: {
    //     styled: true,
    //     // TODO: Theme needs works
    //     themes: [
    //         {
    //             solana: {
    //                 fontFamily: {
    //                     display: ['PT Mono, monospace'],
    //                     body: ['Inter, sans-serif'],
    //                 },
    //                 primary: '#000000' /* Primary color */,
    //                 'primary-focus': '#9945FF' /* Primary color - focused */,
    //                 'primary-content': '#ffffff' /* Foreground content color to use on primary color */,

    //                 secondary: '#808080' /* Secondary color */,
    //                 'secondary-focus': '#f3cc30' /* Secondary color - focused */,
    //                 'secondary-content': '#ffffff' /* Foreground content color to use on secondary color */,

    //                 accent: '#33a382' /* Accent color */,
    //                 'accent-focus': '#2aa79b' /* Accent color - focused */,
    //                 'accent-content': '#ffffff' /* Foreground content color to use on accent color */,

    //                 neutral: '#2b2b2b' /* Neutral color */,
    //                 'neutral-focus': '#2a2e37' /* Neutral color - focused */,
    //                 'neutral-content': '#ffffff' /* Foreground content color to use on neutral color */,

    //                 'base-100': '#000000' /* Base color of page, used for blank backgrounds */,
    //                 'base-200': '#35363a' /* Base color, a little darker */,
    //                 'base-300': '#222222' /* Base color, even more darker */,
    //                 'base-content': '#f9fafb' /* Foreground content color to use on base color */,

    //                 info: '#2094f3' /* Info */,
    //                 success: '#009485' /* Success */,
    //                 warning: '#ff9900' /* Warning */,
    //                 error: '#ff5724' /* Error */,
    //             },
    //         },
    //         // backup themes:
    //         // 'dark',
    //         // 'synthwave'
    //     ],
    //     base: true,
    //     utils: true,
    //     logs: true,
    //     rtl: false,
    // },
};
