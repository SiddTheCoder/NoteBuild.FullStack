import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import UserContext from '../context/UserContext'
import CreateNewCollection from './CreateNewCollection'
import { EllipsisVertical, Beaker } from 'lucide-react'
import SureWantTo from './SureWantTo'


function Collection() {

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [collections, setCollections] = useState([])
  const [createNewCollection, setCreateNewCollection] = useState(false)

  const [openConfirmBox,SetOpenConfirmBox] = useState(null)
  
  const [openConfigs,setOpenConfigs] = useState({}) // for 3 dots button
  
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


  const toggleCollectionConfig = (collectionId) => {
    setOpenConfigs((prev) => ({
    [collectionId] : !prev[collectionId]
  }))
}

  // function to close the confirmDeleteBox
  const closeConfirmBox = () => {
    SetOpenConfirmBox(null)
  }

  //function to getUpdated Collections after deletion
  const refreshCollections = () => {
    getCollections(currentUser?._id)
  }
  
  return (
    <div className='h-[100%] w-[100%] bg-[#202216]  flex flex-col p-5'>
      <div className='mb-2 w-full h-8 flex justify-end items-center gap-5 pr-10'>
        <span className='text-sm'>Collection : { collections.length }</span>
        <div
          onClick={() => setCreateNewCollection(true)}
          className='hover:bg-purple-500 bg-purple-600 text-white text-sm px-2 py-2 cursor-pointer rounded-md'>
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

                  <div onClick={() => toggleCollectionConfig(collection._id)} className='relative hover:border-2 border-white rounded-full h-10 w-10 flex justify-center items-center font-bold transition-all duration-300 ease-initial active:bg-white active:text-purple-950 '><EllipsisVertical />
                    {openConfigs[collection._id] && 
                      <div className='h-44 w-54 -left-45 top-11 bg-white p-3 rounded absolute flex-col text-black'>
                        <div onClick={() => SetOpenConfirmBox(collection._id)} className='text-md hover:text-red-600 hover:bg-purple-950 transition-all duration-75 ease-in bg-purple-500 p-2 rounded flex items-center justify-between pr-5'><span>Delete</span> <Beaker /></div>
                        
                   </div>
                  }
                  </div>

                   
                 
            </div>
          </div>
             <div className="h-[80%] w-full bg-purple-900 overflow-hidden flex justify-center items-center">
                <img
                  src={collection.collectionCoverImage}
                  alt=""
                  className="h-full w-full object-cover hover:scale-[1.2] hover:-rotate-4 transition-all duration-500 ease-in-out"
                />
              </div>
              <div className='h-10 w-full text-right text-[14px] mt-2'>Todos : { collection.subTodos.length }</div>
        </div>
          )))
        }

       <div>{openConfirmBox && <SureWantTo collectionId={openConfirmBox} closeConfirmBox={closeConfirmBox} refreshCollections={refreshCollections} />}</div>
        
      </div>
    </div>
  )
}

export default Collection


