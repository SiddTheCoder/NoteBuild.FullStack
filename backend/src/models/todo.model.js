import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxLength: 150,
    minLenght: 3,
  },
  description: {
    type: String,
    default: 'Description',
    maxLength : 500
  },
  isChecked: {
    type: Boolean,
    default : false
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Collection'
  }
}, {timestamps: true})

export const Todo = mongoose.model('Todo',todoSchema)