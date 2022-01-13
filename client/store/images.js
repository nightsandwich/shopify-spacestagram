import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_IMAGES = 'GET_IMAGES'
const ADD_IMAGE = 'ADD_IMAGE'

/**
 * ACTION CREATORS
 */
const _getImages = images => ({type: GET_IMAGES, images})
const _addImage = image => ({ type: ADD_IMAGE, image })
/**
 * THUNK CREATORS
 */
export const getImages = () => {
  return async(dispatch) => {
    const images = (await axios.get('/api/images')).data
    dispatch(_getImages(images))
  }
}
export const addImage = () => {
  return async(dispatch) => {
    const image = (await axios.post('/api/images')).data
    dispatch(_addImage(image))
  }
}

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_IMAGES:
      return action.images
    case ADD_IMAGE:
      return [...state, action.image]
    default:
      return state
  }
}
