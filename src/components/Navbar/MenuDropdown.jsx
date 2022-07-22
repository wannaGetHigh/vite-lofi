import { useContext } from 'react'
import { Menu } from '@headlessui/react'

import {
	profileIcon,
	barsIcon,
	sawIcon,
	messageIcon,
	spotifyIcon,
	playlistIcon,
	infoIcon,
} from '../../assets/icons'
import { AuthContext, AppContext } from '../../context'
import { signInWithGoogle } from '../../firebase'

function MenuDropdow() {
	const { setModalType } = useContext(AppContext)
	const { uid } = useContext(AuthContext)

	const items = [
		{
			icon: profileIcon,
			alt: 'profile',
			text: 'User settings',
			onClick() {
				uid ? setModalType('profile') : signInWithGoogle()
			},
		},
		{
			icon: sawIcon,
			alt: 'settings',
			text: 'General settings',
			onClick() {
				setModalType('settings')
			},
		},
		{
			icon: messageIcon,
			alt: 'contact',
			text: 'Contact us',
			onClick() {
				setModalType('contact')
			},
		},
		{
			icon: sawIcon,
			alt: 'tutorial',
			text: 'How it works',
			onClick() {
				setModalType('tutorial')
			},
		},
		{
			icon: spotifyIcon,
			alt: 'playlist',
			text: 'Playlist',
			onClick() {
				window.open(
					'https://open.spotify.com/playlist/0iepisLXvVe5RxB3owHjlj?si=8bce4ca31f5740e8&nd=1',
					'_blank',
				)
			},
		},
		{
			icon: playlistIcon,
			alt: 'submit music',
			text: 'Submit music',
			onClick() {
				window.open(
					'https://docs.google.com/forms/d/e/1FAIpQLSe9b5QI8zHE6ufCTI735ZSncZ55LE0mWxAhBl2FIiVgOALLYA/viewform',
					'_blank',
				)
			},
		},
		{
			icon: infoIcon,
			alt: 'info',
			text: 'About us',
			onClick() {
				setModalType('info')
			},
		},
	]

	return (
		<Menu>
			<Menu.Button className="hover:opacity-50">
				<img src={barsIcon} alt="more-nav" className="w-8 h-8" />
			</Menu.Button>
			<Menu.Items className="fixed top-[80px] right-0 rounded-l-lg overflow-hidden">
				{items.map((item) => (
					<Menu.Item key={item.alt} onClick={item.onClick}>
						<div className="flex flex-row gap-x-4 py-2 px-[12px] bg-black hover:bg-primary cursor-pointer transition-all duration-200">
							<img src={item.icon} alt={item.alt} />
							<p className="text-sm">{item.text}</p>
						</div>
					</Menu.Item>
				))}
			</Menu.Items>
		</Menu>
	)
}

export default MenuDropdow
