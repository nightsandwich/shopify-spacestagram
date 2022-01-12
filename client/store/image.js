import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const GET_IMAGE = 'GET_IMAGE'

/**
 * ACTION CREATORS
 */
const _getImage = image => ({type: GET_IMAGE, image})

/**
 * THUNK CREATORS
 */

export const getImage = (id) => {
  return async(dispatch) => {
    const image = (await axios.get(`/api/images/${id}`)).data
    dispatch(_getImage(image))
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case GET_IMAGE:
      return action.image
    default:
      return state
  }
}
