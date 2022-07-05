import { Menu } from '@headlessui/react'

import {
	profileIcon,
	barsIcon,
	sawIcon,
	messageIcon,
	spotifyIcon,
	playlistIcon,
	infoIcon
} from '../../assets/icons'

function MenuDropdow() {
	const items = [
		{ icon: profileIcon, alt: 'profile', text: 'User settings' },
		{ icon: sawIcon, alt: 'settings', text: 'General settings' },
		{ icon: messageIcon, alt: 'contact', text: 'Contact us' },
		{ icon: sawIcon, alt: 'tutorial', text: 'How it works' },
		{ icon: spotifyIcon, alt: 'playlist', text: 'Playlist' },
		{ icon: playlistIcon, alt: 'submit music', text: 'Submit music' },
		{ icon: infoIcon, alt: 'info', text: 'About us' }
	]

	return (
		<Menu>
			<Menu.Button className="hover:opacity-50">
				<img src={barsIcon} alt="more-nav" />
			</Menu.Button>
			<Menu.Items className="fixed top-[80px] right-0 rounded-l-lg overflow-hidden">
				{items.map((item) => (
					<Menu.Item key={item.alt}>
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
