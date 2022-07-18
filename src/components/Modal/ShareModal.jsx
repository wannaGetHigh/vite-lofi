import { useState, useContext } from 'react'
import Draggable from 'react-draggable'

import { AppContext } from '../../context/AppProvider'
import Button from '../Button'
import { twitterIcon, closeIcon } from '../../assets/icons'

function ShareModal() {
	const { setModalType } = useContext(AppContext)
	const [copied, setCopied] = useState(false)
	const link = 'http://localhost:3000/'

	const handleClose = () => {
		setModalType(null)
		setCopied(false)
	}

	const handleCopyToClipboard = () => {
		navigator.clipboard.writeText(link)
		setCopied(true)
	}

	return (
		<Draggable handle=".handle">
			<div className="relative w-[440px] bg-bl rounded-2xl handle cursor-move">
				<Button
					className="absolute top-4 right-4 hover:opacity-50 cursor-pointer"
					onClick={handleClose}
				>
					<img src={closeIcon} alt="close share" />
				</Button>

				<div className="p-6">
					<h3 className="text-3xl font-bold select-none">Share</h3>
					<p className="opacity-50 text-sm my-2 text-left select-none">
						Copy the link to share your combination of music, scenery and sounds
						with your friends
					</p>
					<div
						className={`bg-transparent-w-05 mt-4 mb-[10px] px-4 py-1 text-sm text-left rounded-lg cursor-pointer ${
							copied ? 'border border-2 border-[#00ff0033]' : ''
						}`}
						onClick={handleCopyToClipboard}
					>
						{link}
					</div>
					{copied && (
						<div className="text-light-green text-center text-sm">Copied!</div>
					)}

					<Button className="min-w-[120px] flex justify-center items-center m-auto mt-7 p-2 bg-primary font-semibold text-sm text-black rounded-full hover:opacity-50">
						<img
							src={twitterIcon}
							alt="twitter"
							className="mr-2 brightness-0"
						/>
						Share
					</Button>
				</div>
			</div>
		</Draggable>
	)
}
export default ShareModal
