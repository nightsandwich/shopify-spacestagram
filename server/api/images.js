const router = require('express').Router()
const { models: { Image, UserImage }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const images = await Image.findAll({
      include: UserImage
    })
    
    res.json(images)
  } catch (err) {
    next(err)
  }
})
