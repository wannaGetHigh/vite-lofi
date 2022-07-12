import { useState, useContext } from 'react'
import ReactSwitch from 'react-switch'

import { logoImg } from '../../assets/images'
import { moonIcon, sunIcon, expandIcon, shareIcon } from '../../assets/icons'
import Button from '../Button'
import MenuDropdow from './MenuDropdown'
import { AppContext } from '../../context/AppProvider'

function Navbar() {
	const { setModalType } = useContext(AppContext)
	const [isChecked, setIsChecked] = useState(true)
	const [fullScreen, setFullScreen] = useState(false)

	const toggleFullscreen = () => {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen()
			setFullScreen(true)
		} else if (document.fullscreenElement) {
			document.exitFullscreen()
			setFullScreen(false)
		}
	}

	return (
		<div className="fixed top-0 z-20 w-screen flex flex-row justify-between items-center px-12">
			<img src={logoImg} alt="logo" className="h-[100px]" />

			<div className="flex flex-row items-center gap-x-4">
				<ReactSwitch
					checked={isChecked}
					onChange={() => setIsChecked(!isChecked)}
					handleDiameter={26}
					height={30}
					width={62}
					offColor="#545459"
					onColor="#f3a952"
					activeBoxShadow="0px 0px 0px 0px transparent"
					uncheckedIcon={
						<div className="flex justify-center items-center h-full">
							<img src={moonIcon} alt="moon" />
						</div>
					}
					checkedIcon={
						<div className="flex justify-center items-center h-full">
							<img src={sunIcon} alt="sun" />
						</div>
					}
				/>

				{!fullScreen && (
					<div
						className="flex items-center gap-x-2 bg-gradient-269deg px-4 py-1 rounded-lg cursor-pointer"
						onClick={() => setModalType('upgrade')}
					>
						<h3 className="text-3xl">🚀</h3>
						<p className="font-bold text-sm">
							Access +20 sences
							<br />& more with premium
						</p>
					</div>
				)}

				<Button onClick={() => setModalType('share')}>
					<img src={shareIcon} alt="share-link" className="w-8 h-8" />
				</Button>

				<Button onClick={toggleFullscreen}>
					<img src={expandIcon} alt="full-screen" className="w-8 h-8" />
				</Button>

				<MenuDropdow />
			</div>
		</div>
	)
}
export default Navbar
