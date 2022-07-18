import { createContext, useState, useRef, useEffect } from 'react'

import { BACKGROUND_LINKS_LIST, ALARM_LINKS, JAZZY_LINKS } from '../constants'

export const AppContext = createContext()

function AppProvider({ children }) {
	const [modalType, setModalType] = useState()
	const [currentSong, setCurrentSong] = useState(() => {
		let randomIndex = Math.floor(Math.random() * JAZZY_LINKS.length)
		return {
			list: JAZZY_LINKS,
			index: randomIndex,
			link: JAZZY_LINKS[randomIndex],
		}
	})
	const [background, setBackground] = useState({
		mood: 'Chilly',
		set: 'chill',
		scene: 'chill1',
		show1: true,
		day: true,
		rainy: false,
		link1: BACKGROUND_LINKS_LIST.find(
			(item) =>
				item.set === 'chill' &&
				item.scene === 'chill1' &&
				item.day === true &&
				item.rainy === false,
		).link,
		link2: '',
	})
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
	const [sessionList, setSessionList] = useState([])
	const [breakTime, setBreakTime] = useState(5 * 60)
	const [pomodoroTime, setPomodoroTime] = useState(25 * 60)
	const [breakTimeCd, setBreakTimeCd] = useState(breakTime)
	const [pomodoroTimeCd, setPomodoroTimeCd] = useState(pomodoroTime)
	const [isBreak, setIsBreak] = useState(false)
	const [isPomodoroTimePlaying, setIsPomodoroTimePlaying] = useState(false)
	const [isBreakTimePlaying, setIsBreakTimePlaying] = useState(false)
	const [breakTimeout, setBreakTimeout] = useState()
	const [pomodoroTimeout, setPomodoroTimeout] = useState()
	const [templates, setTemplates] = useState([])
	const [isAudioPlaying, setIsPlaying] = useState(false)
	const [alarmLink, setAlarmLink] = useState(ALARM_LINKS[0])
	const [alarmPlay, setAlarmPlay] = useState(false)

	const audioRef = useRef()
	const alarmRef = useRef()
	const noisesRef = useRef([])

	useEffect(() => {
		if (isPomodoroTimePlaying) {
			if (!pomodoroTimeCd) {
				console.log('time out')
				if (alarmPlay) {
					alarmRef.current.play()
					setTimeout(() => alarmRef.current.pause(), 7000)
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
					alarmRef.current.play()
					setTimeout(() => alarmRef.current.pause(), 7000)
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
		modalType,
		setModalType,
		background,
		setBackground,
		isAudioPlaying,
		setIsPlaying,
		templates,
		setTemplates,
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
		sessionList,
		setSessionList,
		pomodoroTimeout,
		breakTimeout,
	}

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
export default AppProvider
