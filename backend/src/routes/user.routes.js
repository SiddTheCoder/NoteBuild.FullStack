import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  loginUser,
  registerUser,
  getCurrentUser,
  logoutUser
} from '../controllers/user.controller.js'



const router = Router()

//unsecured routes
router.route('/register-user').post(upload.single('avatar'),registerUser)
router.route('/login-user').post(loginUser)



//secured routes
router.route('/logout-user').get(verifyJWT,logoutUser)
router.route('/get-current-user').get(verifyJWT,getCurrentUser)



export default router