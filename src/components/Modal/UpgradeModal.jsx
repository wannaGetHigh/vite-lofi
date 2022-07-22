import { useState, useContext } from 'react'
import ReactSwitch from 'react-switch'

import Button from '../Button'
import { BASIC_PACKAGE, PREMIUM_PACKAGE } from '../../constants'
import { AppContext } from '../../context'
import { closeIcon, checkIcon, uncheckIcon } from '../../assets/icons'
import { mosaicImg } from '../../assets/images'

function Carousel() {
	return (
		<div className="flex w-[2600px] h-full animate-autoSlider">
			<img src={mosaicImg} alt="mosaic" />
			<img src={mosaicImg} alt="mosaic" />
		</div>
	)
}

function UpgradeModal() {
	const { setModalType } = useContext(AppContext)
	const [yearly, setYearly] = useState(false)

	return (
		<div className="absolute inset-0 bg-transparent-b-23 z-40 select-none">
			<div className="relative h-screen w-[85vw] m-auto flex flex-row bg-transparent-b-70 rounded-2xl overflow-hidden">
				<Button
					onClick={() => setModalType(null)}
					className="absolute right-4 top-4"
				>
					<img src={closeIcon} alt="close modal" />
				</Button>
				{/* Left side */}
				<div className="flex-leftside p-4 bg-bl">
					<h3 className="text-32 font-bold m-4">Get more done with premium</h3>
					<div className="flex flex-row justify-center items-center my-4">
						<p
							className={`font-bold text-sm mx-8 ${yearly ? 'opacity-40' : ''}`}
						>
							Pay monthly
						</p>
						<ReactSwitch
							onChange={() => setYearly(!yearly)}
							checked={yearly}
							uncheckedIcon={false}
							checkedIcon={false}
							onHandleColor="#f3a952"
							offHandleColor="#f3a952"
							offColor="#0D0D0D"
							onColor="#0D0D0D"
							height={32}
							width={60}
							handleDiameter={26}
							activeBoxShadow="0px 0px 0px 0px transparent"
						/>
						<p
							className={`font-bold text-sm mx-8 ${yearly ? '' : 'opacity-40'}`}
						>
							Pay yearly
						</p>
						<div
							className={`py-1 px-2 bg-primary text-black text-sm font-semibold rounded-xl ${
								yearly ? '' : 'invisible'
							}`}
						>
							Save 25%
						</div>
					</div>

					<div className="flex flex-row justify-between">
						<div className="flex flex-col grow m-2 p-4 bg-transparent-w-05 rounded-2xl">
							<h3 className="text-32 font-bold text-center">Basic</h3>
							<p className="text-primary text-[40px] font-semibold m-4 text-center">
								$0
							</p>
							<p className="min-h-[32px]"></p>

							<Button className="w-full px-4 py-1.5 my-4 text-primary font-semibold border-primary border rounded-full bg-transparent-b-10">
								Current plan
							</Button>
							{BASIC_PACKAGE.map((item, i) => (
								<div key={i} className="self-start flex items-center mt-1.5 ">
									{item.checked ? (
										<img
											src={checkIcon}
											alt="check"
											className="ml-2.5 mr-5 w-5 h-4"
										/>
									) : (
										<img
											src={uncheckIcon}
											alt="not check"
											className="ml-2.5 mr-5 w-5 h-4 opacity-30 brightness-10"
										/>
									)}
									<p
										className={`text-sm font-semibold ${
											!item.checked ? 'opacity-30' : ''
										}`}
									>
										{item.text}
									</p>
								</div>
							))}
						</div>

						<div className="flex flex-col grow m-2 p-4 border-2 border-primary rounded-2xl bg-transparent-w-05">
							<h3 className="text-32 font-bold text-center">Premium</h3>
							<p className="text-primary text-center text-[40px] font-semibold m-4">
								{yearly ? '3,99$ ' : '2,99$ '}
								<span className="text-sm text-white font-normal ml-2">
									/ mo
								</span>
							</p>
							<p className="min-h-[32px] text-primary text-center">
								*7-day money back guarantee
							</p>
							<Button className="w-full px-4 py-1.5 my-4 text-black font-semibold border-primary border rounded-full bg-primary">
								Upgrade
							</Button>
							{PREMIUM_PACKAGE.map((item, i) => (
								<div key={i} className="self-start flex items-center mt-1.5">
									{item.checked ? (
										<img
											src={checkIcon}
											alt="check"
											className="ml-2.5 mr-5 w-5 h-4"
										/>
									) : (
										<img
											src={uncheckIcon}
											alt="not check"
											className="ml-2.5 mr-5 w-5 h-4 opacity-30 brightness-10"
										/>
									)}
									<p
										className={`text-sm font-semibold ${
											!item.checked ? 'opacity-30' : ''
										}`}
									>
										{item.text}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Right side */}
				<div className="flex-rightside font-bold overflow-hidden rounded-r-2xl">
					<h3 className="m-8 text-32">
						Join the <span className="text-primary">lofi.co</span> family
					</h3>
					<div className="p-4 bg bg-transparent-b-80 rounded-2xl text-center">
						<h3 className="my-4 text-primary text-32">+150.000</h3>
						<p className="my-4 font-semibold text-sm">
							Users chilling every month
						</p>
					</div>
					<h3 className="my-4 mx-8 text-32">Don't believe in numbers?</h3>
					<h6 className="my-4 mx-8 text-md">
						Read what users write on socials about us.
					</h6>

					<div className="relative h-[400px] w-full cursor-grab">
						<Carousel />
					</div>
				</div>
			</div>
		</div>
	)
}
export default UpgradeModal
