import React, { useState, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import axios from 'axios'

const PrivateRoute = () => {
  

  const [isAuthenticated, setIsAuthenticated] = useState(null)
  
   useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Sending request to verify user')
        const response = await axios.get('http://localhost:8000/api/auth/verifyUser', {
          withCredentials: true,  
        });
        console.log('Request ACcepted For Verificaton of user' , response)
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error('Error verifying user:', err);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;  // Show a loading spinner if still checking

  return isAuthenticated ? <Outlet /> : <Navigate to="/user/login" />;
}

export default PrivateRoute
