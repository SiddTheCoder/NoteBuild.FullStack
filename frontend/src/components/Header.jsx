import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Settings,Search } from 'lucide-react';

function Header() {

  const [currentUser, setCurrentUser] = useState(null)
  
  const [userGeneratedTextImg,setUserGeneratedTextImg] = useState(null)


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

    useEffect(() => {
    if (currentUser?.fullName) {
      const username = currentUser.fullName.split(' ')
      let firstName = username[0]?.charAt(0) || ''
      let secondName = username[1]?.charAt(0) || ''
      let textImage = `${firstName} ${secondName}`
      setUserGeneratedTextImg(textImage)
    }
  }, [currentUser])
  

  return (
    <header className='h-12 bg-purple-600/30 flex justify-between items-center pl-10 px-2'>
      <div className='flex gap-1 items-center justify-center cursor-pointer hover:bg-purple-950/50 py-1 px-4 rounded '>Search <Search className='relative top-[0.5px] hover:animate-bounce' size={20} strokeWidth={1.75} absoluteStrokeWidth /></div>

      <div className='flex justify-around items-center gap-2'>
        <div><Settings className='hover:animate-spin cursor-pointer hover:scale-[1.2] transition-all duration-150 ease-in' /></div>

        <div className='flex justify-between items-center gap-2 pr-2 cursor-pointer bg-purple-600/30 hover:bg-purple-600 py-1 px-3 rounded transition-all duration-100 ease-in'>
          <div className='flex flex-col items-center justify-center h-6 text-sm'>
            <span className='text-sm'>{currentUser?.fullName}</span>
          </div>
          <div className='h-8 w-8 rounded-full bg-white overflow-hidden object-cover flex justify-center items-center'>
            {currentUser?.avatar !== null ? (<img src={currentUser?.avatar}/>) : (  <span className="text-xs font-bold text-gray-700">{userGeneratedTextImg}</span>) }
            </div>
        </div>

      </div>

    </header>
  )
}

export default Header
