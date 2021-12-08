const mongoose = require('mongoose')

const wishListSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  recipe: {
    type: new mongoose.Schema({
      _id: mongoose.Schema.Types.ObjectId,
      authorId: {
        type: mongoose.Schema.Types.ObjectId
      },
      authorUsername: {
        type: String,

        trim: true
      },
      label: {
        type: String,
        required: true,
        minlength: 3
      },
      source: {
        type: String
      },
      url: String,
      dietLabels: [],
      healthLabels: [],
      ingredients: [],

      makingDescription: {
        type: String
      },
      cuisineType: [],
      mealType: []
    }),
    required: true
  }
})

const WishList = mongoose.model('wishlist', wishListSchema)
module.exports = WishList
