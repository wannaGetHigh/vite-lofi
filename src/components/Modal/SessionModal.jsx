import { useState, useContext } from 'react'
import Draggable from 'react-draggable'

import { AppContext } from '../../context/AppProvider'
import Button from '../Button'
import { closeIcon } from '../../assets/icons'

function SessionModal() {
	const { setModalType } = useContext(AppContext)
	const [sessionName, setSessionName] = useState('')

	const startSession = () => {
		if (sessionName) {
			setSessionName('')
			setModalType(null)
		}
	}

	return (
		<Draggable handle=".handle">
			<div className="relative w-[440px] bg-bl rounded-2xl handle cursor-move">
				<Button
					className="absolute top-4 right-4 hover:opacity-50 cursor-pointer"
					onClick={() => setModalType(null)}
				>
					<img src={closeIcon} alt="close share" />
				</Button>

				<div className="p-6">
					<h3 className="text-3xl font-bold select-none text-center">
						Session
					</h3>
					<label htmlFor="session" className="text-sm opacity-50">
						Insert a session name
					</label>
					<br />
					<input
						type="text"
						id="session"
						value={sessionName}
						onChange={(e) => setSessionName(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') startSession()
						}}
						placeholder="Session name"
						className="w-full my-2 px-4 py-2 caret-primary bg-transparent-w-05 rounded-2xl outline-none"
					/>

					<Button
						className="min-w-[120px] flex justify-center items-center m-auto mt-7 p-2 bg-primary font-semibold text-sm text-black rounded-full hover:opacity-50"
						onClick={startSession}
					>
						Start session
					</Button>
				</div>
			</div>
		</Draggable>
	)
}
export default SessionModal
