const mongoose = require('mongoose')
const Joi = require('joi')

const JoiSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net', 'edu'] }
  })
})

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      trim: true
    },
    phone: {
      type: Number,
      required: true,
      minlength: 10,
      trim: true
    },
    isAdmin: { type: Boolean, default: false }
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

module.exports = User
