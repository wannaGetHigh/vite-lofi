const _SEC_PER_DAY = 60 * 60 * 24

const dayStreak = (list) => {
	if (list.length === 0) return 0

	const secTimeList = list.map((item) => item.createdAt.seconds)

	let startDate = secTimeList[0]
	let streak = 0
	secTimeList.forEach((time) => {
		if (time - startDate >= 2 * _SEC_PER_DAY) {
			streak = 0
		} else if (time - startDate >= _SEC_PER_DAY) {
			streak += 1
		}
		startDate = time
	})

	return streak
}

export default dayStreak
