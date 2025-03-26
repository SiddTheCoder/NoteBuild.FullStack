import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  uploadCollection,
  getUserCollections,
  updateCollection,
  deleteCollection,
} from '../controllers/collection.controller.js'

const router = Router()

router.route('/get-user-collections/:userId').get(getUserCollections)

//secured routes
router.route('/upload-collection').post(
  upload.single('collectionCoverImage'),
  verifyJWT,
  uploadCollection
)

router.route('/update-collection/:collectionId').patch(
  upload.single('collectionCoverImage'),
  verifyJWT,
  updateCollection
)

router.route('/delete-collection/:collectionId').post(verifyJWT,deleteCollection)

export default router