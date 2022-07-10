import { useContext, Fragment } from 'react'
import { Transition, Dialog } from '@headlessui/react'

import { AppContext } from '../../context/AppProvider'
import ShareModal from './ShareModal'
import UpgradeModal from './UpgradeModal'
import SettingModal from './SettingModal'
import ContactModal from './ContactModal'
import TutorialModal from './TutorialModal'
import InfoModal from './InfoModal'

function Modal() {
	const { modalType } = useContext(AppContext)
	console.log(modalType)

	return (
		<Transition show={!!modalType} as={Fragment}>
			<Transition.Child
				as={Fragment}
				enter="ease-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div className="min-h-screen w-screen flex justify-center items-center text-white z-50">
					{modalType === 'share' && <ShareModal />}
					{modalType === 'upgrade' && <UpgradeModal />}
					{modalType === 'settings' && <SettingModal />}
					{modalType === 'contact' && <ContactModal />}
					{modalType === 'tutorial' && <TutorialModal />}
					{modalType === 'info' && <InfoModal />}
				</div>
			</Transition.Child>
		</Transition>
	)
}
export default Modal
