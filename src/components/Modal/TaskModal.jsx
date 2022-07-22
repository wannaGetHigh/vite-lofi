import { useContext, useEffect, useState } from 'react'
import Draggable from 'react-draggable'
import ReactSwitch from 'react-switch'
import { Listbox, Popover } from '@headlessui/react'
import { v4 as uuidv4 } from 'uuid'

import Button from '../Button'
import { AppContext, AuthContext } from '../../context'
import { ALARM_LINKS } from '../../constants'
import {
	closeIcon,
	skipIcon,
	titleTasksIcon,
	settingIcon,
	arrowLeftIcon,
	minusIcon,
	plusIcon,
	emptyIcon,
	taskCheckIcon,
	taskUnCheckIcon,
	threeDotsIcon,
	currentIcon,
	binIcon,
} from '../../assets/icons'
import { convertTime } from '../../utils'
import { updateUser } from '../../firebase'

function TaskModal() {
	const { setModalType, currentSession } = useContext(AppContext)
	const [timerMode, setTimerMode] = useState(false)

	if (!currentSession.name) {
		setModalType('session')
		return null
	}

	return (
		<Draggable handle=".handle">
			<div className="relative w-[440px] bg-bl rounded-2xl select-none z-40">
				<Button
					className="absolute top-4 right-4"
					onClick={() => setModalType(null)}
				>
					<img src={closeIcon} alt="close share" />
				</Button>

				<div className="p-6">
					{timerMode ? (
						<Timer setTimerMode={setTimerMode} />
					) : (
						<Task setTimerMode={setTimerMode} />
					)}
				</div>
			</div>
		</Draggable>
	)
}

