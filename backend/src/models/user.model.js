import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
  username: {
    type: String,
    required : true,
    lowercase : true,
    unique : true,
    trim : true,
    index : true,
  },
  email: {
    type : 'string',
    required : true,
    lowercase : true,
    unique : true,
    trim : true,
  },
  fullName: {
    type: String,
    required : true,
    trim : true
  },
  password: {
    type: String,
    required : true,
  },
  avatar: {
    type: String,
    required:true
  },
  collections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Collection'
    }
  ],
  refreshToken: {
    type: String,
  }
}, { timestamps: true })

//bcrypt password just before saving the userSchema
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next()
  }
  this.password = await bcrypt.hash(this.password, 10)
  next()
})


//creating new method to compare password using bcrypt
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

// generate access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      fullName : this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
  )  
}

//generate refresh Token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id : this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}



export const User = mongoose.model('User',userSchema)
