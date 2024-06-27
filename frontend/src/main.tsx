import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CssBaseline } from '@mui/material'
import ChatContextProvider from './context/ChatContext.tsx'
import UserContextProvider from './context/UserContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline />
    <UserContextProvider>
      <ChatContextProvider>
        <App />
      </ChatContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
)
