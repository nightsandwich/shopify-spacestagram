import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import ImageCard from './ImageCard'
import { getImages, addImage, deleteUserImage, createUserImage } from '../store'
import CircularLoading from './CircularLoading'
import { Button, fabClasses } from '@mui/material'

/**
 * COMPONENT
 */

export const Images = () => {
  
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)
  const [imageIdToEdit, setImageIdToEdit] = useState(null)

  const images = useSelector(({images}) => images.sort((a,b) => a.id > b.id ? -1 : 1))
  const auth = useSelector(({auth}) => auth)
  
  const loadImages = async() => {
    await dispatch(getImages())
    setLoaded(true)
  }

  const doesUserLikeThisImage = (image, auth) => {
    if (image.userImages.find(userImage => userImage.userId === auth.id)){
      return true
    }
    return false
  }
  
  useEffect(() => {
    loadImages()
  }, [imageIdToEdit])

  const handleClick = async (ev, image, auth) => {
    ev.preventDefault()
    setImageIdToEdit(image.id)
    const userImage = image.userImages.find(userImage => userImage.userId === auth.id)
    if (userImage){
      await dispatch(deleteUserImage(userImage.id))
    } else {
      await dispatch(createUserImage({userId: auth.id, imageId: image.id}))
    }
    setImageIdToEdit(null)
  }

  if (!loaded || !auth) return <CircularLoading />

  return (
    <div>
      <Button variant='filled'  sx={{color: 'white', backgroundColor: 'dodgerBlue', mb: 1}} onClick={async() => await dispatch(addImage())}>Add Photo from a Random Date</Button>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'stretch', alignItems: 'stretch'}}>
        {
          images.map(image => {
            const likesIt = doesUserLikeThisImage(image, auth)
            return (
            <ImageCard likesIt={likesIt} image={image} handleClick={(ev) => handleClick(ev, image, auth)} key={image.id} />
            )}
          )
        }
        </div>
    </div>
  )
}


export default Images
