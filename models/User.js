const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please provide a valid email"]
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters long."],
    select: false,
  },
  customerId: {
    type: String,
    default: "",
  },
  susbscription: {
    type: String,
    default: "",
  },
})

// hash password before saving to DB
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    next()
  }
  const salt = await bcrypt.genSalt(12)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// match passwords
userSchema.methods.matchPasswords = async function(password) {
  return await bcrypt.compare(password, this.password)
}

// sing JWT and return
userSchema.methods.getSignedJwtToken = function(res) {
  const accessToken = jwt.sign({id: this._id}, process.env.JWT_ACCESS_SECRET, {expiresIn: process.env.JWT_ACCESS_EXPIRE})
  const refreshToken = jwt.sign({id: this._id}, process.env.JWT_REFRESH_SECRET, {expiresIn: process.env.JWT_REFRESH_EXPIRE})
  resizeBy.cookie('refreshToken', `${refreshToken}`, {maxAge: 86400 * 7000, httpOnly: true})
  return {accessToken, refreshToken}
}

const User = mongoose.model("User", userSchema)

module.exports = User