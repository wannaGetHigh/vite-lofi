import { useState, useRef, useContext } from 'react'
import Tippy from '@tippyjs/react'
import TippyHeadless from '@tippyjs/react/headless'
import 'tippy.js/dist/tippy.css'

import {
	MoodIcon,
	TemplateIcon,
	SetIcon,
	FocusIcon,
	TimerIcon,
	MenuHistoryIcon,
	MenuNoteIcon,
	crownIcon,
} from '../../assets/icons'
import Mood from './Mood'
import Template from './Template'
import Set from './Set'
import useClickOutside from '../../hook/useClickOutside'
import Button from '../Button'
import { AuthContext, AppContext } from '../../context'

function Sidebar() {
	const { uid } = useContext(AuthContext)
	const { setModalType, modalType } = useContext(AppContext)
	const [menuTab, setMenuTab] = useState()
	const [focusMenu, setFocusMenu] = useState(false)
	const modalRef = useRef(null)

	// Close Menu tab when click outside modal
	useClickOutside(modalRef, () => setMenuTab(null))

	const menuItems = [
		{ Icon: MoodIcon, alt: 'mood', tooltip: 'Mixer' },
		{ Icon: TemplateIcon, alt: 'template', tooltip: 'Templates' },
		{ Icon: SetIcon, alt: 'set', tooltip: 'Scenes' },
		{ Icon: FocusIcon, alt: 'focus', tooltip: 'Tools' },
	]

	const focusItems = [
		{ Icon: TimerIcon, alt: 'timer', tooltip: 'Timer', modalName: 'tasks' },
		{ Icon: MenuNoteIcon, alt: 'notes', tooltip: 'Notes', modalName: 'notes' },
		{
			Icon: MenuHistoryIcon,
			alt: 'insight',
			tooltip: 'Insights',
			modalName: 'history',
		},
	]

	return (
		<div
			className="fixed flex items-center right-0 top-1/2 -translate-y-1/2 z-40 animate-fadeIn1s"
			ref={modalRef}
		>
			{menuTab && (
				<div className="w-[345px] bg-bl rounded-3xl overflow-hidden">
					{menuTab === 'mood' && <Mood />}
					{menuTab === 'template' && <Template />}
					{menuTab === 'set' && <Set />}
				</div>
			)}
			<div className="flex flex-col justify-center py-4 mr-5 bg-bl rounded-xl">
				{menuItems.map(({ Icon, alt, tooltip }) => (
					<Button
						key={alt}
						className="flex justify-center items-center w-[60px] h-[55px] hover:opacity-100"
						onClick={() => {
							if (alt === 'focus') {
								setFocusMenu(!focusMenu)
							} else {
								setFocusMenu(false)
							}
							menuTab === alt ? setMenuTab(null) : setMenuTab(alt)
						}}
					>
						<Tippy content={tooltip} placement="left" arrow={false}>
							<Icon
								className={alt === menuTab ? 'fill-primary' : 'fill-gr-36'}
							/>
						</Tippy>
					</Button>
				))}
				{focusMenu && (
					<div className="flex flex-col justify-center animate-slideDown">
						<div className="h-[1px] w-[25px] bg-gr-36 m-auto"></div>
						{focusItems.map(({ Icon, alt, tooltip, modalName }) => (
							<Button
								key={alt}
								className="flex justify-center items-center w-[60px] h-[55px] hover:opacity-100"
								onClick={() =>
									uid ? setModalType(modalName) : setModalType('login')
								}
							>
								<TippyHeadless
									render={(attrs) => (
										<div
											{...attrs}
											className="flex items-center gap-[6px] text-sm font-normal bg-gr-36 rounded-lg p-2"
										>
											{tooltip}
											<img src={crownIcon} alt="crown" width="16" height="16" />
										</div>
									)}
									placement="left"
									arrow={false}
								>
									<Icon
										className={
											modalType === modalName ? 'fill-primary' : 'fill-gr-36'
										}
									/>
								</TippyHeadless>
							</Button>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
export default Sidebar
