'use strict'

const {db, models: {User, Image, UserImage} } = require('../server/db')
const axios = require('axios');
require('dotenv').config()

const API_KEY = process.env.NASA_API

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'Corinne', password: '123' }),
    User.create({ username: 'Bob', password: '123' }),
    User.create({ username: 'Cody', password: '123' }),
  ])
  const [corinne, bob, cody] = users.map(user => user)

  const startDate = '2021-01-01'
  const endDate = '2021-06-30'
  const data = (await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`)).data.filter(d => d.media_type === 'image')
  const images = await Promise.all(data.map(d => Image.create({ date: d.date, explanation: d.explanation, title: d.title, url: d.url })))

  await Promise.all([
    UserImage.create({ userId: corinne.id, imageId: images[0].id }),
    UserImage.create({ userId: bob.id, imageId: images[0].id }),
    UserImage.create({ userId: cody.id, imageId: images[0].id }),
    UserImage.create({ userId: corinne.id, imageId: images[2].id }),
    UserImage.create({ userId: corinne.id, imageId: images[3].id }),
  ])
  await Promise.all([
    images[0].update({ ...images[0], likes: 3 }),
    images[2].update({ ...images[2], likes: 1 }),
    images[3].update({ ...images[3], likes: 1 })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${images.length} images`)
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

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed