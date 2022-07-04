module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			backgroundColor: (theme) => ({
				...theme('colors'),
				'transparent-b-60': 'rgba(0, 0, 0, .6)'
			})
		}
	},
	plugins: []
}
