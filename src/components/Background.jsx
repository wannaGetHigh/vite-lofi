function Background() {
	return (
		<div className="absolute inset-0 transition-opacity duration-500 ease-in-out delay-500">
			<video
				preload="auto"
				loop
				autoPlay
				muted
				src="https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/scenes/book-cafe/Exterior+-+Day.mp4"
				className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-full object-cover"
			></video>
		</div>
	)
}
export default Background
