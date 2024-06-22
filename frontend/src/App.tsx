import {  Route, BrowserRouter, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import "./App.css"
import ChatPage from './pages/ChatPage'
import axios from 'axios'
axios.defaults.withCredentials = true
import UserContextProvider from './context/UserContext'

const App = () => {
  return (
    <div className='App'>
    <UserContextProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/chat' element={<ChatPage />} />
    </Routes>
    </BrowserRouter>
    </UserContextProvider>
    </div>
  )
}

export default App