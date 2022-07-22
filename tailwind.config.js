module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			animation: {
				fadeIn: 'fadeIn 0.3s ease',
				fadeIn1s: 'fadeIn 1s ease',
				fadeOut: 'fadeOut 0.3s ease',
				autoSlider: 'autoSlider infinite 100s linear',
				slideDown: 'slideDown 0.5s ease-out',
			},
			colors: {
				primary: '#f3a952',
				bl: '#070707',
				'semi-bl': '#0005',
				'bl-20': '#141414',
				'bl-13': '#0D0D0D',
				gr: '#141414',
				'gr-36': '#363636',
				'gr-input': '#5b5a67',
				br: '#352828',
				'light-green': '#0f0a',
				'transparent-w-20': 'rgba(255,255,255,0.2)',
			},
			backgroundColor: (theme) => ({
				...theme('colors'),
				'transparent-b-60': 'rgba(0, 0, 0, .6)',
				'transparent-b-70': 'rgba(0, 0, 0, .7)',
				'transparent-b-80': 'rgba(0, 0, 0, .8)',
				'transparent-b-23': 'rgba(0, 0, 0, .23)',
				'transparent-b-10': 'rgb(243 169 82 / 10%)',
				'transparent-w-05': 'rgba(255, 255, 255, 0.05)',
				'transparent-w-25': 'rgba(255, 255, 255, 0.25)',
				'bgd-200': 'rgba(40, 40, 40, 0.3)',
			}),
			backgroundImage: {
				'gradient-269deg':
					'linear-gradient(269.36deg,rgba(225,134,96,.9) 23.92%,rgba(244,202,93,.9) 101.14%)',
			},
			brightness: {
				10: '100',
			},
			flex: {
				leftside: '0 0 58.33333333%',
				rightside: '0 0 41.66666667%',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 },
				},
				fadeOut: {
					'0%': { opacity: 1 },
					'100%': { opacity: 0 },
				},
				autoSlider: {
					'0%': { transform: 'translateX(0%)' },
					'100%': { transform: 'translateX(-100%)' },
				},
				slideDown: {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(0%)' },
				},
			},
			fontSize: {
				32: ['32px', { lineHeight: '32px' }],
			},
		},
	},
	plugins: [],
}
