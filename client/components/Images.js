import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import ImageCard from './ImageCard'
import { getImages, addImage, deleteUserImage, createUserImage } from '../store'
import CircularLoading from './CircularLoading'
import { Button } from '@mui/material'
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';

/**
 * COMPONENT
 */

export const Images = () => {
  
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)
  const [imageIdToEdit, setImageIdToEdit] = useState(null)

  const images = useSelector(({images}) => images.sort((a,b) => a.createdAt > b.createdAt ? -1 : 1))
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

  if (!loaded || !auth) return <CircularLoading />

  return (
    <div>
      <h3 style={{color: 'whitesmoke'}}>Welcome, {auth.username}</h3>
      <Button variant='filled'  sx={{color: 'black', backgroundColor: 'ghostwhite'}} onClick={async() => await dispatch(addImage())}>Add Photo from a Random Date</Button>
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
