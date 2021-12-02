const express = require('express')
const mongoose = require('mongoose')

//*importing User class and Joi validate method from userValidate.js file

const User = require('../models/UserSchema')

const router = express.Router()

// router.get("/me", auth, async (req, res) => {
//     const user = await User.findById(req.user._id).select("-password");
//     res.send(user);
//   });

// router.get(
//   '/me',
//   auth,
//   asyncMiddleware(async (req, res) => {
//     const user = await User.findById(req.user._id).select('-password')
//     res.send(user)
//   })
// )
router.get('/', async (req, res) => {
  let users = await User.find().sort('name')
  res.status(200).send(users)
})
router.post('/', async (req, res) => {
  try {
    // const val = validate(req.body)

    // if (val.error) return res.status(400).send(val.error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (user) throw 'email aready exists'

    user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin
    })
    // user = new User(_.pick(req.body, ['name', 'email', 'password', 'isAdmin']))

    // const salt = await bcrypt.genSalt(10) //! BCRYPT library is used to hash the password

    // user.password = await bcrypt.hash(user.password, salt)

    user = await user.save()
    console.log(user)

    //*  const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey')); this code also can be written but we are genrating through a method from uservalidate.js
    const token = user.generateAuthToken() //? values are genrated from uservalidare.js file

    res
      .header('x-auth-token', token)
      .header('access-control-expose-headers', 'x-auth-token') //* Setting this header is extreamly important to access jwt token in client side
      .send({ _id: user._id, name: user.name, email: user.email })

    //TODO    to remove returning password to user we can use the approach
    //TODO    res.send({ name : result.name, email : result.user});
    //TODO    but we can use LODASH
  } catch (err) {
    console.log(err)

    res.status(400).send('something went wrong')
  }
})

module.exports = router
