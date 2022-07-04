import { useState } from 'react'
import Button from './Button'
import {
	prevIcon,
	nextIcon,
	playIcon,
	pauseIcon,
	clockIcon
} from '../assets/icons'

function Audio() {
	const [isPlaying, setIsPlaying] = useState(false)

	return (
		<div className="fixed bottom-0 w-screen z-20">
			<div className="py-4 px-8 flex flex-row items-center">
				<p className="opacity-80 text-sm select-none">
					Music by - lofi.co 2021 &copy;
				</p>
				<div className="flex-1 flex justify-center items-center">
					<Button>
						<img src={prevIcon} alt="prev" />
					</Button>
					<Button className={`mx-4 ${isPlaying ? 'hidden' : ''}`}>
						<img src={playIcon} alt="play" width={54} height={54} />
					</Button>
					<Button className={`mx-4 ${!isPlaying ? 'hidden' : ''}`}>
						<img src={pauseIcon} alt="pause" width={54} height={54} />
					</Button>
					<Button>
						<img src={nextIcon} alt="next" />
					</Button>
				</div>
				<div
					className={`invisible flex items-center text-sm italic backdrop-blur-sm rounded-[20px] py-1.5 px-4 cursor-pointer min-w-[155px]`}
				>
					<p className="opacity-50"> / </p>
					<img
						src={clockIcon}
						alt="clock"
						className="w-[18px] h-[18px] mx-2.5"
					/>
					<p className="opacity-50">
						{/* {isBreak ? convertTime(breakTime) : convertTime(pomodoroTime)} */}
					</p>
				</div>
			</div>
		</div>
	)
}
export default Audio
