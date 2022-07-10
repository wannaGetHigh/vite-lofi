import { FOCUS_ICONS } from '../../constants'

function Focus() {
	return (
		<div className="m-4">
			<h4 className="mb-4 text-lg font-bold select-none">Productivity</h4>
			<div>
				{FOCUS_ICONS.map((item) => (
					<div
						key={item.label}
						className="flex flex-row items-center bg-gr p-2 pl-4 mb-3 rounded-xl cursor-pointer"
					>
						<img
							src={item.icon}
							alt={item.label}
							className="opacity-20 brightness-200"
						/>
						<h6 className="mx-4 font-medium">{item.label}</h6>
					</div>
				))}
			</div>
		</div>
	)
}
export default Focus
