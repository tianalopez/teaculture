import { Link} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { Button, Typography, Card, Rating, CardMedia, CardContent, CardActions, IconButton} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAuth } from "../auth/authProvider"

const RecipeCard = ({recipe}) => {
  const auth = useAuth()

  return (
    <Card sx={{maxWidth: 345}}>
      <CardMedia
        component='img'
        alt='random beverage image'
        height='140'
        image={recipe.image}
      >
      </CardMedia>
      <CardContent>
      <Typography variant="h7" component='div'>
        {recipe.title}
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        Creator: {recipe.creator['username']}
      </Typography>
      <Rating name='read-only' value={recipe.average_rating} readOnly />
      </CardContent>
      <CardActions>
        {!auth.user ?
          <IconButton  disabled aria-label='add to favorites' size="small">
            <FavoriteIcon />
          </IconButton>
        :
          <IconButton aria-label='add to favorites' size="small">
            <FavoriteIcon />
          </IconButton>
          }

        <Button component={Link} to={`/drinklab/${recipe.id}`}>
          View Recipe
        </Button>
      </CardActions>
    </Card>
  )
}

export default RecipeCard
