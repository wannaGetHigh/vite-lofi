import { useState } from 'react'
import ReactSlider from 'react-slider'
import {
	sleepyIcon,
	jazzyIcon,
	chillIcon,
	volumeMinIcon,
	volumeMaxIcon
} from '../../assets/icons'
import { NOISE_ICONS } from '../../constants'

function Mood() {
	const initNoisesList = NOISE_ICONS.slice(0, 3)
	const [noisesList, setNoisesList] = useState(initNoisesList)

	const handleNoisesList = () => {
		if (noisesList.length === 3) {
			setNoisesList(NOISE_ICONS)
		} else {
			setNoisesList(initNoisesList)
		}
	}

	const moods = [
		{ src: sleepyIcon, text: 'Sleepy' },
		{ src: jazzyIcon, text: 'Jazzy' },
		{ src: chillIcon, text: 'Chilly' }
	]

	return (
		<>
			{/* Title */}
			<div className="mx-8">
				<h4 className="my-4 text-xl font-bold select-none">Mood</h4>
			</div>

			{/* Mood selection */}
			<div className="flex flex-row item-center justify-between mx-8 my-4 overflow-hidden">
				{moods.map((mood) => (
					<div
						key={mood.text}
						className="relative p-2 bg-bl-20 h-[84px] w-[84px] rounded-xl cursor-pointer"
					>
						<div className="absolute bottom-[-16px] right-[-34px] w-[150px] h-[150px]">
							<img src={mood.src} alt="sleepy" className="w-full h-full" />
						</div>
						<p className="absolute bottom-[10px] left-[20px]">{mood.text}</p>
					</div>
				))}
			</div>

			{/* Volumne */}
			<div className="m-8 flex flex-row items-center">
				<img src={volumeMinIcon} alt="min volume" />
				<ReactSlider
					className="flex-1 bg-bl-20 mt-2 mr-4 ml-2 h-3 rounded-full"
					defaultValue={50}
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
							className="bg-white -mt-0.5 h-4 w-4 rounded-full cursor-pointer outline-none"
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
				{noisesList.map(({ label, icon }) => (
					<div
						key={label}
						className="flex flex-row justify-between items-center mx-8 my-4"
					>
						<p className="opacity-40 text-sm select-none">{label}</p>
						<ReactSlider
							className="h-6 w-[148px] bg-bl-20 rounded-full mr-1"
							defaultValue={0}
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
									className={`h-6 w-6 rounded-full cursor-pointer outline-none ${
										state.value === 0 ? 'contrast-50' : ''
									}`}
								>
									<img src={icon} alt={label} />
								</div>
							)}
						/>
					</div>
				))}
			</div>

			{/* Footer */}
			<div
				className="h-[45px] flex items-center justify-center bg-bl-20 hover:opacity-50 cursor-pointer"
				onClick={handleNoisesList}
			>
				{noisesList.length === 3 ? (
					<p className="text-sm">Mix mode</p>
				) : (
					<p className="text-sm">Normal mode</p>
				)}
			</div>
		</>
	)
}
export default Mood
