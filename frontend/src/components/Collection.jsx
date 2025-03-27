import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import UserContext from '../context/UserContext'

function Collection() {

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [collections,setCollections] = useState([])
  
  const { user , setUser } = useContext(UserContext)

  
  const getCollections = async (userId) => {
    try {
      setLoading(true)
      console.log('Requesting to Fetch the Collection')
      const response = await axios.get(`http://localhost:8000/api/c/get-user-collections/${userId}`)
        withCredentials: true // Sends cookies automatically
      setCollections(response.data.data.collections)
      setLoading(false)
    } catch (err) {
      if (err.response) {
        setMessage(err.message)
      }
    }
  }


useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser) {
    setUser(storedUser);
  }
}, []);

useEffect(() => {
  if (user?._id) {
    getCollections(user._id);
  }
}, [user]);
  
useEffect(() => {
  console.log('updated Collections ', collections)
}, [collections])  
  


  return (
    <div className='h-[100vh] w-[100vw] bg-[#202216] flex flex-col p-5'>
      <div className='mb-2 w-full h-10 flex justify-end items-center gap-5'>
        <span>Collection : { collections.length }</span>
        <div className='hover:bg-purple-500 bg-purple-600 text-white px-5 py-2 cursor-pointer rounded-md'>New Collection</div>
      </div>
      <hr />
      <div className='h-full w-full flex flex-wrap p-5 gap-8 justify-center md:justify-start overflow-y-scroll'>

        {loading ? (<div> Loading ... </div>) :
          (collections.map((collection) => (
            <div key={collection._id} className='h-[340px] w-[400px] bg-purple-950 rounded-xl p-3 hover:scale-[1.01] transition-all duration-300 ease-in-out cursor-pointer'>
          <div className='w-full h-8 flex justify-between px-2 items-center mb-2'>
                <span>{collection.name}</span>
            <div className='hover:border-2 border-white rounded-full h-10 w-10 flex justify-center items-center font-bold transition-all duration-300 ease-initial active:bg-white active:text-purple-950 '>:</div>
          </div>
              <div className='h-[80%] w-full bg-white object-cover overflow-hidden'>
                <img src={collection.collectionCoverImage} alt="" />
          </div>
              <div className='h-10 w-full text-right text-sm mt-1'>Created At : { new Date(collection.createdAt ).toDateString()}</div>
        </div>
          )))
        }

       
      </div>
    </div>
  )
}

export default Collection



{/* <div className='h-[340px] w-[350px] bg-purple-950 rounded-xl p-3 hover:scale-[1.01] transition-all duration-300 ease-in-out cursor-pointer'>
          <div className='w-full h-8 flex justify-between px-2 items-center mb-2'>
            <span>Title</span>
            <div className='hover:border-2 border-white rounded-full h-10 w-10 flex justify-center items-center font-bold transition-all duration-300 ease-initial active:bg-white active:text-purple-950 '>:</div>
          </div>
          <div className='h-[80%] w-full bg-white'>img</div>
          <div className='h-10 w-full text-right'>Created At</div>
        </div> */}