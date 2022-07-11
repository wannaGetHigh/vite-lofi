import { createContext, useState } from 'react'

import { JAZZY_LINKS } from '../constants'
import { BACKGROUND_LINKS_LIST } from '../constants'

export const AppContext = createContext()

function AppProvider({ children }) {
	const [modalType, setModalType] = useState()
	const [currentSong, setCurrentSong] = useState(() => {
		let randomIndex = Math.floor(Math.random() * JAZZY_LINKS.length)
		return {
			list: JAZZY_LINKS,
			index: randomIndex,
			link: JAZZY_LINKS[randomIndex]
		}
	})
	const background = {
		mood: 'chill',
		set: 'chill',
		scene: 'chill1',
		show1: true,
		day: true,
		rainy: false,
		link1: BACKGROUND_LINKS_LIST.find(
			(item) =>
				item.set === 'chill' &&
				item.scene === 'chill1' &&
				item.day === true &&
				item.rainy === false
		).link,
		link2: ''
	}

	const value = {
		currentSong,
		setCurrentSong,
		modalType,
		setModalType,
		background
	}

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
export default AppProvider
