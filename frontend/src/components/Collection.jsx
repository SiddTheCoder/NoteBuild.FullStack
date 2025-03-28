import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import UserContext from '../context/UserContext'
import CreateNewCollection from './CreateNewCollection'
import { EllipsisVertical } from 'lucide-react'

function Collection() {

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [collections,setCollections] = useState([])
  const [createNewCollection,setCreateNewCollection] = useState(false)

  const [currentUser, setCurrentUser] = useState(null)

  const { user } = useContext(UserContext)
  
  const getCurrentUser = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/user/get-current-user', {
        withCredentials : true
      })
      setCurrentUser(response.data.data)
    } catch (err) {
      
    }
  }
  
  
  const getCollections = async (userId) => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:8000/api/c/get-user-collections/${userId}`)
      withCredentials: true // Sends cookies automatically
      setCollections(response.data.data.collections)
      console.log('Collection : ',response.data.data.collections )
      setLoading(false)
    } catch (err) {
      if (err.response) {
        setMessage(err.message)
      }
    }
  }



  
  useEffect(() => {
    getCurrentUser()
  } ,[])

useEffect(() => {
  if (currentUser) {
    getCollections(currentUser?._id);
  }
  }, [currentUser]);
  
 
  
   // Function to add the new collection to state immediately after creation
  const addNewCollection = (newCollection) => {
    setCollections((prevCollections) => [newCollection, ...prevCollections])
  }





  return (
    <div className='h-[100%] w-[100%] bg-[#202216]  flex flex-col p-5'>
      <div className='mb-2 w-full h-8 flex justify-end items-center gap-5 pr-10'>
        <span>Collection : { collections.length }</span>
        <div
          onClick={() => setCreateNewCollection(true)}
          className='hover:bg-purple-500 bg-purple-600 text-white text-md px-5 py-2 cursor-pointer rounded-md'>
          New Collection
        </div>
        {createNewCollection && <CreateNewCollection onClose={() => setCreateNewCollection(false)} addNewCollection={addNewCollection} />}
      </div>
      <hr />
      <div className='h-full w-full flex flex-wrap p-5 gap-5 justify-center  overflow-y-scroll'>

        {loading ? (<div> Loading ... </div>) :
          (collections.map((collection) => (
            <div key={collection._id} className='h-[350px] w-[350px] bg-purple-950 rounded-xl p-3 hover:scale-[1.01] transition-all duration-300 ease-in-out cursor-pointer'>
          <div className='w-full h-8 flex justify-between px-1 items-center mb-2'>
                <span>{collection.name}</span>
                <div className='flex justify-center items-center gap-2'>
                  <span>{new Date(collection.createdAt).toLocaleString('en-US', { month: 'short' }) + new Date(collection.createdAt).getDate()}</span>
                  <div className='hover:border-2 border-white rounded-full h-10 w-10 flex justify-center items-center font-bold transition-all duration-300 ease-initial active:bg-white active:text-purple-950 '><EllipsisVertical /></div>
            </div>
          </div>
              <div className='h-[80%] w-full bg-white object-cover overflow-hidden'>
                <img src={collection.collectionCoverImage} alt="" />
          </div>
              <div className='h-10 w-full text-right text-[14px] mt-2'>Todos : { collection.subTodos.length }</div>
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