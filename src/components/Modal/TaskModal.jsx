import { useContext, useState } from 'react'
import Draggable from 'react-draggable'
import ReactSwitch from 'react-switch'
import { Listbox, Menu, Transition } from '@headlessui/react'

import Button from '../Button'
import { AppContext } from '../../context/AppProvider'
import { ALARM_LINKS } from '../../constants'
import {
	closeIcon,
	skipIcon,
	titleTasksIcon,
	settingIcon,
	emptyIcon,
	arrowLeftIcon,
	minusIcon,
	plusIcon,
} from '../../assets/icons'

function TaskModal() {
	const { setModalType } = useContext(AppContext)
	const [timerMode, setTimerMode] = useState(false)

	return (
		<Draggable handle=".handle">
			<div className="relative w-[440px] bg-bl rounded-2xl select-none z-50">
				<Button
					className="absolute top-4 right-4 hover:opacity-50 cursor-pointer"
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
	return (
		<>
			<div className="relative handle cursor-move">
				<h3 className="text-3xl font-bold select-none">Timer and Tasks</h3>
				<img
					src={titleTasksIcon}
					alt="title-draw"
					className="absolute -bottom-3 left-0 w-[220px]"
				/>
			</div>

			<div className="flex justify-between my-5 p-2 bg-transparent-w-05 rounded-full">
				<Button className="flex-1 py-1.5 px-6 bg-primary text-sm font-semibold text-black text-center rounded-full">
					Pomodoro
				</Button>
				<Button className="flex-1 py-1.5 px-6 bg-primary text-sm font-semibold text-black text-center rounded-full">
					Break
				</Button>
			</div>

			<div className="flex flex-col items-center bg-transparent-w-05 rounded-lg py-5">
				<p className="text-5xl font-bold">25:00</p>
				<p className="text-xl font-semibold opacity-50">coding</p>
				<div className="flex my-4">
					<Button className="flex-1 py-1 px-6 bg-primary text-base font-bold text-black text-center rounded-full">
						Start
					</Button>
					<Button>
						<img
							src={skipIcon}
							alt="skip"
							className="w-9 h-[30px] mx-4 invert"
						/>
					</Button>
				</div>
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

			<div className="flex flex-col items-center justify-center bg-transparent-w-05 rounded-lg py-5">
				<img src={emptyIcon} alt="empty task" />
			</div>

			<div className="mt-4 text-center">
				<Button className="min-w-[120px] py-1 px-4 text-base text-primary border border-primary rounded-full bg-transparent-b-10">
					Add task
				</Button>
			</div>
		</>
	)
}

function Timer({ setTimerMode }) {
	const [pomodoroTime, setPomodoroTime] = useState(25)
	const [breakTime, setBreakTime] = useState(5)
	const [isChecked, setIsChecked] = useState(false)
	const [selectedAlarm, setSelectedAlarm] = useState(ALARM_LINKS[0])

	return (
		<div className="h-[530px]">
			<div className="handle cursor-move -mt-6 pt-6">
				<Button
					className="flex justify-center items-center"
					onClick={() => setTimerMode(false)}
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
							onClick={() => setPomodoroTime((prev) => prev - 1)}
						/>
						<input
							type="number"
							min={1}
							value={pomodoroTime}
							className="w-1/3 text-center pointer-events-none bg-inherit"
						/>
						<img
							src={plusIcon}
							alt="plus"
							className="w-1/3 hover:bg-primary cursor-pointer p-4"
							onClick={() => setPomodoroTime((prev) => prev + 1)}
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
							onClick={() => setBreakTime((prev) => prev - 1)}
						/>
						<input
							type="number"
							min={1}
							value={breakTime}
							className="w-1/3 text-center pointer-events-none bg-inherit"
						/>
						<img
							src={plusIcon}
							alt="plus"
							className="w-1/3 hover:bg-primary cursor-pointer p-4"
							onClick={() => setBreakTime((prev) => prev + 1)}
						/>
					</div>
				</div>
			</div>

			<div className="flex justify-start items-start my-8">
				<div className="flex-1">
					<h5 className="font-semibold">Play alarm?</h5>
					<ReactSwitch
						className="mx-4 mt-2"
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
