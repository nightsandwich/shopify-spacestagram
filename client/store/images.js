import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const GET_IMAGES = 'GET_IMAGES'

/**
 * ACTION CREATORS
 */
const _getImages = images => ({type: GET_IMAGES, images})

/**
 * THUNK CREATORS
 */
export const getImages = () => {
  return async(dispatch) => {
    const images = (await axios.get('/api/images')).data
    dispatch(_getImages(images))
  }
}

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_IMAGES:
      return action.images
    default:
      return state
  }
}
