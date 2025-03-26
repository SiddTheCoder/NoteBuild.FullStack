import mongoose, { Schema } from "mongoose";

const collectionSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 40,
    minLenght: 3,
    unique: true,
  },
  isPrivate: {
    type: Boolean,
    default : false
  },
  collectionCoverImage: {
    type: String,
    required : true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'User'
  },
  subTodos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Todo'
    }
  ]

},{timestamps:true})

export const Collection = mongoose.model('Collection',collectionSchema)