import { useContext, useState } from 'react'
import Draggable from 'react-draggable'

import Button from '../Button'
import { AppContext } from '../../context/AppProvider'
import {
	activityIcon,
	closeIcon,
	titleNotesIcon,
	arrowLeftIcon,
	clockIcon,
	checkIcon,
	uncheckIcon,
} from '../../assets/icons'
import { convertTime, totalHour } from '../../utils'

function HistoryModal() {
	const { setModalType } = useContext(AppContext)
	const [sessionDetail, setSessionDetail] = useState()

	return (
		<Draggable handle=".handle">
			<div className="relative w-[440px] bg-bl rounded-3xl select-none z-40">
				<Button
					className="absolute top-4 right-4 hover:opacity-50 cursor-pointer"
					onClick={() => setModalType(null)}
				>
					<img src={closeIcon} alt="close notes" />
				</Button>

				<div className="p-6">
					{!sessionDetail ? (
						<Overview setSessionDetail={setSessionDetail} />
					) : (
						<Detail
							setSessionDetail={setSessionDetail}
							sessionDetail={sessionDetail}
						/>
					)}
				</div>
			</div>
		</Draggable>
	)
}

function Overview({ setSessionDetail }) {
	const { sessionList } = useContext(AppContext)

	return (
		<>
			<div className="relative w-11/12 handle mb-6 cursor-move">
				<h3 className="ml-4 text-4xl font-bold">Logs</h3>
				<img
					src={titleNotesIcon}
					alt="title-draw"
					className="absolute left-2.5 -bottom-2.5 pointer-events-none"
				/>
			</div>

			<div className="flex py-3 px-6 mb-8 bg-transparent-w-05 rounded-xl">
				<div className="my-4">
					<img
						src={activityIcon}
						alt="activities"
						className="self-start h-8 w-8 mt-2"
					/>
				</div>
				<div className="flex flex-col w-full mx-4">
					<h3 className="mx-4 my-2 text-xl font-semibold">Activity</h3>
					<div className="flex justify-between w-full my-2 mx-4">
						<div>
							<p className="text-sm opacity-50">Total Sessions</p>
							<p className="text-xl font-bold">{sessionList.length}</p>
						</div>
						<div>
							<p className="text-sm opacity-50">Total Hour</p>
							<p className="text-xl font-bold">{totalHour(sessionList)}</p>
						</div>
						<div>
							<p className="text-sm opacity-50">Day Streak</p>
							<p className="text-xl font-bold">1</p>
						</div>
					</div>
				</div>
			</div>

			<div>
				<h3 className="my-2 text-xl font-semibold">Sessions</h3>
				<div className="h-[300px] max-h-[300px] overflow-y-auto">
					{sessionList.length === 0 ? (
						<p className="text-center">No activity yet</p>
					) : (
						sessionList.map((session, index) => (
							<Button
								key={index}
								className="w-full text-left mt-5 p-5 bg-transparent-w-05 rounded-xl"
								onClick={() => setSessionDetail(session)}
							>
								<h5 className="mb-3 text-2xl font-semibold">{session.name}</h5>
								<div className="flex">
									<p className="grow text-5xl font-bold text-primary">
										{Math.round(session.time / 60)}
										<span className="ml-2 text-lg">min</span>
									</p>
									<time className="self-end opacity-50 text-sm">
										{session.date}
									</time>
								</div>
							</Button>
						))
					)}
				</div>
			</div>
		</>
	)
}

function Detail({ setSessionDetail, sessionDetail }) {
	console.log(sessionDetail)
	return (
		<>
			<div className="handle cursor-move -mt-6 pt-6">
				<Button
					className="flex justify-center items-center"
					onClick={() => setSessionDetail(null)}
				>
					<img
						src={arrowLeftIcon}
						alt="back to task"
						className="h-[14px] w-[14px] mr-2"
					/>
					<span>Back</span>
				</Button>
			</div>

			<div className="flex mx-4 my-6">
				<img src={clockIcon} alt="clock" className="self-start w-9 h-9" />
				<div className="grow ml-10 flex flex-col">
					<h3 className="mb-1 text-2xl font-semibold">{sessionDetail.name}</h3>
					<div className="flex justify-between items-center py-2 text-sm border-b border-transparent-w-05">
						<p>Date:</p>
						<time className="text-primary">{sessionDetail.date}</time>
					</div>
					<div className="flex justify-between items-center py-2 text-sm">
						<p>Length:</p>
						<time className="text-primary">
							{convertTime(sessionDetail.time)}
						</time>
					</div>
				</div>
			</div>

			<div className="h-[300px]">
				<div className="my-4">
					<div className="flex items-center mb-4">
						<h5 className="text-lg font-semibold mr-4">Completed Tasks</h5>
						<img src={checkIcon} alt="completed icon" />
					</div>
					{sessionDetail.completedTask.length === 0 ? (
						<p className="text-sm opacity-50">None</p>
					) : (
						sessionDetail.completedTask.map((task) => (
							<div
								key={task.id}
								className="py-1 px-4 my-1 text-center text-medium bg-transparent-w-05 rounded-lg"
							>
								{task.name}
							</div>
						))
					)}
				</div>

				<div className="my-4">
					<div className="flex items-center mb-4">
						<h5 className="text-lg font-semibold mr-4">Uncompleted Tasks</h5>
						<img src={uncheckIcon} alt="completed icon" />
					</div>
					{sessionDetail.uncompletedTask.length === 0 ? (
						<p className="text-sm opacity-50">None</p>
					) : (
						sessionDetail.uncompletedTask.map((task) => (
							<div
								key={task.id}
								className="py-1 px-4 my-1 text-center text-medium bg-transparent-w-05 rounded-lg"
							>
								{task.name}
							</div>
						))
					)}
				</div>
			</div>
		</>
	)
}

export default HistoryModal
