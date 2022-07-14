import { useContext } from 'react'

import { checkIcon, uncheckIcon } from '../../assets/icons'
import Button from '../Button'
import { AppContext } from '../../context/AppProvider'

function EndSession() {
	const { setModalType } = useContext(AppContext)

	return (
		<div className="absolute inset-0 flex justify-center text-left bg-transparent-b-70 backdrop-blur-xl z-40">
			<div className="w-[400px] h-5/6 flex flex-col p-2 select-none">
				<h1 className="mt-8 mb-4 text-5xl font-bold text-primary text-center">
					Good Job!
				</h1>

				<div>
					<h3 className="text-3xl font-bold">coding</h3>
					<div className="flex justify-between text-sm my-2">
						<p>Length:</p>
						<time className="text-primary">00:00</time>
					</div>
					<div className="flex justify-between text-sm my-2">
						<p>Completed Pomodoros:</p>
						<time className="text-primary">0</time>
					</div>
					<div className="flex justify-between text-sm my-2">
						<p>Breaks taken:</p>
						<time className="text-primary">0</time>
					</div>
				</div>

				<div className="flex-1 over-flow-auto">
					<div className="my-4">
						<div className="flex items-center mb-4">
							<h5 className="text-lg font-semibold mr-4">Completed</h5>
							<img src={checkIcon} alt="completed icon" />
						</div>
						<p className="text-sm opacity-50">None</p>
					</div>

					<div className="my-4">
						<div className="flex items-center mb-4">
							<h5 className="text-lg font-semibold mr-4">Uncompleted</h5>
							<img src={uncheckIcon} alt="completed icon" />
						</div>
						<p className="text-sm opacity-50">None</p>
					</div>
				</div>

				<Button
					className="w-full rounded-full px-4 py-1 my-2 text-black text-base font-semibold bg-primary"
					onClick={() => setModalType(null)}
				>
					Done
				</Button>

				<p className="text-sm text-center opacity-50 select-none">
					You can find this recap in your session's history
				</p>
			</div>
		</div>
	)
}
export default EndSession
