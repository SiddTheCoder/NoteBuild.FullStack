import React, { useState } from "react";
import axios from "axios";
import GuestDefaultImg from '../assets/Guest-Default.jpg'

function CreateNewCollection({ onClose , addNewCollection }) { // Accept onClose prop from parent
  const [collectionTitle, setCollectionTitle] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [fileName, setFileName] = useState("Upload Cover Image");
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);


  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || GuestDefaultImg;
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFileName(file.name);
    } else {
      setFileName("No file chosen");
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", collectionTitle);
  formData.append("collectionCoverImage", e.target.elements.avatar.files[0]); // Send the file as well

  try {
    setLoading(true);
    console.log('Sending Request with data', formData);
    const response = await axios.post('http://localhost:8000/api/c/upload-collection', formData, { 
      withCredentials: true, 
      headers: { 'Content-Type': 'multipart/form-data' } 
    });

    console.log('Collection Created Successfully');
    setLoading(false);
    addNewCollection(response.data.data)
    onClose(); // Close modal after successful creation

  } catch (err) {
    setMessage(err.response?.data?.message || "Something went wrong");
    setLoading(false);
  }
};


  return (
    <>
      <div className="z-50 w-[100%] sm:h-[500px] sm:w-[700px] bg-linear-to-r bg-purple-400 rounded absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 shadow-amber-50 shadow-xl">
        <form onSubmit={handleSubmit} method="post" encType="multipart/form-data" className="flex flex-col">
          <div className="flex justify-between items-center">
            <input
              required
              value={collectionTitle}
              onChange={(e) => setCollectionTitle(e.target.value)}
              type="text"
              placeholder="Collection Name"
              className="h-12 w-[40%] bg-slate-800 p-3 rounded-md text-md active:bg-purple-500 outline-none text-white"
            />

            <label className="min-h-[50px] max-h-max w-[30%] bg-slate-700 text-white flex items-center justify-center rounded cursor-pointer p-3 text-sm hover:bg-purple-600 transition-all duration-200 ease-in">
              {fileName}
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex h-[350px] w-full justify-between items-center mt-1">
            {imagePreview ? (
              <div className="w-[80%] h-[100%] object-contain overflow-hidden mx-auto">
                <img src={imagePreview} className="mt-10 rounded-md" alt="Preview" />
              </div>
            ) : (
              <div className="w-[65%] h-[100%] bg-gray-700 rounded animate-pulse mt-5 mx-auto"></div>
            )}
          </div>
          
          <div className="w-full h-10 flex justify-between pr-5 mt-4">
            <button onClick={onClose} className="bg-red-900 text-white text-md py-2 px-5 cursor-pointer hover:bg-red-500 transition-all duration-100 ease-linear rounded">
              Cancel
            </button>
            <button type="submit" className="bg-purple-800 text-white text-md py-2 px-5 cursor-pointer hover:bg-purple-500 transition-all duration-100 ease-linear rounded">
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateNewCollection;
