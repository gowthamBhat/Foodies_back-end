const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const WishList = require('../models/WishListSchema')
const Recipe = require('../models/RecipeSchema')
router.get('/:userId', async (req, res) => {
  try {
    let out = []

    const dishes = await WishList.find(
      { userId: req.params.userId },
      { recipe: 1 }
    ).sort('label')

    dishes.map((x) => out.push(x.recipe)) //removing _id proerty and user_id property
    //so the data fromat can fit to display component

    res.send(out)
  } catch (err) {
    console.log(err)
    res.status(404).send('data not found')
  }
})

router.post('/', async (req, res) => {
  try {
    //checking if the recipe already exits in WishList Collection
    let isRecipeExists = await WishList.findOne({
      recipe_id: req.body.recipeId,
      userId: req.body.userId
    })

    if (isRecipeExists) {
      res.status(403).send('record already exists')
      return
    }

    const getRecipe = await Recipe.findById(req.body.recipeId)
    // console.log('req body of wish list', req.body)

    let wish = new WishList({
      recipe_id: getRecipe._id,
      userId: req.body.userId,
      recipe: {
        authorId: getRecipe.authorId,
        authorUsername: getRecipe.authorUsername,
        label: getRecipe.label,
        source: getRecipe.source,
        url: getRecipe.url,
        dietLabels: getRecipe.dietLabels,
        healthLabels: getRecipe.healthLabels,
        ingredients: getRecipe.ingredients,
        makingDescription: getRecipe.makingDescription,
        cuisineType: getRecipe.cuisineType,
        mealType: getRecipe.mealType
      }
    })
    wish = await wish.save()
    res.send(wish)
  } catch (error) {
    console.log('wishlistlog', error)
  }
})

module.exports = router
