import mongoose, { Schema } from "mongoose";

const collectionSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 40,
    minLenght: 3,
  },
  isPrivate: {
    type: Boolean,
    default : false
  },
  collectionCoverImage: {
    type: String
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

const Collection = mongoose.model('Collection', collectionSchema);

// Remove the unique index on the `name` field, if it exists
Collection.collection.dropIndex('name_1', (err, result) => {

});

export default Collection;