import { useState, useContext } from 'react'

import { arrowLeftIcon } from '../../assets/icons'
import { SETS } from '../../constants'
import Button from '../Button'
import { AppContext } from '../../context/AppProvider'
import changeBackground from '../../utils/changeBackground'

function Set() {
	const { background, setBackground } = useContext(AppContext)
	const [mode, setMode] = useState(null)

	const handleChangeBg = (item) => {
		const condition = {
			set: mode,
			scene: item.scene,
			day: background.set === mode ? background.day : true,
			rainy: background.set === mode ? background.rainy : false,
		}

		const newBg = changeBackground(background, condition)

		setBackground(newBg)
	}

	return !mode ? (
		<div className="max-h-[600px] overflow-y-auto flex flex-col m-4">
			<h4 className="text-lg font-bold select-none">Change Set</h4>
			{SETS.map((set) => (
				<Button
					key={set.set}
					className="bg-semi-back my-2 rounded-2xl"
					onClick={() => setMode(set.set)}
				>
					<img src={set.img} alt={set.set} className="animate-fadeIn1s" />
				</Button>
			))}
		</div>
	) : (
		<div className="m-4">
			<div className="flex items-center">
				<Button onClick={() => setMode(null)}>
					<img src={arrowLeftIcon} alt="back" className="w-4 h-4 mx-2" />
				</Button>
				<h4 className="text-xl font-bold select-none flex-1 text-center">
					Switch scene
				</h4>
			</div>

			{SETS.find((set) => set.set === mode).scenes.map((set) => (
				<Button
					key={set.set}
					className="relative w-full bg-semi-back mt-2"
					onClick={handleChangeBg.bind(this, set)}
				>
					{set.scene === background.scene && (
						<div className="absolute top-2 right-2 h-[28px] w-[28px] rounded-full bg-primary"></div>
					)}
					<img
						src={set.img}
						alt={set.scene}
						className="w-full rounded-2xl animate-fadeIn1s"
					/>
				</Button>
			))}
		</div>
	)
}
export default Set
