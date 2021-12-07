const express = require('express')
const Recipe = require('../models/RecipeSchema')
const router = express.Router()

//route to search recipes
router.get('/:label', async (req, res) => {
  try {
    const dishes = await Recipe.find({ label: req.params.label }).sort('label')

    res.send(dishes)
  } catch (err) {
    console.log(err)

    res.status(404).send('data not found')
  }
})

module.exports = router
