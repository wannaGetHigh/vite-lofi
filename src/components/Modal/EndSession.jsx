import { useContext } from 'react'

import { checkIcon, uncheckIcon } from '../../assets/icons'
import Button from '../Button'
import { AppContext, AuthContext } from '../../context'
import { convertTime } from '../../utils'
import { addNewSession } from '../../firebase'

function EndSession() {
	const { uid } = useContext(AuthContext)
	const { setModalType, currentSession, setCurrentSession, setIsBreak } =
		useContext(AppContext)

	const refreshSession = () => {
		// update session in firestore
		addNewSession(uid, currentSession)

		setCurrentSession({
			name: '',
			time: 0,
			pomodoroLength: 0,
			breakLength: 0,
			pomodoroCount: 0,
			breakCount: 0,
			taskList: [],
			completedTask: [],
			uncompletedTask: [],
		})
		setIsBreak(false)
		setModalType(null)
	}

	return (
		<div className="absolute inset-0 flex justify-center text-left bg-transparent-b-70 backdrop-blur-xl z-40">
			<div className="w-[400px] h-5/6 flex flex-col p-2 select-none">
				<h1 className="mt-8 mb-4 text-5xl font-bold text-primary text-center">
					Good Job!
				</h1>

				<div>
					<h3 className="text-3xl font-bold">{currentSession.name}</h3>
					<div className="flex justify-between text-sm my-2">
						<p>Length:</p>
						<time className="text-primary">
							{convertTime(currentSession.time)}
						</time>
					</div>
					<div className="flex justify-between text-sm my-2">
						<p>Completed Pomodoros:</p>
						<time className="text-primary">{currentSession.pomodoroCount}</time>
					</div>
					<div className="flex justify-between text-sm my-2">
						<p>Breaks taken:</p>
						<time className="text-primary">{currentSession.breakCount}</time>
					</div>
				</div>

				<div className="flex-1 over-flow-auto">
					<div className="mt-4 mb-2">
						<div className="flex items-center mb-4">
							<h5 className="text-lg font-semibold mr-4">Completed Task</h5>
							<img src={checkIcon} alt="completed icon" />
						</div>
						{currentSession.completedTask.length === 0 ? (
							<p className="text-sm opacity-50">None</p>
						) : (
							currentSession.completedTask.map((task) => (
								<div
									key={task.id}
									className="py-1 px-4 my-1 text-center text-medium bg-transparent-b-60 rounded-lg"
								>
									{task.name}
								</div>
							))
						)}
					</div>

					<div className="mt-4 mb-2">
						<div className="flex items-center mb-4">
							<h5 className="text-lg font-semibold mr-4">Uncompleted Task</h5>
							<img src={uncheckIcon} alt="completed icon" />
						</div>
						{currentSession.uncompletedTask.length === 0 ? (
							<p className="text-sm opacity-50">None</p>
						) : (
							currentSession.uncompletedTask.map((task) => (
								<div
									key={task.id}
									className="py-1 px-4 my-1 text-center text-medium bg-transparent-b-60 rounded-lg"
								>
									{task.name}
								</div>
							))
						)}
					</div>
				</div>

				<Button
					className="w-full rounded-full px-4 py-1 my-2 text-black text-base font-semibold bg-primary"
					onClick={refreshSession}
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
