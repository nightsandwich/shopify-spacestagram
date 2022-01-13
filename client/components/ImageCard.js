import React, {useState} from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import auth from "../store/auth";
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
const ImageCard = ({image, handleClick}) => {
    
    const [expanded, setExpanded] = useState(false)

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    
    return(
    <Card className='image-card' key={image.id} sx={{ width: 345, m: 1 }}>
        <Typography gutterBottom variant="subtitle1" component="div" color="text.secondary">
          {image.date}
        </Typography>
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
        <Badge badgeContent={image.userImages.length} color='info' anchorOrigin={{
    vertical: 'top',
    horizontal: 'right',
  }}>
            <FavoriteIcon className='heart-icon' aria-label='like photo' fontSize='large' sx={{color: 'red'}}
              onClick={handleClick}
            />
        </Badge>
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