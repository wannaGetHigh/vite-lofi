import { useContext, useState } from 'react'
import Draggable from 'react-draggable'

import Button from '../Button'
import { AppContext } from '../../context'
import { closeIcon } from '../../assets/icons'
import ReactSwitch from 'react-switch'

function SettingModal() {
	const { setModalType } = useContext(AppContext)
	const [isChecked, setIsChecked] = useState(false)

	return (
		<Draggable handle=".handle">
			<div className="relative flex flex-col h-[500px] w-[440px] p-[24px] bg-bl rounded-2xl handle cursor-move select-none">
				<Button
					className="absolute top-4 right-4 hover:opacity-50 cursor-pointer"
					onClick={() => setModalType(null)}
				>
					<img src={closeIcon} alt="close share" />
				</Button>
				<h3 className="text-lg font-bold">Gerenal Settings</h3>
				<div className="flex justify-between items-center my-4">
					<div className="text-left">
						<h4 className="text-xl font-bold">Hide element</h4>
						<p className="text-sm opacity-50">
							You can chose to show or hide the interface.
						</p>
					</div>
					<ReactSwitch
						checked={isChecked}
						onChange={() => setIsChecked(!isChecked)}
						offColor="#0E0E0D"
						onColor="#f3a952"
						offHandleColor="#fff"
						onHandleColor="#fff"
						checkedIcon={false}
						uncheckedIcon={false}
						activeBoxShadow="0px 0px 0px 0px transparent"
					/>
				</div>

				<div className="flex justify-between py-2 px-8 rounded-lg bg-transparent-w-05">
					<p>Hide After</p>
					<p className="text-primary">15 sec</p>
				</div>
				<div className="flex-1"></div>
				<Button className="w-full px-4 py-1.5 mt-auto rounded-full text-black font-semibold bg-primary">
					Save
				</Button>
			</div>
		</Draggable>
	)
}
export default SettingModal
