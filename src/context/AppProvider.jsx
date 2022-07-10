import { createContext, useState } from 'react'

import { JAZZY_LINKS } from '../constants'

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
	const value = { currentSong, setCurrentSong, modalType, setModalType }

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
export default AppProvider
