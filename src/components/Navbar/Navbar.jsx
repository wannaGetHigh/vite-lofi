import { useState } from 'react'
import Button from '../Button'
import ReactSwitch from 'react-switch'

import { logoImg } from '../../assets/images'
import { moonIcon, sunIcon, expandIcon, shareIcon } from '../../assets/icons'
import MenuDropdow from './MenuDropdown'

function Navbar() {
	const [isChecked, setIsChecked] = useState(true)

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

				<div className="flex items-center gap-x-2 bg-gradient-269deg px-4 py-1 rounded-lg cursor-pointer">
					<h3 className="text-3xl">🚀</h3>
					<p className="font-bold text-sm">
						Access +20 sences
						<br />& more with premium
					</p>
				</div>

				<Button>
					<img src={shareIcon} alt="share-link" />
				</Button>

				<Button>
					<img src={expandIcon} alt="full-screen" />
				</Button>

				<MenuDropdow />
			</div>
		</div>
	)
}
export default Navbar
