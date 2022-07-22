import { useState, useContext } from 'react'
import ReactSlider from 'react-slider'
import {
	sleepyIcon,
	jazzyIcon,
	chillIcon,
	volumeMinIcon,
	volumeMaxIcon,
	bookmarkIcon,
} from '../../assets/icons'
import {
	NOISE_ICONS,
	JAZZY_LINKS,
	CHILL_LINKS,
	SLEEPY_LINKS,
} from '../../constants'
import { randomSong } from '../../utils'
import Button from '../Button'
import { AppContext, AuthContext } from '../../context'
import { updateUser } from '../../firebase'

function Mood() {
	const { uid } = useContext(AuthContext)
	const {
		setCurrentSong,
		setIsPlaying,
		setBackground,
		background,
		audioRef,
		noisesRef,
		templates,
		setTemplates,
	} = useContext(AppContext)
	const [noisesList, setNoisesList] = useState(3)

	const moods = [
		{ src: sleepyIcon, text: 'Sleepy' },
		{ src: jazzyIcon, text: 'Jazzy' },
		{ src: chillIcon, text: 'Chilly' },
	]

	const isSavedTemplate = templates?.some(
		(template) => template.scene === background.scene,
	)

	const handleNoisesList = () => {
		if (noisesList === 3) {
			setNoisesList(NOISE_ICONS.length)
		} else {
			setNoisesList(3)
		}
	}

	const handleChangeMood = (type) => {
		let newSong
		if (type === 'Sleepy') {
			newSong = randomSong(SLEEPY_LINKS)
		} else if (type === 'Jazzy') {
			newSong = randomSong(JAZZY_LINKS)
		} else {
			newSong = randomSong(CHILL_LINKS)
		}

		setBackground((prev) => ({ ...prev, mood: type }))
		setCurrentSong(newSong)
		setIsPlaying(true)
		audioRef.current.autoplay = true

		if (uid) updateUser(uid, { 'background.mood': type })
	}

	const handleSaveTemplate = () => {
		const newTemplate = [...templates, background]
		setTemplates(newTemplate)
		if (uid) updateUser(uid, { templates: newTemplate })
	}

	const noiseAudio = NOISE_ICONS.map(({ label, icon }, index) => (
		<div
			key={label}
			className="flex flex-row justify-between items-center mx-8 my-4"
		>
			<p className="opacity-40 text-sm select-none">{label}</p>
			<ReactSlider
				className="h-[26px] w-[148px] bg-bl-20 rounded-full mr-1"
				defaultValue={noisesRef.current[index].volume * 100}
				onChange={(value) => {
					const thisNoise = noisesRef.current[index]
					if (value) {
						thisNoise.volume = value / 100
						thisNoise.play()
					} else {
						thisNoise.pause()
					}
				}}
				renderTrack={(props, state) => (
					<div
						{...props}
						className={`inset-y-0 rounded-full ${
							state.index === 0 ? 'bg-primary' : ''
						}`}
					/>
				)}
				renderThumb={(props, state) => (
					<div
						{...props}
						className={`rounded-full cursor-pointer ${
							state.value === 0 ? 'brightness-[0.5]' : ''
						}`}
					>
						<img src={icon} alt={label} className="w-[26px] h-[26px]" />
					</div>
				)}
			/>
		</div>
	))

	return (
		<>
			{/* Title */}
			<div className="flex justify-between items-center mx-8  select-none">
				<h4 className="my-4 text-xl font-bold">Mood</h4>
				{isSavedTemplate ? (
					<div className="flex items-center gap-2 text-[#5293f3] font-semibold text-base">
						<img src={bookmarkIcon} alt="bookmark" />
						SAVED
					</div>
				) : (
					<Button
						className="flex items-center gap-3 py-1 px-4 border border-[#5293f3] rounded-full bg-transparent-w-05"
						onClick={handleSaveTemplate}
					>
						<img src={bookmarkIcon} alt="bookmark" />
						Save Template
					</Button>
				)}
			</div>

			{/* Mood selection */}
			<div className="flex flex-row item-center justify-between mx-8 my-4 overflow-hidden">
				{moods.map((mood) => (
					<Button
						key={mood.text}
						className="relative p-2 bg-bl-20 h-[84px] w-[84px] rounded-xl"
						onClick={handleChangeMood.bind(this, mood.text)}
					>
						<div className="absolute bottom-[-16px] right-[-34px] w-[150px] h-[150px]">
							<img
								src={mood.src}
								alt="sleepy"
								className={`w-full h-full ${
									mood.text === background.mood
										? ''
										: 'opacity-20 brightness-[200]'
								}`}
							/>
						</div>
						<p className="absolute bottom-[10px] left-[20px]">{mood.text}</p>
					</Button>
				))}
			</div>

			{/* Volumne */}
			<div className="m-8 flex flex-row items-center">
				<img src={volumeMinIcon} alt="min volume" />
				<ReactSlider
					className="flex-1 bg-bl-20 mt-2 mr-4 ml-2 h-3 rounded-full"
					defaultValue={audioRef.current.volume * 100}
					onChange={(value) => (audioRef.current.volume = value / 100)}
					renderTrack={(props, state) => (
						<div
							{...props}
							className={`inset-y-0 rounded-full ${
								state.index === 0 ? 'bg-primary' : ''
							}`}
						/>
					)}
					renderThumb={(props) => (
						<div
							{...props}
							className="bg-white -mt-0.5 h-4 w-4 rounded-full cursor-pointer"
						/>
					)}
				/>
				<img src={volumeMaxIcon} alt="max volume" />
			</div>

			{/* Background noises */}
			<h4 className="text-xl mt-[30px] mx-8 mb-2 select-none">
				Background noises
			</h4>
			<div className="max-h-[280px] overflow-y-auto">
				{noiseAudio.splice(0, noisesList)}
			</div>

			{/* Footer */}
			<div
				className="h-[45px] flex items-center justify-center bg-bl-20 hover:opacity-50 cursor-pointer"
				onClick={handleNoisesList}
			>
				{noisesList === 3 ? (
					<p className="text-sm">Mix mode</p>
				) : (
					<p className="text-sm">Normal mode</p>
				)}
			</div>
		</>
	)
}
export default Mood
