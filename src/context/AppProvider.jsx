import { createContext, useState, useRef } from 'react'

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
			link: JAZZY_LINKS[randomIndex],
		}
	})
	const [background, setBackground] = useState({
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
				item.rainy === false,
		).link,
		link2: '',
	})
	const audioRef = useRef()

	const value = {
		audioRef,
		currentSong,
		setCurrentSong,
		modalType,
		setModalType,
		background,
		setBackground,
	}

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
export default AppProvider
