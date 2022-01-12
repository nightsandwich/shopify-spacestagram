import React from 'react'
import {connect} from 'react-redux'
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
import { editImage } from '../store'
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
  const ImageCard = ({image}) => {
    const [expanded, setExpanded] = React.useState(false);

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
              onClick={({userId, image}) => {
                if (image.userImages.includes(userImage => userImage.userId === userId)){
                  updateImage({userId: userId, imageId: image.id}, 'delete')
                } else {
                  updateImage({userId: userId, imageId: image.id}, 'add')
                }
              }}
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
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography >{image.explanation}</Typography>
        </CardContent>
      </Collapse> */}
    </Card>
    )
  }

export const Home = props => {
  const {username, images, userId} = props
  
  return (
    <div>
      <h3>Welcome, {username}</h3>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'stretch', alignItems: 'stretch'}}>
        {
          images.map(image => (
            <ImageCard image={image} userId={userId} key={image.id} />
            )
          )
        }
        </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username,
    userId: state.auth.id,
    images: state.images
  }
}
const mapDispatch = dispatch => {
  return {
    updateImage: (userImage, type) => dispatch(updateImage(userImage, type))
  }
}

export default connect(mapState, mapDispatch)(Home)
