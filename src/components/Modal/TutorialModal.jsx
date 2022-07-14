import { useContext, useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import Button from '../Button'
import { closeIcon } from '../../assets/icons'
import { logoImg } from '../../assets/images'
import { TUTORIAL_VIDEOS_LINKS } from '../../constants'
import { AppContext } from '../../context/AppProvider'

function CarouselText({
	first,
	last,
	title1,
	title2,
	desc1,
	desc2,
	handleNextSlide,
}) {
	const { setModalType } = useContext(AppContext)

	return (
		<div className="text-center">
			<h2 className="text-4xl font-bold text-primary">{title1}</h2>
			<h2 className="text-4xl font-bold text-primary">{title2}</h2>
			<p className={`text-sm ${desc2 ? 'text-left' : ''} mt-3`}>{desc1}</p>
			<p className="text-sm text-left whitespace-pre-wrap my-3">{desc2}</p>

			<div className="flex flex-col justify-center items-center">
				{last ? (
					<Button
						className="w-[120px] py-1.5 px-4 text-base text-black font-semibold rounded-full bg-primary"
						onClick={() => setModalType(null)}
					>
						Next
					</Button>
				) : (
					<Button
						className="w-[120px] py-1.5 px-4 text-base text-black font-semibold rounded-full bg-primary"
						onClick={handleNextSlide}
					>
						{first ? 'Take tour' : 'Next'}
					</Button>
				)}

				<Button
					className="p-[18px] text-sm font-semibold opacity-50 hover:none"
					onClick={() => setModalType(null)}
				>
					Leave tutorial
				</Button>
			</div>
		</div>
	)
}

function Carousel() {
	const sliderRef = useRef(null)
	const [, setRerender] = useState(false)

	useEffect(() => setRerender(true), [])

	const settings = {
		arrows: false,
		autoplay: false,
		infinite: false,
		dots: true,
		swipe: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		appendDots: (dots) => (
			<ul
				style={{
					top: '360px',
					bottom: 'unset',
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				{dots}
			</ul>
		),
		customPaging: (i) => (
			<div className="w-full h-full py-1 opacity-50 hover:opacity-100 duration-200 ease-in">
				<div className="h-1 bg-white rounded-2xl"></div>
			</div>
		),
	}

	return (
		<Slider {...settings} ref={sliderRef}>
			<div>
				<div className="mb-[80px]">
					<img
						src={logoImg}
						alt="logo"
						className="w-[350px] h-[350px] p-[80px] m-auto object-cover"
					/>
				</div>
				<CarouselText
					title1="Your calm, digital space to study,"
					title2="work or relax"
					desc1="Welcome to lofi.co. Let us show you around!"
					first
					handleNextSlide={sliderRef?.current?.slickNext}
				/>
			</div>

			{TUTORIAL_VIDEOS_LINKS.map((video) => (
				<div key={video.name}>
					<div className="mb-[80px]">
						<video
							src={video.link}
							autoPlay
							muted
							loop
							className="w-[340px] h-[340px] m-auto rounded-2xl object-cover"
						></video>
					</div>

					<CarouselText
						last={video.name === 'tutorial-4'}
						title1={video.title1}
						title2={video.title2}
						desc1={video.desc1}
						desc2={video.desc2}
						handleNextSlide={sliderRef?.current?.slickNext}
					/>
				</div>
			))}
		</Slider>
	)
}

function TutorialModal() {
	const { setModalType } = useContext(AppContext)

	return (
		<div className="absolute inset-0 flex justify-center bg-transparent-b-70 backdrop-blur-xl items-center z-40">
			<Button
				className="absolute top-8 right-8"
				onClick={() => setModalType(null)}
			>
				<img src={closeIcon} alt="close" />
			</Button>

			<div className="h-full w-[542px] m-auto overflow-hidden pt-4">
				<Carousel />
			</div>
		</div>
	)
}
export default TutorialModal
