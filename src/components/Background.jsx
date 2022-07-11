import { useContext } from 'react'
import { AppContext } from '../context/AppProvider'

function Background() {
	const { background } = useContext(AppContext)

	return (
		<div className="absolute inset-0">
			<div
				className={`absolute inset-0 transition-opacity duration-500 ease-in-out delay-500 ${
					background.show1 ? 'opacity-100' : 'opacity-0'
				}`}
			>
				<video
					preload="auto"
					loop
					autoPlay
					muted
					src={background.link1}
					className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-full object-cover"
				></video>
			</div>

			<div
				className={`absolute inset-0 transition-opacity duration-500 ease-in-out delay-500 ${
					!background.show1 ? 'opacity-100' : 'opacity-0'
				}`}
			>
				<video
					preload="auto"
					loop
					autoPlay
					muted
					src={background.link2}
					className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-full object-cover"
				></video>
			</div>
		</div>
	)
}
export default Background
