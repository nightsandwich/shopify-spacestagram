import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import ImageCard from './ImageCard'
import { getImages, deleteUserImage, createUserImage } from '../store'

/**
 * COMPONENT
 */

export const Images = () => {
  
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)
  const [imageIdToEdit, setImageIdToEdit] = useState(null)

  const images = useSelector(({images}) => images.sort((a,b) => a.date < b.date ? -1 : 1))
  const auth = useSelector(({auth}) => auth)
  
  const loadImages = async() => {
    await dispatch(getImages())
    setLoaded(true)
  }
  
  useEffect(() => {
    loadImages()
  }, [imageIdToEdit])

  const handleClick = async (ev, image, auth) => {
    ev.preventDefault()
    setImageIdToEdit(image.id)
    setLoaded(false)
    const userImage = image.userImages.find(userImage => userImage.userId === auth.id)
    if (userImage){
      await dispatch(deleteUserImage(userImage.id))
    } else {
      await dispatch(createUserImage({userId: auth.id, imageId: image.id}))
    }
    setImageIdToEdit(null)
  }

  if (!loaded || !auth) return '...loading'

  return (
    <div>
      <h3>Welcome, {auth.username}</h3>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'stretch', alignItems: 'stretch'}}>
        {
          images.map(image => (
            <ImageCard image={image} handleClick={(ev) => handleClick(ev, image, auth)} key={image.id} />
            )
          )
        }
        </div>
    </div>
  )
}


export default Images
