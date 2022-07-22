import { useContext } from 'react'
import Draggable from 'react-draggable'

import Button from '../Button'
import { AppContext } from '../../context'
import { closeIcon } from '../../assets/icons'
import { signInWithGoogle } from '../../firebase'

function LoginModal() {
	const { setModalType } = useContext(AppContext)

	return (
		<Draggable handle=".handle">
			<div className="relative w-[440px] bg-bl rounded-2xl handle cursor-move">
				<Button
					className="absolute top-4 right-4 hover:opacity-50 cursor-pointer"
					onClick={() => setModalType(null)}
				>
					<img src={closeIcon} alt="close share" />
				</Button>

				<div className="p-6">
					<h3 className="text-3xl font-bold select-none mb-4">Login</h3>
					<p className="opacity-50 text-sm my-2 text-left select-none">
						You need to login to enter Productivity mode
					</p>

					<Button
						className="min-w-[120px] flex justify-center items-center m-auto mt-7 p-2 bg-primary font-semibold text-sm text-black rounded-full"
						onClick={signInWithGoogle}
					>
						Login
					</Button>
				</div>
			</div>
		</Draggable>
	)
}
export default LoginModal
