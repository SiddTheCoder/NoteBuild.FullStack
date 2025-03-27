
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
        <Route path='/user/register' element={<Register />} />
        <Route path='/user/login' element={<Login />} />
        <Route path='/user/dashboard' element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
