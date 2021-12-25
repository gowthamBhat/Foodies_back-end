const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    authorUsername: {
      type: String,
      required: true,
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
    mealType: [String],
    likes: [],
    isReported: { type: Boolean, default: false }
  },
  { timestamps: true }
)

const Recipe = mongoose.model('Recipe', recipeSchema)
module.exports = Recipe
