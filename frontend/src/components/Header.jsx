import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Settings } from 'lucide-react';

function Header() {

  const [currentUser, setCurrentUser] = useState(null)


   const getCurrentUser = async () => {
    try {
      // console.log('Requesting to Get Current User from header')
      const response = await axios.get('http://localhost:8000/api/user/get-current-user', {
        withCredentials : true
      })
      // console.log('Request Accepted to Get Current User',response)
      setCurrentUser(response.data.data)
    } catch (err) {
      
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, [])
  

  return (
    <header className='h-12 bg-purple-600 flex justify-between px-2'>
      <div>Logo</div>

      <div className='flex justify-around items-center gap-2'>
        <div><Settings className='hover:animate-spin cursor-pointer hover:scale-[1.2] transition-all duration-150 ease-in' /></div>

        <div className='flex justify-between items-center gap-2 pr-2 cursor-pointer bg-purple-500/90 hover:bg-purple-400 py-1 px-3 rounded transition-all duration-100 ease-in'>
          <div className='flex flex-col items-center justify-center h-6 text-sm'>
            <span className='text-sm'>{currentUser?.fullName}</span>
          </div>
          <div className='h-8 w-8 rounded-full bg-white overflow-hidden object-cover'>
            <img src={currentUser?.avatar}/>
            </div>
        </div>

      </div>

    </header>
  )
}

export default Header
