const express = require('express')
const FeedBack = require('../models/FeedbackSchema')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    let feedbacks = await FeedBack.find()
    res.send(feedbacks)
  } catch (error) {
    console.log(error)

    res.status(400).send('something went wrong while retriving data data')
  }
})
router.post('/', async (req, res) => {
  try {
    console.log(req.body)

    //have to call the route through react form,so we can access all data
    let feedback = new FeedBack({
      feedbackText: req.body.feedbackText,
      userId: req.body.userID,
      username: req.body.username,
      email: req.body.email
    })

    feedback = await feedback.save()

    res.send(feedback)
  } catch (err) {
    console.log(err)

    res.status(400).send('something went wrong while saving the file')
  }
})
router.delete('/:id', async (req, res) => {
  try {
    let user = await FeedBack.findByIdAndDelete(req.params.id)
    res.send(user)
  } catch (error) {
    console.log('error occured while deleting a user', error)
  }
})
module.exports = router
