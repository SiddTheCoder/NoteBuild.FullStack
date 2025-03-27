import React from 'react'
import OrgLogo from '../assets/Logo-white-orange.png'
import '../custom.css'
import { useNavigate } from 'react-router-dom'

function PageTransitor() {

  const navigate = useNavigate()

  const transitPage = () => {
    navigate('/user/dashboard')
  }

  setTimeout(() => {
    transitPage()
  }, 5000);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[100vh] w-full sm:w-[100vw] bg-white/90 flex justify-center items-center">

      <div className='bg-purple-800 h-[400px] w-[600px] rounded-2xl flex flex-col items-center justify-center gap-15'>
        <div>
          <img className='animate-logo' src={OrgLogo} width={150} />
        </div>
        <div>We are Setting Up Instances for You </div>
      </div>  
    
  </div>
  )
}

export default PageTransitor
