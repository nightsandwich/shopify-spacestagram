import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const GET_USER_IMAGES = 'GET_USER_IMAGES'
const CREATE_USER_IMAGE = 'CREATE_USER_IMAGE'
const DELETE_USER_IMAGE = 'DELETE_USER_IMAGE'

/**
 * ACTION CREATORS
 */
const _getUserImages = userImages => ({ type: GET_USER_IMAGES, userImages })
const _createUserImage = userImage => ({ type: CREATE_USER_IMAGE, userImage })
const _deleteUserImage = id => ({type: DELETE_USER_IMAGE, id})

/**
 * THUNK CREATORS
 */
export const getUserImages = (imageId) => {
  return async(dispatch) => {
    const userImages = (await axios.get('/api/userImages', imageId)).data
    dispatch(_getUserImages(userImages))
  }
}
export const createUserImage = ({userId, imageId}) => {
  // console.log('userimage', userImage)
  return async(dispatch) => {
    const userImage = (await axios.post('/api/userImages', {userId, imageId})).data
    dispatch(_createUserImage(userImage))
  }
}
export const deleteUserImage = (id) => {
  return async(dispatch) => {
    await axios.delete(`/api/userImages/${id}`)
    dispatch(_deleteUserImage(id))
  }
}
/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_USER_IMAGES:
      return action.userImages
    case CREATE_USER_IMAGE:
      return [...state, action.userImage]
    case DELETE_USER_IMAGE:
      return state.filter(userImage => userImage.id !== action.id)
    default:
      return state
  }
}
