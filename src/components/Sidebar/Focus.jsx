import { useContext } from 'react'

import { AppContext } from '../../context/AppProvider'
import { FOCUS_ICONS } from '../../constants'
import Button from '../Button'

function Focus({ setMenuTab }) {
	const { setModalType } = useContext(AppContext)

	return (
		<div className="m-4">
			<h4 className="mb-4 text-lg font-bold select-none">Productivity</h4>
			<div>
				{FOCUS_ICONS.map((item) => (
					<Button
						key={item.label}
						className="flex flex-row items-center w-full bg-gr p-2 pl-4 mb-3 rounded-xl cursor-pointer"
						onClick={() => {
							setModalType(item.modalType)
							setMenuTab(null)
						}}
					>
						<img
							src={item.icon}
							alt={item.label}
							className="opacity-20 brightness-[200]"
						/>
						<h6 className="mx-4 font-medium">{item.label}</h6>
					</Button>
				))}
			</div>
		</div>
	)
}
export default Focus
