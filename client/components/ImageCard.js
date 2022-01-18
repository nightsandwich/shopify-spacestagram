import React, {useState} from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import LikesBadge from "./LikesBadge";

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

const ImageCard = ({image, handleClick, likesIt}) => {  
    const [expanded, setExpanded] = useState(false)

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    
    return(
    <Card className='image-card' key={image.id} sx={{ width: 345, m: 1 }}>
        <Typography gutterBottom variant="subtitle1" component="div" color="text.secondary">
          {image.date}
        </Typography>
        <LikesBadge 
          badgeContent={image.userImages.length}  
          color={'error'}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          fontSize={'small'}
          iconColor={'#FA9F9F'}
          ariaLabel={'all likes'}
          title={'Total Likes From All Users'}
          onClick={()=>{}}
        />
      <CardMedia
        component="img"
        alt={image.title}
        height="200"
        image={image.url}
        sx={{mixBlendMode: 'multiply'}}
      />
      <CardContent>
        <Typography variant="body2" >
          {image.title}
        </Typography>
        <Divider sx={{border: '1px solid grey'}}/>
      </CardContent>
      <CardActions disableSpacing>
        <LikesBadge 
          // badgeContent={image.userImages.length}
          color={'info'} 
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          fontSize={'large'}
          iconColor={likesIt ? 'red' : '#B19999'}
          ariaLabel={'like photo'}
          onClick={handleClick}
          title={''}
        />
        
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show description of photo"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      {
        expanded && <Typography variant='caption'>{image.explanation.split('. ').slice(0, 3).join('. ')+'.'}</Typography>
      }
    </Card>
    )
  }

  export default ImageCard