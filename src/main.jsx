import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AppProvider from './context/AppProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AppProvider>
			<App />
		</AppProvider>
	</React.StrictMode>,
)

// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { CKEditor } from '@ckeditor/ckeditor5-react'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

// function MyEditor() {
// 	const [toggle, setToggle] = React.useState(false)
// 	const [currentNote, setCurrentNote] = React.useState({
// 		title: '',
// 		content: '',
// 	})

// 	const Editor = (
// 		<CKEditor
// 			editor={ClassicEditor}
// 			data={currentNote?.content}
// 			onBlur={(_, editor) => {
// 				console.log(editor.id)
// 				setCurrentNote({ ...currentNote, content: editor.getData() })
// 			}}
// 		/>
// 	)

// 	return (
// 		<div className="w-screen h-screen">
// 			<button className="w-full h-5" onClick={() => setToggle(true)}>
// 				Editor on
// 			</button>
// 			<button className="w-full h-5" onClick={() => setToggle(false)}>
// 				Editor off
// 			</button>
// 			{toggle && Editor}
// 		</div>
// 	)
// }

// ReactDOM.createRoot(document.getElementById('root')).render(
// 	<React.StrictMode>
// 		<MyEditor />
// 	</React.StrictMode>,
// )
