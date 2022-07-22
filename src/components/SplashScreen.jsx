import React from 'react'
import { logoImg } from '../assets/images'

export default function SplashScreen() {
	return (
		<div className="min-h-screen bg-[#1c1a23] flex justify-center items-center">
			<img src={logoImg} alt="logo" width={300} />
		</div>
	)
}
