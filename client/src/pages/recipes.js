import React, {useEffect, useState} from 'react'
import { Grid, Box, Typography } from '@mui/material'
import RecipeCard from '../components/recipeCard'

const Recipes = () => {
  const [recipes, setRecipes] = useState([])

  console.log('naviagate to recipe')
  console.log(recipes)
  //!fetch call for all recipes
  //! tons of filtering
  //!need to re-render the fetch of you add a new recipe

  //fetch all recipes
  useEffect(() => {
    fetch("/recipes")
    .then(r => r.json())
    .then((recipes) => setRecipes(recipes))
    .catch(err => console.log(err))
  }, [])

  //map each recipe to a recipeCard
  const recipeCards = recipes.map((recipe) => (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <RecipeCard key={recipe.id} recipe={recipe}/>
    </Grid>
  ))


  return (
    <Box sx={{flexGrow: 1, ml: 4, mr: 4, mt: 8}}>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Typography variant='h3'>
            Drink Lab
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>Filter</Typography>
        </Grid>
        <Grid sx={{ p: 2, backgroundColor: 'white', justifyContent: 'center' }} item xs={9}>
          <Grid container spacing={2}>
          {recipeCards}
          </Grid>
        </Grid>
      </Grid>

    </Box>


  )
}

export default Recipes
