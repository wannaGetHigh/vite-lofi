const getDate = (time) => {
	const day = time.getDate()

	const month = time.getMonth() + 1

	const year = time.getFullYear()

	const prefixZero = (time) => (time < 10 ? '0' + time : time)

	return `${prefixZero(day)}/${prefixZero(month)}/${year}`
}

export default getDate
