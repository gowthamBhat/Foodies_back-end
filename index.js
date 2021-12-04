//*imported Modules
const express = require('express')
const cors = require('cors')
const chalk = require('chalk')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()

//custom routes
const userSignUpRoute = require('./routes/User')
const recipeRoutes = require('./routes/Recipe')
const userLogInRoute = require('./routes/Auth')
const recipeSearchRoute = require('./routes/SearchRecipes')

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

app.use('/uploads', express.static('uploads'))

//custom routes
app.use('/signup', userSignUpRoute)
app.use('/recipe', recipeRoutes)
app.use('/login', userLogInRoute)
app.use('/search', recipeSearchRoute)

//TODO: need to separate this Database  module

const dataBaseUrl = 'mongodb://localhost:27017/foodies' //! need to be saved in ENV-VAR
mongoose
  .connect(dataBaseUrl)
  .then(() => {
    console.log(`connected to ${dataBaseUrl}`)
  })
  .catch((err) => {
    console.log('error encounterd', err)
  })

app.get('', (req, res) => {
  // console.log(req.params)
  // console.log(req.query)

  res.send('welcome to foodies')
})

const port = process.env.PORT || 8000
app.listen(port, (error) => {
  if (error) console.log(error)

  console.log(`listing on port ${port}...`)
})
