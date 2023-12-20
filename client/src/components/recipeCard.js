import { Link} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { Button, Typography, Card, Rating, CardMedia, CardContent, CardActions, IconButton} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useAuth } from "../auth/authProvider"
import "../styles/recipeCard.css"

const RecipeCard = ({recipe, width}) => {
  const auth = useAuth()
  const [favorites, setFavorites] = useState()
  //if there is no user, do not calculate
  const [isRecipeInFavorites, setIsRecipeInFavorites] = useState(
    auth.user && favorites
      ? favorites.some((favorite) => favorite.recipe_id === recipe?.id && favorite.user_id === auth.user.id)
      : false
  );


  //!fetch favorites in the beginning for no stale data
  useEffect(() => {
    fetch('/favorites').then(r => r.json()).then(setFavorites).catch(err => console.log(err))
  },[])

  const handleAdd = () => {
    fetch('/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({user_id: auth.user.id, recipe_id: recipe.id})
    })
    .then(r => r.json())
    .then((data) => console.log(data))
    .catch(err => console.log(err))
    setIsRecipeInFavorites(true)

  }

  const handleDelete = () => {
    fetch(`/favorites/${auth.user.id}/${recipe.id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(r => r.json())
    .catch(err => console.log(err))
    setIsRecipeInFavorites(false)
  }

  const renderFavoriteButton = () => {
    if (isRecipeInFavorites) {
      return (
        <IconButton onClick={handleDelete}>
          <FavoriteIcon sx={{ color: '#FA9E7B' }} />
        </IconButton>
      );
    } else {
      return (
        <IconButton onClick={handleAdd} aria-label='add to favorites' size="small">
          <FavoriteBorderOutlinedIcon />
        </IconButton>
      );
    }
  };

  return (
    <Card className='recipe-card' sx={{ boxShadow: '5px 5px #EFC8C8', width: '100%', backgroundColor: '#F6F5F3',borderRadius: '20px',maxWidth: width, minHeight:300,maxHeight: 300,overflow: 'hidden', overflowY: 'scroll' }}>
      <CardMedia
        component='img'
        alt='random beverage image'
        height='140'
        image={recipe?.image}
      >
      </CardMedia>
      <CardContent sx={{ backgroundColor:'#F6F5F3'}}>
      <Typography fontSize={'1.05rem'} fontFamily= 'Dosis' component='div'>
        {recipe?.title}
      </Typography>
        <Typography fontFamily='Dosis' variant='body2' color='text.secondary'>
        Creator: {recipe?.creator['username']}
      </Typography>
      <Rating name='read-only' value={recipe?.average_rating ? recipe.average_rating: null} readOnly />
      </CardContent>
      <CardActions sx={{ backgroundColor: '#F6F5F3' }}>
        {!auth.user ?
          <IconButton  disabled aria-label='add to favorites' size="small">
            <FavoriteIcon />
          </IconButton>
        :
          renderFavoriteButton()
          }
        <Button className='filter-tag-clicked'component={Link} to={`/drinklab/${recipe?.id}`}>
          View Recipe
        </Button>
      </CardActions>
    </Card>
  )
}

export default RecipeCard
