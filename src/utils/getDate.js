const getDate = (timeInSec) => {
	const date = new Date(timeInSec * 1000)

	const day = date.getDate()

	const month = date.getMonth() + 1

	const year = date.getFullYear()

	const prefixZero = (time) => (time < 10 ? '0' + time : time)

	return `${prefixZero(day)}/${prefixZero(month)}/${year}`
}

export default getDate
