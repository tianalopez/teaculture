import React, {useEffect, useState} from 'react'
import { Grid, Box, Typography, TextField      } from '@mui/material'
import RecipeCard from '../components/recipeCard'
import DrinkFilter from '../components/drinkFilter'

const Recipes = () => {
  const [recipes, setRecipes] = useState([])
  // const [filteredRecipes, setFilteredRecipes] = useState([])
  const defaultSearchObj = {
    search: "",
    avg_rating: null,
  }
  const [searchObj, setSearchObj] = useState(defaultSearchObj)

  //! tons of filtering
  const handleSearchChange = (name, value) => {
    setSearchObj({...searchObj, [name]: value})
  }
  //!filtered recipes

    const filteredRecipes = recipes
    .filter((recipe) => recipe.title.toLowerCase().includes(searchObj.search.toLowerCase()))
    .filter((recipe) => recipe.average_rating >= Number(searchObj.avg_rating))




  //fetch all recipes
  useEffect(() => {
    fetch("/recipes")
    .then(r => r.json())
    .then((recipes) => setRecipes(recipes))
    .catch(err => console.log(err))
  }, [])

  //map each recipe to a recipeCard
  const recipeCards = filteredRecipes.map((recipe) => (
    <Grid key={recipe.id} item xs={12} sm={6} md={4} lg={3}>
      <RecipeCard key={recipe.id} recipe={recipe}/>
    </Grid>
  ))


  return (
    <Box sx={{flexGrow: 1, ml: 4, mr: 4, mt: 8}}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h3'>
            Drink Lab
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>Filter</Typography>
          <DrinkFilter recipes={recipes} searchObj={searchObj} handleSearchChange={handleSearchChange}/>
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
