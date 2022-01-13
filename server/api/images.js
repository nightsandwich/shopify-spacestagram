const router = require('express').Router()
const { models: { Image, UserImage }} = require('../db')
const axios = require('axios')
const faker = require('faker')
require('dotenv').config()

const API_KEY = process.env.NASA_API


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
router.post('/', async (req, res, next) => {
  try {
    // const RANDOM_DATE = `${(Math.floor(Math.random * 2021) + 1996)}-${(Math.floor(Math.random * 12) + 1)}-${(Math.floor(Math.random * 28) + 1)}`
    const RANDOM_DATE = faker.date.between('1996-01-01', '2021-11-31').toISOString().slice(0,10)
    console.log(RANDOM_DATE)
    let image = (await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${RANDOM_DATE}`)).data
    image = await Image.create({ date: image.date, explanation: image.explanation, title: image.title, url: image.url})
    image = await Image.findByPk(image.id, {
      include: UserImage
    })
    res.json(image)
  } catch (err) {
    next(err)
  }
})
