import Background from './components/Background'
import Navbar from './components/Navbar'
import Audio from './components/Audio'
import Sidebar from './components/Sidebar'
import Modal from './components/Modal/Modal'

function App() {
	return (
		<div className="min-h-screen overflow-hidden bg-[#1c1a23]">
			<Background />

			<Navbar />

			<Audio />

			<Sidebar />

			<Modal />
		</div>
	)
}

export default App
