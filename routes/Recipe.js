const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')

//*importing User class and Joi validate method from userValidate.js file

const Recipe = require('../models/RecipeSchema')
const WishList = require('../models/WishListSchema')

const router = express.Router()
// var fs = require('fs')

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
    let recipes = await Recipe.find().sort({
      createdAt: -1
    })
    res.send(recipes)
  } catch (error) {
    res.status(400).send('something went wrong while retriving data data')
  }
})
//*category nav bar
router.get('/category', async (req, res) => {
  try {
    let recipes = await Recipe.find({}, { cuisineType: 1 }).sort({
      createdAt: -1
    })
    res.send(recipes)
  } catch (error) {
    res.status(400).send('something went wrong while retriving data data')
  }
})
router.get('/category/:cuisine', async (req, res) => {
  try {
    let recipes = await Recipe.find({ cuisineType: req.params.cuisine }).sort({
      createdAt: -1
    })
    res.send(recipes)
  } catch (error) {
    res.status(400).send('something went wrong while retriving data data')
  }
})

//for userdashboard specific author recipe display
router.get('/:userid', async (req, res) => {
  try {
    const dishes = await Recipe.find({ authorId: req.params.userid }).sort({
      createdAt: -1
    })

    res.send(dishes)
  } catch (err) {
    console.log(err)

    res.status(404).send('data not found')
  }
})
router.get('/perkcoins/:userid', async (req, res) => {
  try {
    const dishes = await Recipe.find({ authorId: req.params.userid }, {}).sort({
      createdAt: -1
    })
    var count = 0
    if (dishes.length > 0)
      for (let i = 0; i < dishes.length; i++) count += dishes[i].likes.length

    res.send({ total_likes: count })
  } catch (err) {
    console.log(err)

    res.status(404).send('data not found')
  }
})

router.get('/byId/:id', async (req, res) => {
  try {
    console.log(req.params.id)

    const dishes = await Recipe.find({ _id: req.params.id })

    res.send(dishes)
  } catch (err) {
    console.log(err)

    res.status(404).send('data not found')
  }
})

//get reported posts

router.get('/reported/allposts', async (req, res) => {
  console.log('enterd')

  try {
    let recipes = await Recipe.find({ isReported: true }).sort({
      createdAt: -1
    })
    res.send(recipes)
  } catch (error) {
    res.status(400).send('something went wrong while retriving data data')
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
      cuisineType: req.body.cuisineType,
      mealType: JSON.parse(req.body.mealType),
      likes: []
    })

    recipe = await recipe.save()

    res.send(recipe)
  } catch (err) {
    console.log(err)

    res.status(400).send('something went wrong while saving the file')
  }
})

//*PUT
router.put('/:id', upload.single('recipeImage'), async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      {
        authorId: req.body.authorId,
        authorUsername: req.body.authorUsername,
        label: req.body.label,
        source: req.body.source,
        url: req.file.path,
        dietLabels: JSON.parse(req.body.dietlabels),
        healthLabels: JSON.parse(req.body.healthlabels),
        ingredients: JSON.parse(req.body.ingredients),
        makingDescription: req.body.makingDescription,
        cuisineType: req.body.cuisineType,
        mealType: JSON.parse(req.body.mealType)
      },
      { new: true }
    )

    // const gen = await Genres.updateOne({ _id: req.params.id }, { name: req.body.name });

    res.send(recipe)
  } catch (ex) {
    res.status(404).send('data not found')
  }
})
router.put('/report/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.body.id,
      {
        isReported: true
      },
      { new: true }
    )

    // const gen = await Genres.updateOne({ _id: req.params.id }, { name: req.body.name });

    res.send(recipe)
  } catch (ex) {
    res.status(404).send('data not found')
  }
})
router.put('/ignorereport/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.body.id,
      {
        isReported: false
      },
      { new: true }
    )

    // const gen = await Genres.updateOne({ _id: req.params.id }, { name: req.body.name });

    res.send(recipe)
  } catch (ex) {
    res.status(404).send('data not found')
  }
})

router.delete('/:id', async (req, res) => {
  try {
    //checking if the recipe in wishlist collection
    const isExistInWIshList = await WishList.exists({
      recipe_id: req.params.id
    })
    //if exist deleting it
    if (isExistInWIshList) {
      const existsInWishList = await WishList.deleteMany({
        recipe_id: req.params.id
      })
      console.log('deleted from wishlist', existsInWishList)
    }
    //deleting from recipe collection
    const deletedRecipe = await Recipe.findByIdAndRemove(req.params.id)
    console.log('deleted recipe', deletedRecipe)
    //     var filePathme =
    //       'D:Projects\foodeis full app\foodies_backend ' + deletedRecipe.url
    //     console.log('path', filePathme)

    //  fs.unlinkSync(filePathme)

    res.send(deletedRecipe)
  } catch (error) {
    console.log(error)

    res.status(404).send('data not found')
  }
})

router.put('/api/like', async (req, res) => {
  try {
    //user id and post id is needed
    //have to get it from req body
    let likedPost = await Recipe.findByIdAndUpdate(
      req.body.recipeId,
      {
        $push: { likes: req.body.userId }
      },
      {
        new: true
      }
    )
    res.json(likedPost)
  } catch (error) {
    console.log('error while liking the post', error)
  }
})
router.put('/api/unlike', async (req, res) => {
  try {
    //user id and post id is needed
    //have to get it from req body
    let disLikedPost = await Recipe.findByIdAndUpdate(
      req.body.recipeId,
      {
        $pull: { likes: req.body.userId }
      },
      {
        new: true
      }
    )
    res.json(disLikedPost)
  } catch (error) {
    console.log('error while liking the post', error)
  }
})
module.exports = router
