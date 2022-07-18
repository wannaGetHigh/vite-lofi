import { useContext, useState } from 'react'

import { AppContext } from '../../context/AppProvider'
import Button from '../Button'
import { SETS, SLEEPY_LINKS, JAZZY_LINKS, CHILL_LINKS } from '../../constants'
import { changeBackground, randomSong } from '../../utils'

import {
	chillActiveIcon,
	chillTemplateIcon,
	sleepyTemplateIcon,
	sleepyActiveIcon,
	focusTemplateIcon,
	focusActiveIcon,
	binIcon,
} from '../../assets/icons'

function Template() {
	const {
		setBackground,
		background,
		setTemplates,
		templates,
		setCurrentSong,
		setIsPlaying,
		audioRef,
	} = useContext(AppContext)
	const [activeChill, setActiveChill] = useState(chillTemplateIcon)
	const [activeSleepy, setActiveSleepy] = useState(sleepyTemplateIcon)
	const [activeFocus, setActiveFocus] = useState(focusTemplateIcon)

	const savedTemplates = templates.map((template) => {
		for (const set of SETS) {
			for (const scene of set.scenes) {
				if (scene.scene === template.scene) {
					return { ...template, ...scene }
				}
			}
		}
	})

	const handleChangeBg = (template) => {
		const condition = {
			set: template.set,
			scene: template.scene,
			day: template.day,
			rainy: template.rainy,
		}
		const newBg = changeBackground(background, condition)

		setBackground(newBg)
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
	}

	const deleteTemplate = (delTemp) => {
		setTemplates((prev) => prev.filter((item) => item.scene !== delTemp.scene))
	}

	return (
		<div className="m-4">
			<div className="flex flex-col">
				<h4 className="my-4 text-xl font-bold select-none">Playlist</h4>
				<div className="flex flex-row justify-between">
					<img
						src={activeChill}
						alt="chilly"
						className="h-[120px] cursor-pointer"
						onMouseEnter={() => setActiveChill(chillActiveIcon)}
						onMouseLeave={() => setActiveChill(chillTemplateIcon)}
						onClick={() => {
							handleChangeMood('Chilly')
							handleChangeBg({
								set: 'forest',
								scene: 'forest2',
								day: true,
								rainy: false,
							})
						}}
					/>
					<img
						src={activeFocus}
						alt="focusy"
						className="h-[120px] cursor-pointer"
						onMouseEnter={() => setActiveFocus(focusActiveIcon)}
						onMouseLeave={() => setActiveFocus(focusTemplateIcon)}
						onClick={() => {
							handleChangeMood('Jazzy')
							handleChangeBg({
								set: 'cafe',
								scene: 'cafe1',
								day: true,
								rainy: true,
							})
						}}
					/>
					<img
						src={activeSleepy}
						alt="sleepy"
						className="h-[120px] cursor-pointer"
						onMouseEnter={() => setActiveSleepy(sleepyActiveIcon)}
						onMouseLeave={() => setActiveSleepy(sleepyTemplateIcon)}
						onClick={() => {
							handleChangeMood('Sleepy')
							handleChangeBg({
								set: 'van',
								scene: 'van1',
								day: true,
								rainy: false,
							})
						}}
					/>
				</div>
				<h4 className="my-4 text-xl font-bold select-none">Templates</h4>
				{savedTemplates.length === 0 ? (
					<p className="opacity-50 text-sm select-none">
						You haven't saved any template yet, open the mixer to save one.
					</p>
				) : (
					<div className="grid grid-cols-2 h-min max-h-[280px] overflow-y-auto">
						{savedTemplates.map((template) => (
							<div
								key={template.scene}
								className="relative h-[170px] m-2 rounded-2xl overflow-hidden cursor-pointer hover:opacity-70"
								onClick={handleChangeBg.bind(this, template)}
							>
								<img
									src={template.img}
									alt={template.scene}
									className="h-full object-cover"
								/>
								<div className="absolute bottom-0 right-0 flex justify-evenly items-center h-2/5 w-full rounded-b-2xl backdrop-blur-sm">
									{template.scene}

									<Button
										onClick={(e) => {
											e.stopPropagation()
											deleteTemplate(template)
										}}
									>
										<img src={binIcon} alt="bin" className="w-9 h-9" />
									</Button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
export default Template
