import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import { uploadOnCloudinary } from '../utils/Cloudinary.js'
import  Collection  from '../models/collection.model.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { User } from '../models/user.model.js'


const uploadCollection = asyncHandler(async (req, res) => {
  const { userId } = req.params
  
  const { name, isPrivate } = req.body
  if (!name) throw new ApiError(400, 'Collection Name is required')
  
  const collectionCoverImageLocalPath = req.file?.path

  if (!collectionCoverImageLocalPath) {
    throw new ApiError(401,'Error while loading image by multer')
  }

  const collectionCoverImage = await uploadOnCloudinary(collectionCoverImageLocalPath)

  if (!collectionCoverImage) {
    throw new ApiError(500,'Error while uploading on Cloudinary')
  }

  const collection = await Collection.create({
    name: name,
    isPrivate : isPrivate || false,
    collectionCoverImage: collectionCoverImage?.url,
    owner : req.user?._id
  })

  // creating user for updating collection state in user data
  const user = await User.findById(req.user?._id)
  if (!user) {
    throw new ApiError(404,'User Didnt Found')
  }
  user?.collections.push(collection?._id)
  await user?.save()

  return res
    .status(200)
    .json(new ApiResponse(
      200,
      collection,
      `Collection named ${name} is successfully created`
  ))
})

const getUserCollections = asyncHandler(async (req, res) => {
  const { userId } = req.params
  
  if (!userId) {
    throw new ApiError(400,'User ID is required')
  }

  const userExist = await User.findById(userId)
  if (!userExist) {
    throw new ApiError(404,'No User Found with Such Id')
  }

  const user = await User.findById(userId).populate({
    path: 'collections',
    select: '-owner',
     options: { sort: { createdAt: -1 } } // Sort by createdAt DESC (newest first)
  }).select('username fullName email collections')


  return res
    .status(200)
    .json(new ApiResponse(
      200,
      user,
      'User Collection Fetched Successfully'
  ))

})

const updateCollection = asyncHandler(async (req, res) => {
  
  const { collectionId } = req.params
  if (!collectionId) {
    throw new ApiError(400,'Collection ID is required')
  }

  const { name, isPrivate } = req.body
  if (!(name || isPrivate)) {
    throw new ApiError(400,'Atleast one field is required')
  }

  const collectionCoverImageLocalPath = req.file?.path

  let collectionCoverImage;
  if (collectionCoverImageLocalPath) {
    imageObject = await uploadOnCloudinary(collectionCoverImageLocalPath)
    if (!imageObject) {
      throw new ApiError(500, 'Error occured while uploading on cloudinary')
    }
    collectionCoverImage = imageObject.url
  }

  let collection = await Collection.findById(collectionId)
  collection = await Collection.findByIdAndUpdate(
    collectionId,
    {
      name: name || collection?.name,
      isPrivate: isPrivate || collection?.isPrivate ,
      collectionCoverImage : collectionCoverImage
    },
    {new : true}
  )

  return res
    .status(200)
    .json(new ApiResponse(
      200,
      collection,
      'Collection Updated Successfully'
  ))
})

const deleteCollection = asyncHandler(async (req, res) => {

  const { collectionId } = req.params

  if (!collectionId) {
    throw new ApiError(400,'Collection ID is required')
  }

  const collection = await Collection.findById(collectionId)

  if (!collection) {
    throw new ApiError(404,'Collection didnt Exist')
  }
  if (!collection.owner.equals(req.user?._id)) {
    throw new ApiError(403,'You are not authorized to Delete this collection')
  }

  await Collection.findByIdAndDelete(collectionId)

  return res
    .status(200)
    .json(new ApiResponse(
      200,
      {},
      'Collection Deleted Successfully'
  ))
})


export {
  uploadCollection,
  getUserCollections,
  updateCollection,
  deleteCollection
}
