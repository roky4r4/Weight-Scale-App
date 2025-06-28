
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
			padding: '3rem', // Increased for larger display
			screens: {
				'2xl': '1600px' // Wider for 13" width
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
					DEFAULT: '#8BC650', // Custom green for primary actions
					foreground: '#1E1E1E'
				},
				secondary: {
					DEFAULT: '#A7A9AB', // Custom gray
					foreground: '#FFFFFF'
				},
				destructive: {
					DEFAULT: '#ef4444',
					foreground: '#FFFFFF'
				},
				muted: {
					DEFAULT: '#F5F5F5',
					foreground: '#A7A9AB'
				},
				accent: {
					DEFAULT: '#F2C736', // Custom yellow
					foreground: '#1E1E1E'
				},
				popover: {
					DEFAULT: '#FFFFFF',
					foreground: '#1E1E1E'
				},
				card: {
					DEFAULT: '#FFFFFF',
					foreground: '#1E1E1E'
				},
				// Custom driver interface colors
				'custom-blue': '#B9E5FA',
				'custom-green': '#8BC650',
				'custom-yellow': '#F2C736',
				'custom-gray': '#A7A9AB',
				'text-dark': '#1E1E1E',
				'text-light': '#FFFFFF',
				'warning-yellow': '#F2C736',
				'active-yellow': '#C9F805',
			},
			borderRadius: {
				lg: '8px', // Slightly larger for industrial display
				md: '6px',
				sm: '4px'
			},
			fontSize: {
				// Optimized for 23" x 13" display
				'xs': ['16px', '20px'],
				'sm': ['18px', '22px'],
				'base': ['20px', '28px'],
				'lg': ['22px', '30px'],
				'xl': ['24px', '32px'],
				'2xl': ['28px', '36px'],
				'3xl': ['32px', '40px'],
				'4xl': ['40px', '48px'],
				'5xl': ['48px', '56px'],
				'6xl': ['56px', '64px'],
				'7xl': ['64px', '72px'],
				'8xl': ['80px', '88px'],
				'9xl': ['96px', '104px'],
			},
			spacing: {
				// Enhanced spacing for touch targets
				'18': '4.5rem',
				'20': '5rem',
				'24': '6rem',
				'28': '7rem',
				'32': '8rem',
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
						transform: 'translateY(10px)'
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
				},
				'pulse-weighing': {
					'0%, 100%': {
						opacity: '1',
						transform: 'scale(1)'
					},
					'50%': {
						opacity: '0.8',
						transform: 'scale(1.02)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'pulse-weighing': 'pulse-weighing 2s infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
