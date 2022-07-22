import { createContext, useState, useRef, useEffect, useContext } from 'react'

import { JAZZY_LINKS, CHILL_LINKS, SLEEPY_LINKS } from '../constants'
import { AuthContext } from './AuthProvider'

export const AppContext = createContext()

function AppProvider({ children }) {
	const { user } = useContext(AuthContext)
	const [modalType, setModalType] = useState()
	const [currentSong, setCurrentSong] = useState(() => {
		let randomIndex

		switch (user?.background.mood) {
			case 'Chilly':
				randomIndex = Math.floor(Math.random() * CHILL_LINKS.length)
				return {
					list: CHILL_LINKS,
					index: randomIndex,
					link: CHILL_LINKS[randomIndex],
				}
			case 'Jazzy':
				randomIndex = Math.floor(Math.random() * JAZZY_LINKS.length)
				return {
					list: JAZZY_LINKS,
					index: randomIndex,
					link: JAZZY_LINKS[randomIndex],
				}
			case 'Sleepy':
				randomIndex = Math.floor(Math.random() * SLEEPY_LINKS.length)
				return {
					list: SLEEPY_LINKS,
					index: randomIndex,
					link: SLEEPY_LINKS[randomIndex],
				}
			default:
				randomIndex = Math.floor(Math.random() * CHILL_LINKS.length)
				return {
					list: CHILL_LINKS,
					index: randomIndex,
					link: CHILL_LINKS[randomIndex],
				}
		}
	})

	// Background
	const [background, setBackground] = useState(user?.background)
	const [currentSession, setCurrentSession] = useState({
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
	})

	const [breakTime, setBreakTime] = useState(user?.timer.breakTime)
	const [pomodoroTime, setPomodoroTime] = useState(user?.timer.pomodoroTime)
	const [breakTimeCd, setBreakTimeCd] = useState(breakTime)
	const [pomodoroTimeCd, setPomodoroTimeCd] = useState(pomodoroTime)
	const [isBreak, setIsBreak] = useState(false)
	const [isPomodoroTimePlaying, setIsPomodoroTimePlaying] = useState(false)
	const [isBreakTimePlaying, setIsBreakTimePlaying] = useState(false)
	const [breakTimeout, setBreakTimeout] = useState()
	const [pomodoroTimeout, setPomodoroTimeout] = useState()
	const [isAudioPlaying, setIsPlaying] = useState(false)
	const [alarmLink, setAlarmLink] = useState(user?.alarm.link)
	const [alarmPlay, setAlarmPlay] = useState(user?.alarm.isOn)

	// Templates
	const [templates, setTemplates] = useState(user?.templates)

	// Audio
	const audioRef = useRef()
	const alarmRef = useRef()
	const noisesRef = useRef([])

	useEffect(() => {
		if (isPomodoroTimePlaying) {
			if (!pomodoroTimeCd) {
				console.log('time out')
				if (alarmPlay) {
					audioRef.current.pause()
					alarmRef.current.play()
					setTimeout(() => {
						alarmRef.current.pause()
						audioRef.current.play()
					}, 7000)
				}
				setIsPomodoroTimePlaying(false)
				setIsBreak(true)
				setPomodoroTimeCd(pomodoroTime)
				setCurrentSession({
					...currentSession,
					pomodoroCount: currentSession.pomodoroCount + 1,
					pomodoroLength: currentSession.pomodoroLength + pomodoroTimeCd,
				})
				return
			}
			setPomodoroTimeout(
				setTimeout(() => setPomodoroTimeCd(pomodoroTimeCd - 1), 1000),
			)
		}

		return () => clearTimeout(pomodoroTimeout)
	}, [isPomodoroTimePlaying, pomodoroTimeCd])

	useEffect(() => {
		if (isBreakTimePlaying) {
			if (!breakTimeCd) {
				console.log('time out')
				if (alarmPlay) {
					audioRef.current.pause()
					alarmRef.current.play()
					setTimeout(() => {
						alarmRef.current.pause()
						audioRef.current.play()
					}, 7000)
				}
				setIsBreakTimePlaying(false)
				setIsBreak(false)
				setBreakTimeCd(breakTime)
				setCurrentSession({
					...currentSession,
					breakCount: currentSession.breakCount + 1,
					breakLength: currentSession.breakLength + breakTimeCd,
				})
				return
			}
			setBreakTimeout(setTimeout(() => setBreakTimeCd(breakTimeCd - 1), 1000))
		}

		return () => clearTimeout(breakTimeout)
	}, [isBreakTimePlaying, breakTimeCd])

	const value = {
		alarmRef,
		noisesRef,
		audioRef,
		currentSession,
		setCurrentSession,
		currentSong,
		setCurrentSong,
		templates,
		setTemplates,
		modalType,
		setModalType,
		background,
		setBackground,
		isAudioPlaying,
		setIsPlaying,
		breakTime,
		setBreakTime,
		pomodoroTime,
		setPomodoroTime,
		breakTimeCd,
		setBreakTimeCd,
		pomodoroTimeCd,
		setPomodoroTimeCd,
		isBreak,
		setIsBreak,
		isPomodoroTimePlaying,
		setIsPomodoroTimePlaying,
		isBreakTimePlaying,
		setIsBreakTimePlaying,
		alarmLink,
		setAlarmLink,
		alarmPlay,
		setAlarmPlay,
		pomodoroTimeout,
		breakTimeout,
	}

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
export default AppProvider
