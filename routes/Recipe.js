const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')

//*importing User class and Joi validate method from userValidate.js file

const Recipe = require('../models/RecipeSchema')

const router = express.Router()

const stroage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'jfif'
  ) {
    cb(null, true)
  } else {
    cb(null, false) //i can throw any error message here, if the file type is unknown
    //insted of null i can pass new Error('error mesage')
  }
}

const upload = multer({
  storage: stroage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
})

router.get('/', async (req, res) => {
  try {
    let recipes = await Recipe.find().sort('label')
    res.send(recipes)
  } catch (error) {
    res.status(400).send('something went wrong while retriving data data')
  }
})
router.get('/:name', async (req, res) => {
  try {
    // console.log(req.params.name)

    const dishes = await Recipe.find({ label: req.params.name })

    res.send(dishes)
  } catch (err) {
    res.status(404).send('data not found')
  }
})

router.post('/', upload.single('recipeImage'), async (req, res) => {
  try {
    console.log(req.body)

    //have to call the route through react form,so we can access all data
    let recipe = new Recipe({
      authorId: req.body.authorId,
      authorUsername: req.body.authorUsername,
      label: req.body.label,
      source: req.body.source,
      url: req.file.path,
      dietLabels: JSON.parse(req.body.dietlabels),
      healthLabels: JSON.parse(req.body.healthlabels),
      ingredients: JSON.parse(req.body.ingredients),
      makingDescription: req.body.makingDescription,
      cuisineType: JSON.parse(req.body.cuisineType),
      mealType: JSON.parse(req.body.mealType)
    })

    recipe = await recipe.save()

    res.send(recipe)
  } catch (err) {
    console.log(err)

    res.status(400).send('something went wrong while saving the file')
  }
})

module.exports = router
