const totalHour = (list) => {
	const timeInSec = list.reduce((prev, curr) => prev + curr.time, 0)

	return Math.round(timeInSec / 3600)
}

export default totalHour
