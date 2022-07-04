import { createContext, useState } from 'react'

import JAZZY_LINKS from '../constants/links/jazzy'

export const AppContext = createContext()

function AppProvider({ children }) {
	const [currentSong, setCurrentSong] = useState(() => {
		let randomIndex = Math.floor(Math.random() * JAZZY_LINKS.length)
		return {
			list: JAZZY_LINKS,
			index: randomIndex,
			link: JAZZY_LINKS[randomIndex]
		}
	})
	const value = { currentSong, setCurrentSong }

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
export default AppProvider
