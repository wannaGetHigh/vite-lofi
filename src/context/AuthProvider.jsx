import { createContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { auth, db } from '../firebase'
import SplashScreen from '../components/SplashScreen'
import { useHistory } from '../hook/useHistory'

export const AuthContext = createContext()

function AuthProvider({ children }) {
	const [user, setUser] = useState({})
	const [isAuthLoading, setIsAuthLoading] = useState(true)

	// Notes
	const notesList = useHistory(user?.uid, 'notes')

	// Sessions list
	const sessionList = useHistory(user?.uid, 'sessions')

	const value = {
		uid: user?.uid,
		email: user?.email,
		name: user?.displayName,
		notesList,
		sessionList,
		user,
	}

	useEffect(() => {
		const unsubscribed = onAuthStateChanged(auth, (user) => {
			setIsAuthLoading(true)
			if (user) {
				let userRef = doc(db, 'users', user.uid)

				onSnapshot(userRef, (snapshot) => {
					setUser(snapshot.data())
					setIsAuthLoading(false)
				})
			} else {
				console.log('User does not login')
				setUser({
					background: {
						mood: 'Chilly',
						set: 'chill',
						scene: 'chill1',
						show1: true,
						day: true,
						rainy: false,
						link1:
							'https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/scenes/chill-vibes/BDR%20Day%20112521%20%281%29.mp4',
						link2: '',
					},
					alarm: {
						isOn: true,
						link: 'https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/alarms/Digital.mp3',
					},
					timer: {
						pomodoroTime: 1500,
						breakTime: 300,
					},
					templates: [],
				})
				setIsAuthLoading(false)
			}
		})

		return () => unsubscribed()
	}, [])

	return (
		<AuthContext.Provider value={value}>
			{isAuthLoading ? <SplashScreen /> : children}
		</AuthContext.Provider>
	)
}
export default AuthProvider
