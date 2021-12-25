const mongoose = require('mongoose')

const wishListSchema = new mongoose.Schema({
  recipe_id: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  recipe: {
    type: new mongoose.Schema({
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
      cuisineType: String,
      mealType: []
    }),
    required: true
  }
})

const WishList = mongoose.model('wishlist', wishListSchema)
module.exports = WishList
