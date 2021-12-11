const mongoose = require('mongoose')

//feedbackSchema
const feedbackSchema = new mongoose.Schema({
  feedbackText: String,
  userId: mongoose.Schema.Types.ObjectId,
  username: String,
  email: String
})
const Feedback = mongoose.model('feedback', feedbackSchema)
module.exports = Feedback
