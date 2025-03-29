import React, { useState } from 'react'
import axios from 'axios'

function SureWantTo({ collectionId, closeConfirmBox , refreshCollections }) {

  const [message,setMessage ] = useState('')
  

  const deleteCollection = async (collectionId) => {
    try {
      console.log('Requestiong to Delete the Collection ', collectionId)
      const response = await axios.post(`http://localhost:8000/api/c/delete-collection/${collectionId}`,
        {},
        { withCredentials : true})
      console.log('Request Accepted to Delete the Collection ', response)

      if (response.data.data.statusCode == 200 || response.status == 200 || response.statusText == 'OK') {
        closeConfirmBox()
        refreshCollections()
      }
      
    } catch (error) {
      console.log('error occured' ,error)
    }
  }

  const handleClose = () => {
    // console.log('Close Clicked')
    closeConfirmBox()
    // console.log('closing func exucted')
  }

  return (
    <div className='fixed inset-0 bg-white/50 flex justify-center items-center z-50 pointer-events-none'>
      <div className='h-[250px] w-[500px] bg-purple-700 rounded shadow-lg flex flex-col gap-5 pointer-events-auto'>
        <div className='text-lg px-5 h-12 mt-15 '>Do You Really Want to <span className='text-xl text-red-500 hover:text-red-200 pointer-events-auto'>Delete</span> this Collection ?</div>
        <div className='w-full flex justify-end pr-5 gap-3 relative top-15'>
          <div onClick={handleClose} className='bg-purple-950 text-white px-4 py-2 rounded hover:bg-white hover:text-purple-950 cursor-pointer transition-all duration-100 ease-in-out pointer-events-auto'>Cancel</div>
          <div onClick={() => deleteCollection(collectionId)} className='bg-purple-950 text-white px-4 py-2 rounded hover:bg-white hover:text-purple-950 cursor-pointer transition-all duration-100 ease-in-out pointer-events-auto'>Delete</div>
        </div>
      </div>
    </div>
  )
}

export default SureWantTo
