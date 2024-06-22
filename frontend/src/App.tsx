import {  Route, BrowserRouter, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import "./App.css"

const App = () => {
  return (
    <div className='App'>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage />} />
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App