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
    // const image = await Image.findByPk( imageId, {
    //   include: UserImage
    // })
    res.send(userImage)
  } catch (err) {
    next(err)
  }
})
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const userImage = await UserImage.findByPk(id)
    // const imageId = userImage.imageId
    await userImage.destroy()
    // const image = await Image.findByPk( imageId, {
    //   include: UserImage
    // })
    // res.json(image)
    
  } catch (err) {
    next(err)
  }
})
