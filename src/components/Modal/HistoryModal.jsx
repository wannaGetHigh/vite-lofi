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

function HistoryModal() {
	const { setModalType } = useContext(AppContext)
	const [isDetail, setIsDetail] = useState(false)

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
					{!isDetail ? (
						<Overview setIsDetail={setIsDetail} />
					) : (
						<Detail setIsDetail={setIsDetail} />
					)}
				</div>
			</div>
		</Draggable>
	)
}

function Overview({ setIsDetail }) {
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
				<img src={activityIcon} alt="activities" className="self-start mt-2" />
				<div className="flex flex-col w-full mx-4">
					<h3 className="mx-4 my-2 text-xl font-semibold">Activity</h3>
					<div className="flex justify-between w-full my-2 mx-4">
						<div>
							<p className="text-sm opacity-50">Total Sessions</p>
							<p className="text-xl font-bold">20</p>
						</div>
						<div>
							<p className="text-sm opacity-50">Total Hour</p>
							<p className="text-xl font-bold">22</p>
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
					<Button
						className="w-full text-left mt-5 p-5 bg-transparent-w-05 rounded-xl"
						onClick={() => setIsDetail(true)}
					>
						<h5 className="mb-3 text-2xl font-semibold">coding</h5>
						<div className="flex">
							<p className="grow text-5xl font-bold text-primary">
								16<span className="ml-2 text-lg">min</span>
							</p>
							<time className="self-end opacity-50 text-sm">12/07/2022</time>
						</div>
					</Button>

					<Button
						className="w-full text-left mt-5 p-5 bg-transparent-w-05 rounded-xl"
						onClick={() => setIsDetail(true)}
					>
						<h5 className="mb-3 text-2xl font-semibold">coding</h5>
						<div className="flex">
							<p className="grow text-5xl font-bold text-primary">
								16<span className="ml-2 text-lg">min</span>
							</p>
							<time className="self-end opacity-50 text-sm">12/07/2022</time>
						</div>
					</Button>

					<Button
						className="w-full text-left mt-5 p-5 bg-transparent-w-05 rounded-xl"
						onClick={() => setIsDetail(true)}
					>
						<h5 className="mb-3 text-2xl font-semibold">coding</h5>
						<div className="flex">
							<p className="grow text-5xl font-bold text-primary">
								16<span className="ml-2 text-lg">min</span>
							</p>
							<time className="self-end opacity-50 text-sm">12/07/2022</time>
						</div>
					</Button>
				</div>
			</div>
		</>
	)
}

function Detail({ setIsDetail }) {
	return (
		<>
			<div className="handle cursor-move -mt-6 pt-6">
				<Button
					className="flex justify-center items-center"
					onClick={() => setIsDetail(false)}
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
					<h3 className="mb-1 text-2xl font-semibold">coding</h3>
					<div className="flex justify-between items-center py-2 text-sm border-b border-transparent-w-05">
						<p>Date:</p>
						<time className="text-primary">12/07/2022</time>
					</div>
					<div className="flex justify-between items-center py-2 text-sm">
						<p>Length:</p>
						<time className="text-primary">16:20</time>
					</div>
				</div>
			</div>

			<div className="h-[300px]">
				<div className="my-4">
					<div className="flex items-center mb-4">
						<h5 className="text-lg font-semibold mr-4">Completed Tasks</h5>
						<img src={checkIcon} alt="completed icon" />
					</div>
					<p className="text-sm opacity-50">None</p>
				</div>

				<div className="my-4">
					<div className="flex items-center mb-4">
						<h5 className="text-lg font-semibold mr-4">Uncompleted Tasks</h5>
						<img src={uncheckIcon} alt="completed icon" />
					</div>
					<p className="text-sm opacity-50">None</p>
				</div>
			</div>
		</>
	)
}

export default HistoryModal
