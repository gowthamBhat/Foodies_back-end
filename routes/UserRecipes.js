const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Recipe = require('../models/RecipeSchema')

router.post('/', async (req, res) => {
  let user_id = req.body.user_id
  try {
    let recipes = await Recipe.find({ authorId: user_id }).sort('label')
    res.send(recipes)
  } catch (error) {
    res.status(400).send('something went wrong while retriving data data')
  }
})

module.exports = router
