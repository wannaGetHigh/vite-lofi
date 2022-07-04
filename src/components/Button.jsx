export default function Button({
	children,
	className,
	onClick,
	activeButton,
	type
}) {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`text-white transition-all duration-200 ease-linear hover:opacity-80 ${
				activeButton ? 'active:translate-y-0.5 ' : ''
			}${className}`}
		>
			{children}
		</button>
	)
}
