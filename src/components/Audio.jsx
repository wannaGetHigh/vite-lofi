import { useContext, useEffect } from 'react'
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
import { NOISE_LINKS } from '../constants'
import { convertTime } from '../utils'

function Audio() {
	const {
		currentSong,
		setCurrentSong,
		audioRef,
		alarmRef,
		alarmLink,
		noisesRef,
		isAudioPlaying,
		setIsPlaying,
		currentSession,
		isBreak,
		breakTimeCd,
		pomodoroTimeCd,
		setModalType,
	} = useContext(AppContext)

	const handleNextSong = () => {
		const newSong = nextSong(currentSong.list, currentSong.index)
		setCurrentSong(newSong)
		setIsPlaying(true)
		audioRef.current.autoplay = true
	}

	const handlePrevSong = () => {
		const newSong = prevSong(currentSong.list, currentSong.index)
		setCurrentSong(newSong)
		setIsPlaying(true)
		audioRef.current.autoplay = true
	}

	const handlePlay = () => {
		setIsPlaying(true)
		audioRef.current.play()
	}

	const handlePause = () => {
		audioRef.current.pause()
		setIsPlaying(false)
	}

	useEffect(
		() =>
			NOISE_LINKS.forEach((_, index) => (noisesRef.current[index].volume = 0)),
		[],
	)

	return (
		<div className="fixed bottom-0 w-screen animate-fadeIn1s z-20">
			<div className="py-4 px-8 flex flex-row items-center">
				<p className="opacity-80 text-sm select-none">
					Music by - lofi.co 2021 &copy;
				</p>
				<div className="flex-1 flex justify-center items-center">
					<Button onClick={handlePrevSong}>
						<img src={prevIcon} alt="prev" />
					</Button>
					<Button
						className={`mx-4 ${isAudioPlaying ? 'hidden' : ''}`}
						onClick={handlePlay}
					>
						<img src={playIcon} alt="play" width={54} height={54} />
					</Button>
					<Button
						className={`mx-4 ${!isAudioPlaying ? 'hidden' : ''}`}
						onClick={handlePause}
					>
						<img src={pauseIcon} alt="pause" width={54} height={54} />
					</Button>
					<Button onClick={handleNextSong}>
						<img src={nextIcon} alt="next" />
					</Button>
				</div>
				<div className=" min-w-[260px]">
					{currentSession.name && (
						<div
							className="flex items-center text-sm italic bg-bl rounded-[20px] py-1.5 px-4 cursor-pointer w-max ml-auto"
							onClick={() => setModalType('tasks')}
						>
							<p className="opacity-50">
								{currentSession.name}/ {isBreak ? 'Br' : 'Pomo'}/
							</p>
							<img
								src={clockIcon}
								alt="clock"
								className="w-[18px] h-[18px] mx-2.5"
							/>
							<p className="opacity-50">
								{isBreak
									? convertTime(breakTimeCd)
									: convertTime(pomodoroTimeCd)}
							</p>
						</div>
					)}
				</div>
			</div>
			{/* Music stream */}
			<audio
				preload="auto"
				ref={audioRef}
				src={currentSong.link}
				onEnded={handleNextSong}
			/>
			{/* Noises sound */}
			{NOISE_LINKS.map((link, i) => (
				<audio
					key={i}
					src={link}
					ref={(el) => (noisesRef.current[i] = el)}
					loop
				/>
			))}
			{/* Alarm sound */}
			<audio ref={alarmRef} loop src={alarmLink.link} />
		</div>
	)
}
export default Audio
