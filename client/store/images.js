import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const GET_IMAGES = 'GET_IMAGES'
const EDIT_IMAGE = 'EDIT_IMAGE'

/**
 * ACTION CREATORS
 */
const _getImages = images => ({type: GET_IMAGES, images})
const _editImage = image => ({type: EDIT_IMAGE, image})

/**
 * THUNK CREATORS
 */
export const getImages = () => {
  return async(dispatch) => {
    const images = (await axios.get('/api/images')).data
    dispatch(_getImages(images))
  }
}

// make one for userImage
// export const editImage = (userImage, type) => {
//   return async(dispatch) => {
//     if (type === 'delete'){
//       const edited = (await axios.create(`/api/images`, userImage)).data
//       dispatch(_editImage(edited))
//     } else {
//       await axios.delete(`/api/images/${userImage.imageId}`)
//       dispatch(_deleteImage(userImage.imageId))
//     }
//   }
// }

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_IMAGES:
      return action.images
    case EDIT_IMAGE:
      return state.map(image => image.id === action.image.id ? action.image : image)
    default:
      return state
  }
}
