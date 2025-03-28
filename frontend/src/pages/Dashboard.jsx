import React from 'react'
import Collection from '../components/Collection';

function Dashboard() {
  return (
    <>
      <div className='h-screen w-screen flex overflow-hidden'>
        <div className='h-[95%] w-[400px] bg-yellow-200'>Sidebar</div>

        <div className='flex flex-col w-full'> 
          <div className='h-12 bg-purple-600'>Header</div>
          <div className='flex-1 overflow-hidden'> 
            <Collection />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard;
