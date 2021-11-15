const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      minlength: 3
    },
    source: {
      type: String
    },
    url: String,
    dietLabels: [String],
    healthLabels: [String],
    cautions: [String],
    ingredients: [
      {
        text: String,
        weight: Number
      }
    ],

    makingDescription: {
      type: String
    },
    cuisineType: [String],
    mealType: [String],
    dishType: [String]
  },
  { timestamps: true }
)

const Recipe = mongoose.model('Recipe', recipeSchema)
module.exports = Recipe
