import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";

const router = Router()




router.route('/verifyUser').get( verifyJWT, (req, res) => {
  return res.status(200).json(new ApiResponse(200,{},'User Authorized Successfully'))
})

export default router