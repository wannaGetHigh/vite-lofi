import { useEffect } from 'react'

function useClickOutside(ref, fallback) {
	useEffect(() => {
		/**
		 * Run fallback
		 */
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				fallback()
			}
		}
		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [ref])
}

export default useClickOutside
