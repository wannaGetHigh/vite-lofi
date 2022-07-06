import {
	chillActiveIcon,
	chillTemplateIcon,
	sleepyTemplateIcon,
	sleepyActiveIcon,
	focusTemplateIcon,
	focusActiveIcon
} from '../../assets/icons'

function Template() {
	return (
		<div className="m-4">
			<div className="flex flex-col">
				<h4 className="my-4 text-xl font-bold select-none">Playlist</h4>
				<div className="flex flex-row justify-between">
					<img
						src={chillTemplateIcon}
						alt="chilly"
						className="h-[120px] cursor-pointer"
					/>
					<img
						src={focusTemplateIcon}
						alt="focusy"
						className="h-[120px] cursor-pointer"
					/>
					<img
						src={sleepyTemplateIcon}
						alt="sleepy"
						className="h-[120px] cursor-pointer"
					/>
				</div>
				<h4 className="my-4 text-xl font-bold select-none">Templates</h4>
				<p className="opacity-50 text-sm select-none">
					You haven't saved any template yet, open the mixer to save one.
				</p>
			</div>
		</div>
	)
}
export default Template
