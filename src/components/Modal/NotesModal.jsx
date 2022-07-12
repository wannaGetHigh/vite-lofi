import { useContext, useState } from 'react'
import Draggable from 'react-draggable'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import Button from '../Button'
import { AppContext } from '../../context/AppProvider'
import {
	closeIcon,
	titleNotesIcon,
	newNoteIcon,
	binIcon,
} from '../../assets/icons'

function NotesModal() {
	const { setModalType } = useContext(AppContext)
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')

	return (
		<Draggable handle=".handle">
			<div className="relative w-[660px] bg-bl rounded-2xl select-none z-50">
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

						<div className="flex justify-center items-center h-[400px] border border-white rounded-2xl">
							No note
						</div>
					</div>

					{/* Right side */}
					<div className="w-2/3">
						<div className="flex items-center mx-2">
							<Button className="block">
								<img src={newNoteIcon} alt="add new note" className="w-6 h-6" />
							</Button>

							<Button className="block">
								<img src={binIcon} alt="bin" className="w-9 h-9" />
							</Button>

							<input
								placeholder="Add title here..."
								className="mr-4 bg-black text-3xl"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
						<div className="mt-2 h-[400px]">
							<CKEditor
								editor={ClassicEditor}
								data="<p>Hello from CKEditor 5!</p>"
								onReady={(editor) => {
									// You can store the "editor" and use when it is needed.
									console.log('Editor is ready to use!', editor)
								}}
								onChange={(event, editor) => {
									const data = editor.getData()
									console.log({ event, editor, data })
								}}
								onBlur={(event, editor) => {
									console.log('Blur.', editor)
								}}
								onFocus={(event, editor) => {
									console.log('Focus.', editor)
								}}
							/>
						</div>
						<Button className="px-6 py-1 block ml-auto bg-primary rounded-full text-black font-semibold">
							Save
						</Button>
					</div>
				</div>
			</div>
		</Draggable>
	)
}
export default NotesModal
