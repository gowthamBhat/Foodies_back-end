const express = require('express')
const mongoose = require('mongoose')

const User = require('../models/UserSchema')

const router = express.Router()

//Joi validate method
// function validate(data) {
//     const schema = {
//         email: Joi.string().min(3).max(255).required().email(),
//         password: Joi.string().min(4).max(255)
//     }
//     return Joi.validate(data, schema);
// }

//* POST
router.post('/', async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email })
    if (!user) throw 'invalid email or password'

    const validPassword = req.body.password === user.password
    if (!validPassword) throw 'invalid email or password'

    const token = user.generateAuthToken() //? values are genrated from uservalidare.js file

    res
      .header('x-auth-token', token)
      .header('access-control-expose-headers', 'x-auth-token') //* Setting this header is extreamly important to access jwt token in client side
      .send({ _id: user._id, name: user.name, email: user.email })
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router
