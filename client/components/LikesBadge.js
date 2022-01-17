import React, {useState} from "react";
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite';

const LikesBadge = ({badgeContent, color, anchorOrigin, ariaLabel, fontSize, iconColor, title,onClick}) => {
 
    return(
      <Tooltip
        title={title}
      >
        <Badge 
          badgeContent={badgeContent}  
          color={color} 
          anchorOrigin={anchorOrigin}
        >
            <FavoriteIcon 
              className='heart-icon' 
              aria-label={ariaLabel} 
              fontSize={fontSize} 
              sx={{color: iconColor}}
              onClick={onClick}
            />
        </Badge>
      </Tooltip>
    )
  }

  export default LikesBadge