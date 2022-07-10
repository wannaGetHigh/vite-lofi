module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#f3a952',
				bl: '#070707',
				'semi-bl': '#0005',
				'bl-20': '#141414',
				'bl-13': '#0D0D0D',
				gr: '#141414',
				'gr-input': '#5b5a67',
				br: '#352828',
				'light-green': '#0f0a'
			},
			backgroundColor: (theme) => ({
				...theme('colors'),
				'transparent-b-60': 'rgba(0, 0, 0, .6)',
				'transparent-b-70': 'rgba(0, 0, 0, .7)',
				'transparent-b-80': 'rgba(0, 0, 0, .8)',
				'transparent-b-23': 'rgba(0, 0, 0, .23)',
				'transparent-b-10': 'rgb(243 169 82 / 10%)',
				'transparent-w-05': 'rgba(255, 255, 255, 0.05)'
			}),
			backgroundImage: {
				'gradient-269deg':
					'linear-gradient(269.36deg,rgba(225,134,96,.9) 23.92%,rgba(244,202,93,.9) 101.14%)'
			},
			brightness: {
				10: '100'
			},
			flex: {
				leftside: '0 0 58.33333333%',
				rightside: '0 0 41.66666667%'
			}
		}
	},
	plugins: []
}
