import Button from './Button'
import { moodIcon, templateIcon, setIcon, focusIcon } from '../assets/icons'

function Sidebar() {
	return (
		<div className="fixed right-4 top-1/2 -translate-y-1/2 z-20">
			<div className="flex flex-col justify-center items-center bg-transparent-b-60 rounded-full">
				<Button className="w-[70px] h-[70px] rounded-t-full">
					<div>
						<img
							src={moodIcon}
							alt="mood"
							className="opacity-20 brightness-200 scale-150"
						/>
					</div>
					<div className="w-[50px] m-auto border-solid border-b-2 border-[#fff3]"></div>
				</Button>

				<Button className="w-[70px] h-[70px] ">
					<div>
						<img
							src={templateIcon}
							alt="mood"
							className="opacity-20 brightness-200 scale-150"
						/>
					</div>
					<div className="w-[50px] m-auto border-solid border-b-2 border-[#fff3]"></div>
				</Button>

				<Button className="w-[70px] h-[70px]">
					<div>
						<img
							src={setIcon}
							alt="mood"
							className="opacity-20 brightness-200 scale-150"
						/>
					</div>
					<div className="w-[50px] m-auto border-solid border-b-2 border-[#fff3]"></div>
				</Button>

				<Button className="w-[70px] h-[70px] rounded-b-full">
					<img
						src={focusIcon}
						alt="mood"
						className="h-[32px] w-[32px] m-auto opacity-20 brightness-200"
					/>
				</Button>
			</div>
		</div>
	)
}
export default Sidebar
