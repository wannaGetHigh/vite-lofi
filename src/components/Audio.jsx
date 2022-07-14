import { useState, useContext } from 'react'
import Button from './Button'
import {
	prevIcon,
	nextIcon,
	playIcon,
	pauseIcon,
	clockIcon,
} from '../assets/icons'
import { AppContext } from '../context/AppProvider'
import { nextSong, prevSong } from '../utils'

function Audio() {
	const { currentSong, setCurrentSong, audioRef } = useContext(AppContext)
	const [isPlaying, setIsPlaying] = useState(false)

	const handleNextSong = () => {
		const newSong = nextSong(currentSong.list, currentSong.index)
		setCurrentSong(newSong)
		setIsPlaying(true)
		audioRef.current.play()
	}

	const handlePrevSong = () => {
		const newSong = prevSong(currentSong.list, currentSong.index)
		setCurrentSong(newSong)
		setIsPlaying(true)
		audioRef.current.play()
	}

	const handlePlay = () => {
		setIsPlaying(true)
		audioRef.current.play()
	}

	const handlePause = () => {
		audioRef.current.pause()
		setIsPlaying(false)
	}

	return (
		<div className="fixed bottom-0 w-screen z-20">
			<div className="py-4 px-8 flex flex-row items-center">
				<p className="opacity-80 text-sm select-none">
					Music by - lofi.co 2021 &copy;
				</p>
				<div className="flex-1 flex justify-center items-center">
					<Button onClick={handlePrevSong}>
						<img src={prevIcon} alt="prev" />
					</Button>
					<Button
						className={`mx-4 ${isPlaying ? 'hidden' : ''}`}
						onClick={handlePlay}
					>
						<img src={playIcon} alt="play" width={54} height={54} />
					</Button>
					<Button
						className={`mx-4 ${!isPlaying ? 'hidden' : ''}`}
						onClick={handlePause}
					>
						<img src={pauseIcon} alt="pause" width={54} height={54} />
					</Button>
					<Button onClick={handleNextSong}>
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
			<audio preload="auto" ref={audioRef} src={currentSong.link} />
		</div>
	)
}
export default Audio
