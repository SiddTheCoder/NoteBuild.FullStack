import { PanelRightClose, PanelLeftClose } from 'lucide-react'
import React, { useState } from 'react'

function SideBar() {
  const [sideBarWidth, setSideBarWidth] = useState(false) // Use a boolean instead of 'min'/'max' initial min

  return (
    <div
      className={`h-full p-2 bg-purple-900/50 mr-1 justify-between transition-all duration-100 ease-in-out flex ${sideBarWidth ? 'w-[250px]' : 'w-[60px]'} `}
    >
      <div className={`h-full  ${sideBarWidth ? 'w-[35%]' : 'w-full'} flex flex-col items-center py-5`}>
        <div
          onClick={() => setSideBarWidth(!sideBarWidth)} // Toggle the width
          className=' bg-purple-300/90 p-1 transition-all duration-100 ease-in-out cursor-pointer rounded-md '
        >
          {sideBarWidth ? (
            <PanelLeftClose size={22} strokeWidth={1.5} />
          ) : (
            <PanelRightClose size={22} strokeWidth={1.5} />
          )}
        </div>
      </div>

      <div
        className={`h-full border-l-1 border-amber-50 w-5 ml-5 ${sideBarWidth ? 'flex' : 'hidden'}`}
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
