import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Register from './pages/Register'
import Lander from './pages/Lander'
import Login from './pages/Login'
import DashBoard from './pages/Dashboard'
import PrivateRoute from './components/Private/PrivateRoute';

function App() {

 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Lander />} />
        <Route path='/user/register' element={<Register />} />
        <Route path='/user/login' element={<Login />} />
        
        {/* Protected Route for Dashboard */}
        <Route element={<PrivateRoute />}>
          <Route path='/user/dashboard' element={<DashBoard />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
