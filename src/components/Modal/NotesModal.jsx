import { useContext, useState, useEffect } from 'react'
import Draggable from 'react-draggable'
import { convert } from 'html-to-text'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '../../customCKEditor.css'
import { v4 as uuidv4 } from 'uuid'

import Button from '../Button'
import { AppContext, AuthContext } from '../../context'
import {
	closeIcon,
	titleNotesIcon,
	newNoteIcon,
	binIcon,
} from '../../assets/icons'
import { addNote, updateNote, removeNote } from '../../firebase'
import { getDate } from '../../utils'

function NotesModal() {
	const { uid, notesList } = useContext(AuthContext)
	const { setModalType } = useContext(AppContext)

	const [currentNote, setCurrentNote] = useState({
		id: '',
		title: '',
		content: '',
	})
	const [renderEditor, setRenderEditor] = useState(false)

	const saveNote = () => {
		if (currentNote.id) {
			const title = currentNote.title
			const content = currentNote.content

			updateNote(uid, currentNote.id, { title, content })
		} else {
			addNote(uid, {
				id: uuidv4(),
				title: currentNote.title,
				content: currentNote.content,
			})
		}
		resetNote()
	}

	const deleteNote = (id) => {
		if (id) {
			removeNote(uid, id)
			resetNote()
		}
	}

	const resetNote = () => {
		setCurrentNote({ id: '', title: '', content: '' })
	}

	// Hot fix CKEditor instance null
	useEffect(() => setRenderEditor(true), [])

	return (
		<Draggable handle=".handle">
			<div className="relative w-[660px] bg-bl rounded-2xl select-none z-40">
				<Button
					className="absolute top-4 right-4 hover:opacity-50 cursor-pointer"
					onClick={() => setModalType(null)}
				>
					<img src={closeIcon} alt="close notes" />
				</Button>

				<div className="p-6 flex gap-4">
					{/* Left side */}
					<div className="w-1/3">
						<div className="relative handle mb-6 cursor-move">
							<h3 className="w-2/3 mx-4 text-4xl font-bold">Notes</h3>
							<img
								src={titleNotesIcon}
								alt="title-draw"
								className="absolute left-2.5 -bottom-2.5 pointer-events-none"
							/>
						</div>

						<div className="h-[400px] border border-transparent-w-20 rounded-2xl overflow-y-auto">
							{notesList.length === 0 ? (
								<div className="flex items-center justify-center h-full">
									No notes
								</div>
							) : (
								notesList.map((note) => (
									<div
										key={note.id}
										className={`w-full hover:opacity-70 p-2 cursor-pointer border-t border-transparent-w-20 ${
											note.id === currentNote.id ? 'bg-primary text-black' : ''
										}`}
										onClick={() => setCurrentNote(note)}
									>
										<h5 className="text-lg font-medium">{note.title}</h5>
										<time className="text-xs">
											{getDate(note?.createdAt?.seconds)}
										</time>
										<p className="text-sm truncate">{convert(note.content)}</p>
									</div>
								))
							)}
						</div>
					</div>

					{/* Right side */}
					<div className="w-2/3">
						<div className="flex items-center justify-start mx-2 w-full">
							<Button className="shrink-0" onClick={resetNote}>
								<img src={newNoteIcon} alt="add new note" className="w-6 h-6" />
							</Button>

							<Button
								className="shrink-0"
								onClick={deleteNote.bind(this, currentNote.id)}
							>
								<img src={binIcon} alt="bin" className="w-9 h-9" />
							</Button>

							<input
								placeholder="Add title here..."
								className="w-[300px] ml-2 mr-4 bg-black text-3xl"
								value={currentNote.title}
								onChange={(e) =>
									setCurrentNote({ ...currentNote, title: e.target.value })
								}
							/>
						</div>
						<div className="mt-2 h-[400px]">
							{renderEditor && (
								<CKEditor
									editor={ClassicEditor}
									data={currentNote?.content}
									onBlur={(_, editor) => {
										setCurrentNote({
											...currentNote,
											content: editor.getData(),
										})
									}}
								/>
							)}
						</div>
						<Button
							className="px-6 py-1 block ml-auto bg-primary rounded-full text-black font-semibold"
							onClick={saveNote}
						>
							Save
						</Button>
					</div>
				</div>
			</div>
		</Draggable>
	)
}
export default NotesModal
