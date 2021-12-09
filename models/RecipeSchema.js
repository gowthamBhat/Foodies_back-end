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
    cuisineType: [String],
    mealType: [String],
    likes: []
  },
  { timestamps: true }
)

const Recipe = mongoose.model('Recipe', recipeSchema)
module.exports = Recipe
// const recipes = [
// {
//   id: 1,
//   label: 'Cookies',
//   source: 'string',
//   url: 'string',
//   shareAs: 'string',

//   dietLabels: ['balanced', 'high-fiber'],
//   healthLabels: ['vegan', 'oil-free'], //
//   cautions: ['mexican'],

//   ingredients: [
//     {
//       text: 'oil 1ltr',
//       weight: 1
//     },
//     {
//       text: 'rice half kg',
//       weight: 0.5
//     }
//   ],
//   makingDescription: 'desc about  making the good recipe',

//   cuisineType: ['north'],
//   mealType: ['snacks'],

//   dishType: ['lunch'] //refer to edman doc
// },
// {
//   id: 2,
//   label: 'lemon rice',
//   source: 'string',
//   url: 'string',
//   shareAs: 'string',

//   dietLabels: ['balanced', 'high-fiber'],
//   healthLabels: ['vegan', 'oil-free'], //
//   cautions: ['mexican'],

//   ingredients: [
//     {
//       text: 'oil 1ltr',
//       weight: 1
//     },
//     {
//       text: 'rice half kg',
//       weight: 0.5
//     }
//   ],
//   makingDescription: 'desc about  making the good recipe',

//   cuisineType: ['north'],
//   mealType: ['snacks'],
//   dishType: ['lunch'] //refer to edman doc
// }
//   ]

// const recipe = [
//   {
//     food: 'food 1',
//     items: ['rice', 'salt', 'ghee', 'vegitables'],
//     duration: 1,
//     desc: 'lorem lorem lorem lorem lorem lore lorem lore lorem lore lorem lore lorem lore lorem lore lorem lore',
//     url: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=449&q=80'
//   },
//   {
//     food: 'food 2',
//     items: ['rice', 'salt', 'ghee', 'vegitables'],
//     duration: 1,
//     desc: 'lorem lorem lorem lorem lorem lore lorem lore lorem lore lorem lore lorem lore lorem lore lorem lore',
//     url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80'
//   },
//   {
//     food: 'food 3',
//     items: ['rice', 'salt', 'ghee', 'vegitables'],
//     duration: 1,
//     desc: 'lorem lorem lorem lorem lorem lore lorem lore lorem lore lorem lore lorem lore lorem lore lorem lore',
//     url: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80'
//   }
// ]
