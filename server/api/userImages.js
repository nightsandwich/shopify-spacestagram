const router = require('express').Router()
const { models: { Image, UserImage }} = require('../db')
module.exports = router

router.get('/', async(req, res, next) => {
  try {
    const { imageId } = req.body
    const userImages = await UserImage.findAll({
      where: {
        imageId: imageId
      }
    })
    res.send(userImages)
  } catch (error) {
    next(error)
  }
})
router.post('/', async (req, res, next) => {
  try {
    const { userId, imageId } = req.body
    const userImage = await UserImage.create({ userId, imageId })
    res.send(userImage)
  } catch (err) {
    next(err)
  }
})
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const userImage = await UserImage.findByPk(id)
    await userImage.destroy()
  } catch (err) {
    next(err)
  }
})
