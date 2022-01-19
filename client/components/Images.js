import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import { Button } from '@mui/material'

import { getImages, addImage, deleteUserImage, createUserImage } from '../store'

import CircularLoading from './CircularLoading'
import ImageCard from './ImageCard'

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
    try {
      await dispatch(getImages())
    } catch (error) {
      console.log(error)
    }
  }

  const doesUserLikeThisImage = (image, auth) => {
    if (image.userImages.find(userImage => userImage.userId === auth.id)){
      return true
    }
    return false
  }
  
  useEffect(() => {
    loadImages()
    setLoaded(true)
  }, [imageIdToEdit])

  const handleClick = async (ev, image, auth) => {
    ev.preventDefault()
    setImageIdToEdit(image.id)
    try {
      const userImage = image.userImages.find(userImage => userImage.userId === auth.id)
      if (userImage){
        await dispatch(deleteUserImage(userImage.id))
      } else {
        await dispatch(createUserImage({userId: auth.id, imageId: image.id}))
      }
      setImageIdToEdit(null)
    } catch (error) {
      console.log(error)
    }
  }

  if (!loaded || !auth) return <CircularLoading />

  return (
    <div>
      <Button variant='filled'  sx={{color: 'white', backgroundColor: 'dodgerBlue', mb: 1, ml: 1}} onClick={async() => await dispatch(addImage())}>Random Photo</Button>
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
