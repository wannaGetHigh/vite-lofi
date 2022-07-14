import { BACKGROUND_LINKS_LIST } from '../constants'

function changeBackground(currentBg, condition) {
	if (
		currentBg.set === condition.set &&
		currentBg.scene === condition.scene &&
		currentBg.day === condition.day &&
		currentBg.rainy === condition.rainy
	)
		return currentBg

	const newBackground = { ...currentBg, show1: !currentBg.show1, ...condition }

	const newLink = BACKGROUND_LINKS_LIST.find(
		(video) =>
			video.set === condition.set &&
			video.scene === condition.scene &&
			video.day === condition.day &&
			video.rainy === condition.rainy,
	).link

	if (currentBg.show1) {
		newBackground.link2 = newLink
	} else {
		newBackground.link1 = newLink
	}

	return newBackground
}
export default changeBackground
