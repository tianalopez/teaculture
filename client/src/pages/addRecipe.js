import React, {useState, TransitionGroup } from 'react'
import { Box,  Grid, Typography, } from '@mui/material';
import RecipeForm from '../components/recipeForm';


const AddRecipe = () => {

  return (
    <Box sx={{ flexGrow: 1, ml: 4, mr: 4, mt: 8, mb:8 }}>
        <Grid sx={{mb: 5}} item xs={12}>
          <Typography variant='h3'>Create a New Recipe</Typography>
        </Grid>
      <RecipeForm />
    </Box>
  )
}

export default AddRecipe
