import React from 'react'
import Collection from '../components/Collection';
import Header from '../components/Header';

function Dashboard() {
  return (
    <>
      <div className='h-screen w-screen flex overflow-hidden'>
        <div className='h-[100%] w-[400px] bg-yellow-200'>Sidebar</div>

        <div className='h-[100%] flex flex-col w-full'> 
          <div className='h-12 bg-purple-600'><Header /></div>
          <div className='flex-1 overflow-hidden'> 
            <Collection />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard;
