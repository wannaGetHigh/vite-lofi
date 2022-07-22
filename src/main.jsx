import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AppProvider, AuthProvider } from './context'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthProvider>
			<AppProvider>
				<App />
			</AppProvider>
		</AuthProvider>
	</React.StrictMode>,
)
