import { useContext, useState } from 'react'

import Button from '../Button'
import { AppContext } from '../../context/AppProvider'
import { closeIcon } from '../../assets/icons'

function SettingModal() {
	const { setModalType } = useContext(AppContext)

	return (
		<div className="absolute inset-0 flex justify-center items-center bg-transparent-b-70 z-40">
			<div className="relative flex flex-col w-[440px] py-4 px-8 bg-bl rounded-2xl select-none">
				<Button
					className="absolute top-4 right-4 hover:opacity-50 cursor-pointer"
					onClick={() => setModalType(null)}
				>
					<img src={closeIcon} alt="close share" />
				</Button>
				<h4 className="text-xl text-center font-bold my-4">Contact Us</h4>
				<label className="my-2 text-sm opacity-50">Your name</label>
				<input className="my-2 bg-transparent-w-05 py-2 px-4 rounded-lg outline-none border-2 border-transparent" />

				<label className="my-2 text-sm opacity-50">Your Email</label>
				<input className="my-2 bg-transparent-w-05 py-2 px-4 rounded-lg outline-none border-2 border-transparent" />

				<label className="my-2 text-sm opacity-50">Subject</label>
				<textarea className="mb-[24px] h-[120px] bg-transparent-w-05 py-2 px-4 rounded-lg outline-none border-2 border-transparent resize-none" />

				<Button className="w-full px-4 py-1.5 mt-auto rounded-full text-black font-semibold bg-primary">
					Send
				</Button>
			</div>
		</div>
	)
}
export default SettingModal
