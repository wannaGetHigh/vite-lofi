import { useState } from 'react'
import { useIdleTimer } from 'react-idle-timer'

import Background from './components/Background'
import Navbar from './components/Navbar'
import Audio from './components/Audio'
import Sidebar from './components/Sidebar'
import Modal from './components/Modal/Modal'

function App() {
	const [isIdle, setIsIdle] = useState(false)
	const onIdle = () => {
		setIsIdle(true)
		console.log(isIdle)
	}

	const onActive = () => {
		setIsIdle(false)
		console.log(isIdle)
	}

	useIdleTimer({ timeout: 1000 * 5, onIdle, onActive })

	return (
		<div className="min-h-screen overflow-hidden bg-[#1c1a23]">
			<Background />

			<div className={isIdle ? 'opacity-0' : 'opacity-100'}>
				<Audio />

				<Sidebar />

				<Navbar />

				<Modal />
			</div>
		</div>
	)
}

export default App
