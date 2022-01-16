const router = require('express').Router()
const { models: {User, UserImage }} = require('../db')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body)}); 
  } catch (err) {
    next(err)
  }
})


router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.send({token: await user.generateToken()})
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.get('/me', async (req, res, next) => {
  try {
    const me = (await User.findByToken(req.headers.authorization, {include: UserImage}))
    const userImages = (await UserImage.findAll({
      where: {
        userId: me.id
      }
    }))
    res.send({id: me.id, username: me.username, likes: userImages})
  } catch (ex) {
    next(ex)
  }
})
