import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Register from './pages/Register'
import Lander from './pages/Lander'
import Login from './pages/Login'
import DashBoard from './pages/Dashboard'


function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Lander />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
