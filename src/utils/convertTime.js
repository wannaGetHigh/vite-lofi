const convertTime = (time) => {
	// Time left after subtract hour
	const remainer = time % 3600

	const hour = Math.floor(time / 3600)

	const minute = Math.floor(remainer / 60)

	const second = Math.floor(remainer % 60)

	const prefixZero = (time) => {
		return time < 10 ? '0' + time : time
	}

	return `${hour >= 1 ? prefixZero(hour) + ':' : ''}${prefixZero(
		minute,
	)}:${prefixZero(second)}`
}

export default convertTime
