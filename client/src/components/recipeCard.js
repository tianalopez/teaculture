import { Link} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { Button, Typography, Card, CardMedia, CardContent, CardActions, IconButton} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const RecipeCard = ({recipe}) => {

  const randomImage = [
    "/images/img1.jpg",
    "/images/img2.jpg",
    "/images/img3.jpg"
  ]

  console.log(recipe.title)
  return (
    <Card sx={{maxWidth: 345}}>
      <CardMedia
        component='img'
        alt='random beverage image'
        height='140'
        image={randomImage[Math.floor(Math.random()*randomImage.length)]}
      >
      </CardMedia>
      <CardContent>
      <Typography variant="h7" component='div'>
        {recipe.title}
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        Creator
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        Rating: stars
      </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label='add to favorites' size="small">
          <FavoriteIcon />
        </IconButton>
        <Button component={Link} to={`/drinklab/${recipe.id}`}>
          View Recipe
        </Button>
      </CardActions>
    </Card>
  )
}

export default RecipeCard
