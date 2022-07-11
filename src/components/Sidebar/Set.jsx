import { useState } from 'react'

import { arrowLeftIcon } from '../../assets/icons'
import { SETS } from '../../constants'
import Button from '../Button'

function Set() {
	const [mode, setMode] = useState(null)

	return !mode ? (
		<div className="max-h-[600px] overflow-y-auto flex flex-col m-4">
			<h4 className="text-lg font-bold select-none">Change Set</h4>
			{SETS.map((set) => (
				<div
					key={set.set}
					className="bg-semi-back my-2 cursor-pointer rounded-2xl"
					onClick={() => setMode(set.set)}
				>
					<img src={set.img} alt={set.set} className="animate-fadeIn1s" />
				</div>
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
				<div
					key={set.scene}
					className="w-full bg-semi-back my-4 cursor-pointer"
				>
					<img
						src={set.img}
						alt={set.scene}
						className="w-full rounded-2xl animate-fadeIn1s"
					/>
				</div>
			))}
		</div>
	)
}
export default Set
