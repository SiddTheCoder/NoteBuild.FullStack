import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie' // Import js-cookie to access cookies

const PrivateRoute = () => {
  const token = Cookies.get('accessToken') // Get token from cookies
    console.log(token)
  return token ? <Outlet /> : <Navigate to="/user/login" />
}

export default PrivateRoute
