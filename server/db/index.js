//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Image = require('./models/Image')
const UserImage = require('./models/UserImage')


//UserImage has a userId and an imageId to represent each "Like"
UserImage.belongsTo(User)
User.hasMany(UserImage)
UserImage.belongsTo(Image)
Image.hasMany(UserImage)

module.exports = {
  db,
  models: {
    User,
    Image,
    UserImage
  },
}
