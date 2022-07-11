import { useState, useRef } from 'react'

import { moodIcon, templateIcon, setIcon, focusIcon } from '../../assets/icons'
import Mood from './Mood'
import Template from './Template'
import Set from './Set'
import Focus from './Focus'
import useClickOutside from '../../hook/useClickOutside'

function Sidebar() {
	const [menuTab, setMenuTab] = useState()
	const modalRef = useRef(null)

	// Close Menu tab when click outside modal
	useClickOutside(modalRef, () => setMenuTab(null))

	const items = [
		{ src: moodIcon, alt: 'mood' },
		{ src: templateIcon, alt: 'template' },
		{ src: setIcon, alt: 'set' },
		{ src: focusIcon, alt: 'focus' }
	]

	return (
		<div
			className="fixed flex items-center right-0 top-1/2 -translate-y-1/2 z-10"
			ref={modalRef}
		>
			{menuTab && (
				<>
					<div className="w-[345px] bg-bl rounded-3xl overflow-hidden z-20">
						{menuTab === 'mood' && <Mood />}
						{menuTab === 'template' && <Template />}
						{menuTab === 'set' && <Set />}
						{menuTab === 'focus' && <Focus setMenuTab={setMenuTab} />}
					</div>
				</>
			)}
			<div className="flex flex-col justify-center h-[280px] w-[70px] bg-transparent-b-60 rounded-full overflow-hidden cursor-pointer mr-5">
				{items.map((item) => (
					<div
						key={item.alt}
						className={`w-[70px] h-[70px] z-20 ${
							menuTab === item.alt ? 'bg-bl' : 'opacity-20 brightness-200'
						}`}
						onClick={() =>
							menuTab === item.alt ? setMenuTab(null) : setMenuTab(item.alt)
						}
					>
						<img
							src={item.src}
							alt={item.alt}
							className={item.alt === 'focus' ? 'scale-[0.4]' : 'scale-150'}
						/>
						{/* Separate line */}
						{item.alt !== 'focus' && (
							<div className="w-[50px] m-auto border-solid border-b-2 border-[#fff3]"></div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}
export default Sidebar