function Task({ setTimerMode }) {
	const {
		currentSession,
		setCurrentSession,
		setModalType,
		breakTimeCd,
		pomodoroTimeCd,
		pomodoroTime,
		breakTime,
		isBreak,
		setIsBreak,
		isBreakTimePlaying,
		setIsBreakTimePlaying,
		isPomodoroTimePlaying,
		setIsPomodoroTimePlaying,
		setPomodoroTimeCd,
		pomodoroTimeout,
		setBreakTimeCd,
		breakTimeout,
		alarmRef,
	} = useContext(AppContext)
	const [isAddingTask, setIsAddingTask] = useState(false)
	const [taskList, setTaskList] = useState(currentSession.taskList)
	const [taskName, setTaskName] = useState('')

	// Add new task
	const handleKeyDown = (e) => {
		if (e.key === 'Enter' && taskName) {
			setTaskList((prev) => [
				...prev,
				{
					id: uuidv4(),
					completed: false,
					name: taskName,
					isCurrent: false,
				},
			])
			setTaskName('')
		} else if (e.key === 'Escape') {
			setIsAddingTask(false)
			setTaskName('')
		}
	}

	const deleteTask = (id) => {
		setTaskList((prev) => prev.filter((task) => task.id !== id))
	}

	const toggleCompleteTask = (id) => {
		setTaskList((prev) =>
			prev.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task,
			),
		)
	}

	const setCurrentTask = (id) => {
		setTaskList((prev) =>
			prev.map((task) =>
				task.id === id
					? { ...task, isCurrent: true }
					: { ...task, isCurrent: false },
			),
		)
	}

	const unsetCurrentTask = () => {
		setTaskList((prev) => prev.map((task) => ({ ...task, isCurrent: false })))
	}

	const handleStartSession = () => {
		isBreak ? setIsBreakTimePlaying(true) : setIsPomodoroTimePlaying(true)
		alarmRef.current.load()
	}

	const handleStopSession = () => {
		if (isBreak) {
			clearTimeout(breakTimeout)
			setIsBreakTimePlaying(false)
		} else {
			clearTimeout(pomodoroTimeout)
			setIsPomodoroTimePlaying(false)
		}
	}

	const handleSkipSession = () => {
		setIsBreak(!isBreak)
		handleStopSession()
		if (!isBreak) {
			setPomodoroTimeCd(pomodoroTime)
			setCurrentSession({
				...currentSession,
				pomodoroCount: currentSession.pomodoroCount + 1,
				pomodoroLength:
					currentSession.pomodoroLength + (pomodoroTime - pomodoroTimeCd),
			})
		} else {
			setBreakTimeCd(breakTime)
			setCurrentSession({
				...currentSession,
				breakCount: currentSession.breakCount + 1,
				breakLength: currentSession.breakLength + (breakTime - breakTimeCd),
			})
		}
	}

	const handleEndSession = () => {
		const completedTask = taskList.filter((task) => task.completed)

		const uncompletedTask = taskList.filter((task) => !task.completed)

		const time = currentSession.pomodoroLength + currentSession.breakLength

		setCurrentSession({
			...currentSession,
			completedTask,
			uncompletedTask,
			time,
		})

		setModalType('end-session')
	}

	// Update current session tasklist when task list change
	useEffect(() => {
		setCurrentSession({ ...currentSession, taskList })
	}, [taskList])

	return (
		<>
			<div className="relative w-5/6 handle cursor-move">
				<h3 className="text-3xl font-bold select-none">Timer and Tasks</h3>
				<img
					src={titleTasksIcon}
					alt="title task"
					className="absolute -bottom-3 left-0 w-[220px]"
				/>
			</div>

			<div className="flex justify-between my-5 p-2 bg-transparent-w-05 rounded-full">
				<Button
					className={`flex-1 py-1.5 px-6 text-sm font-semibold text-center rounded-full ${
						!isBreak ? 'bg-primary text-black' : 'opacity-50'
					} hover:opacity-100`}
					onClick={() => setIsBreak(false)}
				>
					Pomodoro
				</Button>
				<Button
					className={`flex-1 py-1.5 px-6  text-sm font-semibold text-center rounded-full ${
						isBreak ? 'bg-primary text-black' : 'opacity-50'
					} hover:opacity-100`}
					onClick={() => setIsBreak(true)}
				>
					Break
				</Button>
			</div>

			<div className="flex flex-col items-center h-[208px] bg-transparent-w-05 rounded-lg py-5">
				<p className="text-5xl font-bold">
					{isBreak ? convertTime(breakTimeCd) : convertTime(pomodoroTimeCd)}
				</p>
				<p className="text-xl font-semibold opacity-50">
					{currentSession.name}
				</p>

				<div className="flex my-4">
					{((isBreakTimePlaying && isBreak) ||
						(isPomodoroTimePlaying && !isBreak)) && (
						<Button
							className="flex-1 py-1 px-6 bg-primary text-base font-bold text-black text-center rounded-full"
							onClick={handleStopSession}
						>
							Stop
						</Button>
					)}

					{((!isPomodoroTimePlaying && breakTimeCd === breakTime && !isBreak) ||
						(!isBreakTimePlaying &&
							pomodoroTimeCd === pomodoroTime &&
							isBreak)) && (
						<Button
							className="flex-1 py-1 px-6 bg-primary text-base font-bold text-black text-center rounded-full"
							onClick={handleStartSession}
						>
							Start
						</Button>
					)}

					{((breakTimeCd === breakTime && !isBreak) ||
						(pomodoroTimeCd === pomodoroTime && isBreak)) && (
						<Button onClick={handleSkipSession}>
							<img
								src={skipIcon}
								alt="skip"
								className="w-9 h-[30px] mx-4 invert"
							/>
						</Button>
					)}

					{!isBreak && breakTimeCd < breakTime && <p>You are in Break time</p>}
					{isBreak && pomodoroTimeCd < pomodoroTime && (
						<p>You are in Pomodoro time</p>
					)}
				</div>

				{!isPomodoroTimePlaying && !isBreakTimePlaying && (
					<Button
						className="w-[120px] px-3 py-[3px] border border-white rounded-full text-sm"
						onClick={handleEndSession}
					>
						End session
					</Button>
				)}
			</div>

			<div className="flex justify-between my-3">
				<h3 className="text-xl font-bold">Tasks</h3>
				<Button
					className="mx-1 border border-gray-900 rounded-full"
					onClick={() => setTimerMode(true)}
				>
					<img src={settingIcon} alt="setting" className="w-9 h-9" />
				</Button>
			</div>

			<div className="flex flex-col justify-center bg-transparent-w-05 rounded-lg py-3">
				{taskList.length === 0 ? (
					<img src={emptyIcon} alt="empty task" className="h-10" />
				) : (
					taskList.map((task) => (
						<div key={task.id} className="flex mx-4 my-1">
							<Button onClick={toggleCompleteTask.bind(this, task.id)}>
								<img
									src={task.completed ? taskCheckIcon : taskUnCheckIcon}
									alt="uncompleted"
									className="w-5 h-5"
								/>
							</Button>
							<p className="grow text-sm px-4 py-1">{task.name}</p>
							{task.isCurrent && (
								<img
									src={currentIcon}
									alt="current task"
									className="mx-2 h-5"
								/>
							)}

							<Popover className="relative">
								<Popover.Button>
									<img src={threeDotsIcon} alt="more options" />
								</Popover.Button>

								<Popover.Panel className="absolute z-40 bg-bl-13 w-[178px] py-1 px-4 rounded-lg">
									<Button
										className="flex jutify-between items-center my-2"
										onClick={deleteTask.bind(this, task.id)}
									>
										<img src={binIcon} alt="bin" className="w-8 h-8 mr-1" />
										<p className="text-sm ml-2">Delete task</p>
									</Button>

									{task.isCurrent ? (
										<Button
											className="flex jutify-between items-center my-2"
											onClick={unsetCurrentTask}
										>
											<img
												src={closeIcon}
												alt="current"
												className="w-8 h-4 mr-1"
											/>
											<p className="text-sm ml-2">Unset as current</p>
										</Button>
									) : (
										<Button
											className="flex jutify-between items-center my-2"
											onClick={setCurrentTask.bind(this, task.id)}
										>
											<img
												src={currentIcon}
												alt="current"
												className="w-8 h-[20px] mr-1"
											/>
											<p className="text-sm ml-2">Set as current</p>
										</Button>
									)}
								</Popover.Panel>
							</Popover>
						</div>
					))
				)}
			</div>

			{isAddingTask ? (
				<div className="flex justify-center items-center mt-4">
					<input
						value={taskName}
						autoFocus
						placeholder="New task name (enter to save)"
						className="py-1 px-4 w-full bg-transparent-w-05 rounded-lg"
						onChange={(e) => setTaskName(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
					<Button className="mx-2" onClick={() => setIsAddingTask(false)}>
						<img src={closeIcon} alt="close" />
					</Button>
				</div>
			) : (
				<div className="mt-4 text-center">
					<Button
						className="min-w-[120px] py-1 px-4 text-base text-primary border border-primary rounded-full bg-transparent-b-10"
						onClick={() => setIsAddingTask(true)}
					>
						Add task
					</Button>
				</div>
			)}
		</>
	)
}

function Timer({ setTimerMode }) {
	const { uid } = useContext(AuthContext)
	const {
		setBreakTime,
		breakTime,
		setPomodoroTime,
		pomodoroTime,
		setAlarmLink,
		alarmLink,
		alarmPlay,
		setAlarmPlay,
		isPomodoroTimePlaying,
		isBreakTimePlaying,
		setBreakTimeCd,
		setPomodoroTimeCd,
		alarmRef,
	} = useContext(AppContext)
	const [breakInput, setBreakInput] = useState(breakTime / 60)
	const [pomodoroInput, setPomodoroInput] = useState(pomodoroTime / 60)
	const [selectedAlarm, setSelectedAlarm] = useState(
		ALARM_LINKS.find((item) => item.link === alarmLink),
	)
	const [initSelect, setInitSelect] = useState(true)

	const setFloorTime = (value) => (1 < value ? value - 1 : 1)

	const setCeilTime = (value) => (value < 60 ? value + 1 : 60)

	// Back to Tasks modal and save custome time
	const handleBack = () => {
		setTimerMode(false)
		setBreakTime(breakInput * 60)
		setPomodoroTime(pomodoroInput * 60)

		if (!isPomodoroTimePlaying && !isBreakTimePlaying) {
			setBreakTimeCd(breakInput * 60)
			setPomodoroTimeCd(pomodoroInput * 60)
		}

		updateUser(uid, {
			timer: {
				breakTime: breakInput * 60,
				pomodoroTime: pomodoroInput * 60,
			},
		})
	}

	useEffect(() => {
		if (initSelect) {
			setInitSelect(false)
		} else {
			setAlarmLink(selectedAlarm.link)

			alarmRef.current.load()
			alarmRef.current.play()

			updateUser(uid, {
				'alarm.isOn': alarmPlay,
				'alarm.link': selectedAlarm.link,
			})
		}

		const timeout = setTimeout(() => alarmRef.current.pause(), 5000)
		return () => clearTimeout(timeout)
	}, [selectedAlarm])

	return (
		<div className="h-[530px]">
			<div className="handle cursor-move -mt-6 pt-6">
				<Button
					className="flex justify-center items-center"
					onClick={handleBack}
				>
					<img
						src={arrowLeftIcon}
						alt="back to task"
						className="h-[14px] w-[14px] mr-2"
					/>
					<span>Back</span>
				</Button>
			</div>

			<div className="flex justify-center items-center my-8">
				<div className="flex-1">
					<h5 className="font-semibold">Pomodoro</h5>
					<div className="flex h-[50px] w-[140px] bg-bl-20 my-4 rounded-xl overflow-hidden">
						<img
							src={minusIcon}
							alt="minus"
							className="w-1/3 hover:bg-primary cursor-pointer p-4"
							onClick={() => setPomodoroInput(setFloorTime)}
						/>
						<input
							type="number"
							value={pomodoroInput}
							className="w-1/3 text-right pointer-events-none bg-inherit"
						/>
						<img
							src={plusIcon}
							alt="plus"
							className="w-1/3 hover:bg-primary cursor-pointer p-4"
							onClick={() => setPomodoroInput(setCeilTime)}
						/>
					</div>
				</div>

				<div className="flex-1">
					<h5 className="font-semibold">Break</h5>
					<div className="flex h-[50px] w-[140px] bg-bl-20 my-4 rounded-xl overflow-hidden">
						<img
							src={minusIcon}
							alt="minus"
							className="w-1/3 hover:bg-primary cursor-pointer p-4"
							onClick={() => setBreakInput(setFloorTime)}
						/>
						<input
							type="number"
							value={breakInput}
							className="w-1/3 text-right pointer-events-none bg-inherit"
						/>
						<img
							src={plusIcon}
							alt="plus"
							className="w-1/3 hover:bg-primary cursor-pointer p-4"
							onClick={() => setBreakInput(setCeilTime)}
						/>
					</div>
				</div>
			</div>

			<div className="flex justify-start items-start my-8">
				<div className="flex-1">
					<h5 className="font-semibold">Play alarm?</h5>
					<ReactSwitch
						className="mx-4 mt-2"
						checked={alarmPlay}
						onChange={() => setAlarmPlay(!alarmPlay)}
						offColor="#0E0E0D"
						onColor="#f3a952"
						offHandleColor="#fff"
						onHandleColor="#fff"
						checkedIcon={false}
						uncheckedIcon={false}
						activeBoxShadow="0px 0px 0px 0px transparent"
					/>
				</div>

				<div className="flex-1">
					<h5 className="font-semibold">Alarm Sound</h5>
					<div className="relative mt-2">
						<Listbox value={selectedAlarm} onChange={setSelectedAlarm}>
							<Listbox.Button className="w-full bg-bl-20 py-2 pl-4 pr-5 rounded-lg text-sm text-left">
								{selectedAlarm.name}
							</Listbox.Button>
							<Listbox.Options className="absolute top-12 left-0 w-full rounded-lg p-1 bg-bl-20">
								{ALARM_LINKS.map((alarm) => (
									<Listbox.Option
										key={alarm.name}
										className={({ active }) =>
											`${
												active ? ' bg-[rgba(243,169,82,0.33)] rounded-md ' : ''
											} text-sm cursor-pointer duration-200 ease-in-out select-none relative mx-1`
										}
										value={alarm}
									>
										{({ selected }) => (
											<>
												<span
													className={`${
														selected
															? 'font-semibold bg-primary rounded-md'
															: 'font-normal'
													} block truncate my-1 py-1 px-4`}
												>
													{alarm.name}
												</span>
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Listbox>
					</div>
				</div>
			</div>
		</div>
	)
}
export default TaskModal
