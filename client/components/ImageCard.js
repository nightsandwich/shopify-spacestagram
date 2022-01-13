import React, {useState} from "react";
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
              onClick={handleClick}
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

  export default ImageCard