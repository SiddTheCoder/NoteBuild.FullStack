import { Router } from 'express'
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  uploadTodo,
  getAllTodos,
  updateTodo,
  deleteTodo
} from '../controllers/todo.controller.js';

const router = Router()

router.route('/get-all-todos/:collectionId').get(getAllTodos)

//secured routes
router.route('/upload-todo').post(verifyJWT,uploadTodo)
router.route('/update-todo/:todoId').post(verifyJWT,updateTodo)
router.route('/delete-todo/:todoId').post(verifyJWT,deleteTodo)

export default router