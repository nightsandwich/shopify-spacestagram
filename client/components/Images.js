import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import Badge from '@mui/material/Badge';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import { getImages, getImage, deleteUserImage, createUserImage } from '../store'
/**
 * COMPONENT
 */

 const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
  

export const Images = () => {
  const ImageCard = ({image}) => {
    
    const [expanded, setExpanded] = useState(false)

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    
    return(
    <Card className='image-card' key={image.id} sx={{ width: 345, m: 1 }}>
      <CardMedia
        component="img"
        alt={image.title}
        height="140"
        image={image.url}
        sx={{mixBlendMode: 'multiply'}}
      />
      <CardContent>
        <Typography gutterBottom variant="subtitle2" component="div">
          {image.date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {image.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Badge badgeContent={image.userImages.length} color='warning' sx={{opacity: '.7'}} showZero anchorOrigin={{
    vertical: 'top',
    horizontal: 'right',
  }}>
          {/* <IconButton aria-label="add to favorites"> */}
            <FavoriteIcon fontSize='large' sx={{color: 'red', opacity: '2'}}
              onClick={(ev) => handleClick(ev, image, auth)}
            />
          {/* </IconButton> */}
        </Badge>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      {
        expanded && <Typography variant='caption'>{image.explanation.split('. ').slice(0, 5).join('.')}</Typography>
      }
    </Card>
    )
  }
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)
  // const [reloaded, setReloaded] = useState(false)
  const [imageIdToEdit, setImageIdToEdit] = useState(null)

  const images = useSelector(({images}) => images.sort((a,b) => a.date < b.date ? -1 : 1))
  const auth = useSelector(({auth}) => auth)
  
  const loadImages = async() => {
    await dispatch(getImages())
    setLoaded(true)
    setImageIdToEdit(null)
  }
  
  const loadImage = async(id) => {
    await dispatch(getImage(id))
  }
  
  useEffect(() => {
    loadImages()
  }, [imageIdToEdit])

  // useEffect((imageIdToEdit) => {
  //   console.log('nope')
  //   if(imageIdToEdit > 0){
  //     console.log('yes', imageIdToEdit)
  //     loadImage(imageIdToEdit)
  //     setLoaded(true)
  //     setImageIdToEdit(0)
  //   }
  // }, [imageIdToEdit])
  const handleClick = async (ev, image, auth) => {
    ev.preventDefault()
    setImageIdToEdit(image.id)
    setLoaded(false)
    console.log('image', image)
    const userImage = image.userImages.find(userImage => userImage.userId === auth.id)
    console.log('userImage, ', userImage)
    console.log('imageIdToEdit, ', imageIdToEdit, image.id)
    if (userImage){
      console.log('deleting')
      await dispatch(deleteUserImage(userImage.id))
    } else {
      console.log('should be creating')
      console.log('userid', auth.id, 'imageId', image.id)
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
            <ImageCard image={image} auth={auth} handleClick={handleClick} key={image.id} />
            )
          )
        }
        </div>
    </div>
  )
}


export default Images
