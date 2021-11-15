const express = require('express')
const mongoose = require('mongoose')

//*importing User class and Joi validate method from userValidate.js file

const Recipe = require('../models/RecipeSchema')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    let recipes = await Recipe.find().sort('label')
    res.send(recipes)
  } catch (error) {
    res.status(400).send('something went wrong while retriving data data')
  }
})

router.post('/', async (req, res) => {
  try {
    let recipe = new Recipe({
      label: req.body.label,
      source: req.body.source,
      url: req.body.url,
      dietLabels: req.body.dietLabels,
      healthLabels: req.body.healthLabels,
      cautions: req.body.cautions,
      ingredients: req.body.ingredients,
      makingDescription: req.body.makingDescription,
      cuisineType: req.body.cuisineType,
      mealType: req.body.cuisineType,
      dishType: req.body.dishType
    })

    recipe = await recipe.save()

    res.send(recipe)
  } catch (err) {
    res.status(400).send('something went wrong while saving the file')
  }
})

module.exports = router
