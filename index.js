//*imported Modules
const express = require('express')
const cors = require('cors')
const chalk = require('chalk')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()

//custom routes
const userLoginRoute = require('./routes/User')
const recipeRoutes = require('./routes/Recipe')

process.on('uncaughtException', (e) => {
  console.log('WE GOT AN UNCAUGHT EXCEPTION')
  console.log(e)

  process.exit(1)
})
process.on('unhandledRejection', (e) => {
  console.log('WE GOT AN UNHANDLED PROMISE')
  console.log(e)

  process.exit(1)
})

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))
app.use(function timeLogger(req, res, next) {
  let requestTime = new Date()
  requestTime = requestTime.toLocaleTimeString()
  console.log(chalk.magenta(`REQUEST TIME - ${requestTime}`))
  next()
})

app.use(express.static('public'))

//TODO: need to separate this Database  module

const dataBaseUrl = 'mongodb://localhost:27017/foodies'
mongoose
  .connect(dataBaseUrl) //{ useNewUrlParser: true, useUnifiedTopology: true }
  .then(() => {
    console.log(`connected to ${dataBaseUrl}`)
    // console.log(`development env is ${process.env.NODE_ENV}`); //cross-env package is used to set node env
  })
  .catch((err) => {
    console.log('error encounterd', err)
  })

//custom routes
app.use('/login', userLoginRoute)
app.use('/recipe', recipeRoutes)

app.get('/', (req, res) => {
  res.send('welcome to foodies')
})

// app.get('/home', (req, res) => {
//   const recipes = [
//     {
//       id: 1,
//       label: 'Cookies',
//       source: 'string',
//       url: 'string',
//       shareAs: 'string',

//       dietLabels: ['balanced', 'high-fiber'],
//       healthLabels: ['vegan', 'oil-free'], //
//       cautions: ['mexican'],

//       ingredients: [
//         {
//           text: 'oil 1ltr',
//           weight: 1
//         },
//         {
//           text: 'rice half kg',
//           weight: 0.5
//         }
//       ],
//       makingDescription: 'desc about  making the good recipe',

//       cuisineType: ['north'],
//       mealType: ['snacks'],

//       dishType: ['lunch'] //refer to edman doc
//     },
//     {
//       id: 2,
//       label: 'lemon rice',
//       source: 'string',
//       url: 'string',
//       shareAs: 'string',

//       dietLabels: ['balanced', 'high-fiber'],
//       healthLabels: ['vegan', 'oil-free'], //
//       cautions: ['mexican'],

//       ingredients: [
//         {
//           text: 'oil 1ltr',
//           weight: 1
//         },
//         {
//           text: 'rice half kg',
//           weight: 0.5
//         }
//       ],
//       makingDescription: 'desc about  making the good recipe',

//       cuisineType: ['north'],
//       mealType: ['snacks'],
//       dishType: ['lunch'] //refer to edman doc
//     }
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

//   res.json(recipes)
// })
const port = process.env.PORT || 8000
app.listen(port, (error) => {
  if (error) console.log(error)

  console.log(`listing on port ${port}...`)
})
