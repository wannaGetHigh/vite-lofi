import { useState } from 'react'
import { SETS } from '../../constants'
import Button from '../Button'

function Set() {
	return (
		<div className="max-h-[600px] overflow-y-auto flex flex-col m-4">
			<h4 className="text-lg font-bold select-none">Change Set</h4>
			{SETS.map((set) => (
				<div
					key={set.set}
					className="bg-semi-back my-2 cursor-pointer rounded-2xl"
				>
					<img src={set.img} alt={set.set} />
				</div>
			))}
		</div>
	)
}
export default Set
