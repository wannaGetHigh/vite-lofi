module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#f3a952',
				bl: '#070707',
				'semi-bl': '#0005',
				'bl-20': '#141414',
				gr: '#141414'
			},
			backgroundColor: (theme) => ({
				...theme('colors'),
				'transparent-b-60': 'rgba(0, 0, 0, .6)'
			}),
			backgroundImage: {
				'gradient-269deg':
					'linear-gradient(269.36deg,rgba(225,134,96,.9) 23.92%,rgba(244,202,93,.9) 101.14%)'
			}
		}
	},
	plugins: []
}
