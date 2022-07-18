import { useState, useContext } from 'react'
import ReactSwitch from 'react-switch'

import { logoImg } from '../../assets/images'
import {
	moonIcon,
	sunIcon,
	expandIcon,
	shareIcon,
	sunnyIcon,
	rainyIcon,
} from '../../assets/icons'
import Button from '../Button'
import MenuDropdow from './MenuDropdown'
import { AppContext } from '../../context/AppProvider'
import { canSwitchBackground, changeBackground } from '../../utils'

function Navbar() {
	const { setModalType, background, setBackground } = useContext(AppContext)
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

	const [canSwitchToNight, canSwitchToRain] = canSwitchBackground(background)

	const handleChangeBg = (mode) => {
		const condition = {
			set: background.set,
			scene: background.scene,
			day: mode === 'day' ? !background.day : background.day,
			rainy: mode === 'rainy' ? !background.rainy : background.rainy,
		}
		const newBg = changeBackground(background, condition)

		setBackground(newBg)
	}

	return (
		<div className="fixed top-0 z-40 w-screen flex flex-row justify-between items-center px-12 animate-fadeIn1s">
			<img src={logoImg} alt="logo" className="h-[100px]" />

			<div className="flex flex-row items-center gap-x-4">
				{canSwitchToNight && (
					<ReactSwitch
						checked={background.day}
						onChange={handleChangeBg.bind(this, 'day')}
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
				)}

				{canSwitchToRain && (
					<ReactSwitch
						checked={!background.rainy}
						onChange={handleChangeBg.bind(this, 'rainy')}
						handleDiameter={26}
						height={30}
						width={62}
						offColor="#545459"
						onColor="#f3a952"
						activeBoxShadow="0px 0px 0px 0px transparent"
						uncheckedIcon={
							<div className="flex justify-center items-center h-full">
								<img src={rainyIcon} alt="moon" />
							</div>
						}
						checkedIcon={
							<div className="flex justify-center items-center h-full">
								<img src={sunnyIcon} alt="sun" />
							</div>
						}
					/>
				)}

				{!fullScreen && (
					<>
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

						<Button className="py-[5px] px-4 bg-transparent-w-25 rounded-lg text-sm font-medium leading-[22px]">
							Sign up
						</Button>
					</>
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
