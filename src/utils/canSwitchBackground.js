import { BACKGROUND_LINKS_LIST } from '../constants'

function canSwitchBackground(currentBg) {
	const currentSet = BACKGROUND_LINKS_LIST.filter(
		(video) => video.scene === currentBg?.scene,
	)

	const canSwitchToNight = currentSet.some((video) => video.day === false)

	const canSwitchToRain = currentSet.some((video) => video.rainy === true)

	return [canSwitchToNight, canSwitchToRain]
}

export default canSwitchBackground
