
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '3rem', /* More padding for large screen */
			screens: {
				'2xl': '1600px' /* Wider container for large display */
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#B9E5FA', /* Blue */
					foreground: '#000000' /* Black text on blue */
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom color scheme for ScaleApp
				industrial: {
					900: '#2a2a2a',
					800: '#3a3a3a',
					700: '#4a4a4a',
					600: '#5a5a5a',
					500: '#6a6a6a',
					400: '#7a7a7a',
					300: '#A7A9AB', /* Deep Gray */
					200: '#b7b9bb',
					100: '#c7c9cb'
				},
				success: {
					DEFAULT: '#8BC650', /* Green */
					dark: '#7aa844'
				},
				warning: {
					DEFAULT: '#F2C736', /* Yellow */
					dark: '#d9b12e'
				},
				danger: {
					DEFAULT: '#ef4444',
					dark: '#dc2626'
				},
				// New color additions
				blue: {
					DEFAULT: '#B9E5FA',
					light: '#d1edfb',
					dark: '#9dd9f7'
				},
				green: {
					DEFAULT: '#8BC650',
					light: '#a5d470',
					dark: '#7ab044'
				},
				yellow: {
					DEFAULT: '#F2C736',
					light: '#f5d563',
					dark: '#e6b629'
				},
				deepGray: {
					DEFAULT: '#A7A9AB',
					light: '#b9bbbf',
					dark: '#959799'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontSize: {
				'xs': '0.875rem',
				'sm': '1rem',
				'base': '1.125rem', /* Larger base font */
				'lg': '1.25rem',
				'xl': '1.5rem',
				'2xl': '1.875rem',
				'3xl': '2.25rem',
				'4xl': '3rem',
				'5xl': '3.75rem',
				'6xl': '4.5rem',
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'96': '24rem',
				'128': '32rem',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(15px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.4s ease-out',
				'scale-in': 'scale-in 0.3s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
