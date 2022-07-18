export const randomSong = (list) => {
	let randomIndex = Math.floor(Math.random() * list.length)
	return { list, index: randomIndex, link: list[randomIndex] }
}

export const nextSong = (list, currentIndex) => {
	let newIndex
	if (currentIndex < 0 || currentIndex >= list.length - 1) {
		newIndex = 0
	} else {
		newIndex = currentIndex + 1
	}
	return { list, index: newIndex, link: list[newIndex] }
}

export const prevSong = (list, currentIndex) => {
	let newIndex
	if (currentIndex <= 0 || currentIndex > list.length - 1) {
		newIndex = list.length - 1
	} else {
		newIndex = currentIndex - 1
	}
	return { list, index: newIndex, link: list[newIndex] }
}
