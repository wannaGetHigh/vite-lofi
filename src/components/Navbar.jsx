import { useState } from 'react'
import Button from './Button'
import ReactSwitch from 'react-switch'

import { logoImg } from '../assets/images'
import {
	moonIcon,
	sunIcon,
	expandIcon,
	profileIcon,
	shareIcon
} from '../assets/icons'

function Navbar() {
	const [isChecked, setIsChecked] = useState(true)

	return (
		<div className="fixed top-0 z-20 w-screen flex flex-row justify-between items-center px-12">
			<img src={logoImg} alt="logo" className="h-[100px]" />
			<div className="flex flex-row items-center">
				<Button className="p-[18px] font-bold text-lg" activeButton>
					How it works
				</Button>
				<Button className="p-[18px] font-bold text-lg" activeButton>
					Upgrade
				</Button>
				<Button className="p-[18px] font-bold text-lg" activeButton>
					Contact us
				</Button>
				<Button className="p-[18px] font-bold text-lg" activeButton>
					More
				</Button>
			</div>
			<div className="flex-1 flex flex-row items-center">
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
				<Button className="mx-4">
					<img src={expandIcon} alt="full-screen" />
				</Button>
				<Button className="mx-4">
					<img src={profileIcon} alt="full-screen" />
				</Button>
				<Button className="mx-4">
					<img src={shareIcon} alt="full-screen" />
				</Button>
			</div>
		</div>
	)
}
export default Navbar
