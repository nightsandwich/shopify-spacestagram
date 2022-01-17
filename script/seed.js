'use strict'

const {db, models: {User, Image, UserImage} } = require('../server/db')
const axios = require('axios');
require('dotenv').config()

const API_KEY = process.env.NASA_API

async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  const users = await Promise.all([
    User.create({ username: 'Corinne', password: '123' }),
    User.create({ username: 'Bob', password: '123' }),
    User.create({ username: 'Cody', password: '123' }),
  ])
  const [corinne, bob, cody] = users.map(user => user)

  const startDate = '2021-12-01'
  const endDate = '2021-12-31'
  const data = (await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`)).data.filter(d => d.media_type === 'image')
  const images = await Promise.all(data.map(d => Image.create({ date: d.date, explanation: d.explanation, title: d.title, url: d.url })))
  
  //UserImage represents a certain User liking a certain Image
  const userImages = await Promise.all([
    UserImage.create({ userId: corinne.id, imageId: images[0].id }),
    UserImage.create({ userId: bob.id, imageId: images[0].id }),
    UserImage.create({ userId: cody.id, imageId: images[0].id }),
    UserImage.create({ userId: corinne.id, imageId: images[2].id }),
    UserImage.create({ userId: corinne.id, imageId: images[3].id }),
    UserImage.create({ userId: cody.id, imageId: images[4].id }),
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${images.length} images`)
  console.log(`seeded ${userImages.length} userImages (Likes)`)
  console.log(`seeded successfully`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}
