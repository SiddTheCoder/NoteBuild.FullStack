import React, { useState } from 'react'
import {
  PanelRightClose, PanelLeftClose, House, CircleHelp
  , FlaskConical,
  Shuffle,
  Layers2,
 } from 'lucide-react'

function SideBar() {
  const [sideBarWidth, setSideBarWidth] = useState(false) // Use a boolean instead of 'min'/'max' initial min

  return (
    <div
      className={`h-full p-2 bg-purple-900/50 mr-1 justify-between transition-all duration-100 ease-in-out flex ${sideBarWidth ? 'w-[250px]' : 'w-[60px]'} `}
    >
      <div className={`h-full  relative ${sideBarWidth ? 'w-[35%]' : 'w-full'} flex flex-col items-center py-5`} >

        <div
          onClick={() => setSideBarWidth(!sideBarWidth)} // Toggle the width
          className=' hover:bg-purple-300/90 bg-purple-300/20 p-1 transition-all duration-100 ease-in-out cursor-pointer rounded-md '
        >
          {sideBarWidth ? (
            <PanelLeftClose size={22} strokeWidth={1.5} />
          ) : (
            <PanelRightClose size={22} strokeWidth={1.5} />
          )}
        </div>

        <div className='border-b-1 w-[80%] border-purple-500 mb-5 mt-4 rounded-4xl'></div>

        {/* one Section */}
        <div className=' bg-purple-300/60 hover:bg-purple-300/90 p-1 transition-all duration-100 ease-in-out cursor-pointer rounded-md  mt-2'>
          <House size={20} strokeWidth={1.75} absoluteStrokeWidth />
        </div>
        <span className='text-[12px]'>Home</span>
        {/* one Section */}

        {/* one Section */}
        <div className=' bg-purple-300/30 hover:bg-purple-300/90 p-1 transition-all duration-100 ease-in-out cursor-pointer rounded-md mt-5'>
          <Layers2 strokeWidth={1.75} absoluteStrokeWidth />
        </div>
        <span className='text-[12px]'>Shortcuts</span>
        {/* one Section */}

        {/* one Section */}
        <div className=' bg-purple-300/30 hover:bg-purple-300/90 p-1 transition-all duration-100 ease-in-out cursor-pointer rounded-md mt-5'>
          <Shuffle strokeWidth={1.75} absoluteStrokeWidth />
        </div>
        <span className='text-[12px]'>Shuffle</span>
        {/* one Section */}

        {/* one Section */}
        <div className=' bg-purple-300/30 hover:bg-purple-300/90 p-1 transition-all duration-100 ease-in-out cursor-pointer rounded-md mt-5'>
          <FlaskConical strokeWidth={1.75} absoluteStrokeWidth />
        </div>
        <span className='text-[12px]'>Lab</span>
        {/* one Section */}

        {/* one Section */}
        <div className=' bg-purple-300/60 hover:bg-purple-300/90 p-1 transition-all duration-100 ease-in-out cursor-pointer rounded-md absolute bottom-5'>
          <CircleHelp size={22} strokeWidth={1.75} absoluteStrokeWidth />
        </div>
        <span className='absolute bottom-0 text-[12px]'>Help</span>
        {/* one Section */}
        

      </div>

      <div
        className={`h-full border-l-1 border-purple-500 w-5 ml-5 ${sideBarWidth ? 'flex' : 'hidden'}`}
      ></div>

      <div
        className={`py-5 h-full w-full ${sideBarWidth ? 'flex' : 'hidden'}`}
      >
        LogoName
      </div>
    </div>
  )
}

export default SideBar
