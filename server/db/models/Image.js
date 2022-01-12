const Sequelize = require('sequelize')
const db = require('../db')

const Image = db.define('image', {
  title: {
    type: Sequelize.TEXT
  },
  url: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.STRING
  },
  explanation: {
    type: Sequelize.TEXT
  }
})

module.exports = Image
