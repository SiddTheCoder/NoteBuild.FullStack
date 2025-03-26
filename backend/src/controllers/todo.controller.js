import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from '../utils/asyncHandler.js'
import { Todo } from '../models/todo.model.js'
import { Collection } from "../models/collection.model.js";

const uploadTodo = asyncHandler(async (req, res) => {

  const { title, isChecked, description, collectionId } = req.body
  
  if (!title) {
    throw new ApiError(400,'Title is required')
  }

  if (!collectionId) {
    throw new ApiError(400,'Collection ID is required')
  }
  
  const collection = await Collection.findById(collectionId)
  if (!collection) {
    throw new ApiError(404,'No Collection with such ID found')
  }

  const todo = await Todo.create({
    title: title,
    description,
    isChecked,
    category : collectionId,
  })

  collection.subTodos.push(todo)
  await collection.save()

  return res
    .status(200)
    .json(new ApiResponse(
      200,
      todo,
      'Todo Created Successfully'
  ))
})

const getAllTodos = asyncHandler(async (req, res) => {
  const { collectionId } = req.params
  if (!collectionId) {
    throw new ApiError(400,'Collection ID is required')
  }

  const todos = await Collection.findById(collectionId).populate({
    path: 'subTodos',
    select: 'title'
  }).select('owner subTodos')

  return res
    .status(200)
    .json(new ApiResponse(
      200,
      todos,
      'All Todos Fetched Successfully'
  ))
})

const updateTodo = asyncHandler(async (req, res) => {
  const { todoId } = req.params
  if (!todoId) {
    throw new ApiError(400,'Todo ID is required')
  }

  const { title, description, isChecked } = req.body


  let todo = await Todo.findById(todoId)
  
  const updatedTodo = await Todo.findByIdAndUpdate(
    todoId,
    {
      title: title || todo.title,
      description: description || todo.description,
      isChecked : isChecked || todo.isChecked
    },
    {new : true}
  )

  return res
    .status(200)
    .json(new ApiResponse(
      200,
      updatedTodo,
      'Todo Update successfully'
  ))
})

const deleteTodo = asyncHandler(async (req, res) => {
  const { todoId } = req.params
  if (!todoId) {
    throw new ApiError(400,'Todo ID is required')
  }

  await Todo.findByIdAndDelete(todoId)

  return res 
    .status(200)
    .json(new ApiResponse(
      200,
      {},
      'Todo Deleted Successfully'
  ))
})



export {
  uploadTodo,
  getAllTodos,
  updateTodo,
  deleteTodo
}