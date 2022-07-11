import { BACKGROUND_LINKS_LIST } from '../constants'

function changeBackground(currentBg, condition) {
	if (
		currentBg.set === condition.set &&
		currentBg.scene === condition.scene &&
		currentBg.day === condition.day &&
		currentBg.rainy === condition.rainy
	)
		return currentBg
}
export default changeBackground
