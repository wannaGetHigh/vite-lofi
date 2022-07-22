import { db, auth } from './firebase'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import {
	collection,
	doc,
	addDoc,
	getDoc,
	setDoc,
	updateDoc,
	serverTimestamp,
	deleteDoc,
} from 'firebase/firestore'

const googleProvider = new GoogleAuthProvider()
const checkUserExist = (additionalUserInfo, user) => {
	if (additionalUserInfo?.isNewUser) {
		addNewUser(user.uid, {
			displayName: user.displayName,
			email: user.email,
			photoURL: user.photoURL,
			uid: user.uid,
			providerId: additionalUserInfo.providerId,
		})
		return
	}
}

export const signInWithGoogle = async () => {
	try {
		signInWithPopup(auth, googleProvider).then((result) => {
			const { _tokenResponse, user } = result
			checkUserExist(_tokenResponse, user)
		})
	} catch (err) {
		console.error(err)
		alert(err.message)
	}
}

export const logout = () => {
	signOut(auth)
}

export const getUserData = async (uid) => {
	const userRef = doc(db, 'users', uid)
	const userSnap = await getDoc(userRef)

	if (userSnap.exists()) {
		return userSnap.data()
	} else {
		// doc.data() will be undefined in this case
		console.log('No such document!')
	}
}

export const addNewUser = async (uid, data) => {
	const userRef = doc(db, 'users', uid)

	await setDoc(userRef, {
		...data,
		currentSession: {
			name: '',
			time: 0,
			pomodoroLength: 0,
			breakLength: 0,
			date: '',
			pomodoroCount: 0,
			breakCount: 0,
			taskList: [],
			completedTask: [],
			uncompletedTask: [],
		},
		background: {
			mood: 'Chilly',
			set: 'cafe',
			scene: 'cafe2',
			day: true,
			rainy: false,
			show1: true,
			link1:
				'https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/scenes/cafe/outside.mp4',
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
		createdAt: serverTimestamp(),
		modifiedAt: serverTimestamp(),
	})
}

export const updateUser = async (uid, data) => {
	const userRef = doc(db, 'users', uid)

	await updateDoc(userRef, {
		...data,
		modifiedAt: serverTimestamp(),
	})
}

// Firestore sessions
export const addNewSession = async (uid, session) => {
	const sessionRef = collection(db, 'users', uid, 'sessions')

	await addDoc(sessionRef, {
		...session,
		createdAt: serverTimestamp(),
	})
}

// firestore notes
export const addNote = async (uid, data) => {
	const noteRef = collection(db, 'users', uid, 'notes')

	await addDoc(noteRef, {
		...data,
		createdAt: serverTimestamp(),
		modifiedAt: serverTimestamp(),
	})
}

export const updateNote = async (uid, noteId, data) => {
	const noteRef = doc(db, 'users', uid, 'notes', noteId)

	await updateDoc(noteRef, { ...data, modifiedAt: serverTimestamp() })
}

export const removeNote = async (uid, noteId) => {
	const noteRef = doc(db, 'users', uid, 'notes', noteId)

	await deleteDoc(noteRef)
}
