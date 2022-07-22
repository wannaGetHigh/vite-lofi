import { useState, useRef, useContext } from 'react'

import { AppContext, AuthContext } from '../../context'
import { logoText } from '../../assets/images'
import Button from '../Button'
import useClickOutside from '../../hook/useClickOutside'
import { logout } from '../../firebase'

function ProfileModal() {
	const { setModalType } = useContext(AppContext)
	const profileRef = useRef()
	const [profileTab, setProfileTab] = useState('profile')

	useClickOutside(profileRef, () => setModalType(null))

	const handleLogout = () => {
		logout()
		setModalType(null)
	}

	return (
		<div className="absolute inset-0 bg-transparent-b-70 z-40 select-none">
			<div
				className="w-max h-[364px] mx-auto mt-[140px] flex flex-row bg-bl rounded-2xl overflow-hidden select-none"
				ref={profileRef}
			>
				{/* Leftside */}
				<div className="flex flex-col w-[180px]">
					<div className="flex items-center w-[140xp] h-[80px] ml-5 mb-2.5">
						<img
							src={logoText}
							alt="logo"
							className="w-[50px] h-[50px] invert"
						/>
					</div>
					<div className="flex flex-col text-sm font-bold">
						<Button
							className={`pl-5 min-h-[40px] text-left opacity-70 hover:opacity-100 ${
								profileTab === 'profile' ? 'text-primary' : ''
							}`}
							onClick={() => setProfileTab('profile')}
						>
							Profile
						</Button>
						<Button
							className={`pl-5 min-h-[40px] text-left opacity-70 hover:opacity-100 ${
								profileTab === 'member' ? 'text-primary' : ''
							}`}
							onClick={() => setProfileTab('member')}
						>
							Membership
						</Button>
						<div className="h-[32px]"></div>
						<Button
							className="pl-5 min-h-[40px] text-left opacity-70 hover:opacity-100"
							onClick={handleLogout}
						>
							Logout
						</Button>
					</div>
				</div>

				{/* Rightside */}
				<div className="w-[470px]">
					<div className="px-[25px] pt-[60px] pb-[80px]">
						{profileTab === 'profile' ? <Profile /> : <Member />}
					</div>
				</div>
			</div>
		</div>
	)
}

function Profile() {
	const { name, email } = useContext(AuthContext)

	return (
		<>
			<div className="mb-[30px]">
				<h3 className="font-bold text-base mb-4">My Infomation</h3>
				<div className="w-full bg-bgd-200 py-2 px-[14px] rounded-md">
					<div className="text-xs opacity-50">Username</div>
					<p className="select-text">{name}</p>
				</div>
			</div>
			<div>
				<h3 className="font-bold text-base mb-4">Email address</h3>
				<div className="w-full bg-bgd-200 py-2 px-[14px] rounded-md">
					<div className="text-xs opacity-50">Email address</div>
					<p className="select-text">{email}</p>
				</div>
			</div>
		</>
	)
}

function Member() {
	return (
		<div>
			<h3 className="font-bold text-base mb-4">Manage Membership</h3>
			<div className="flex justify-between w-full bg-bgd-200 font-bold p-5 rounded-sm">
				<div>
					<div className="flex gap-0.5">
						<div className="text-sm">Free Plan</div>
						<div className="text-[10px] border border-light-green rounded ml-0.5 mb-1 py-0.5 px-1">
							Active
						</div>
					</div>
					<div>FREE</div>
				</div>
				<Button className="text-sm text-primary py-1 px-[10px]">Cancel</Button>
			</div>
		</div>
	)
}

export default ProfileModal
