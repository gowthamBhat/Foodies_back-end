const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const WishList = require('../models/WishListSchema')
const Recipe = require('../models/RecipeSchema')
router.get('/:userId', async (req, res) => {
  try {
    console.log(req.params.userId)

    const dishes = await WishList.find({ userId: req.params.userId }).sort(
      'label'
    )

    res.send(dishes)
  } catch (err) {
    console.log(err)
    res.status(404).send('data not found')
  }
})

router.post('/', async (req, res) => {
  try {
    const getRecipe = await Recipe.findById(req.body.recipeId)
    console.log('req body of wish list', req.body)

    let wish = new WishList({
      userId: req.body.userId,
      recipe: {
        _id: getRecipe._id,
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
