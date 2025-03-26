import mongoose, { Schema } from "mongoose";

const collectionSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 20,
    minLenght: 3,
    unique: true,
  },
  private: {
    type: Boolean,
    default : false
  },
  collectionCoverImage: {
    type: String,
    required : true
  },
  subTodo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Todo'
    }
  ]

},{timestamps:true})

export const Collection = mongoose.model('Collection',collectionSchema)