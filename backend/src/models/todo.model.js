import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxLenght: 150,
    minLenght: 3,
  },
  isChecked: {
    type: Boolean,
    default : false
  }
}, {timestamps: true})

export const Todo = mongoose.model('Todo',todoSchema)