import React, {useEffect, useState, useMemo} from 'react'
import { Grid, Box, Typography, TextField      } from '@mui/material'
import RecipeCard from '../components/recipeCard'
import DrinkFilter from '../components/drinkFilter'
import { useAuth } from "../auth/authProvider"

const Recipes = () => {
  const auth = useAuth()
  const [recipes, setRecipes] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const width = 345;
  const defaultSearchObj = {
    search: "",
    avg_rating: null,
    medicinal: false,
    favorited: false,
  }
  const [searchObj, setSearchObj] = useState(defaultSearchObj)

  //! tons of filtering
  const handleSearchChange = (name, value) => {
    setSearchObj({...searchObj, [name]: value})
  }
  //!filtered recipes

    const filteredRecipes = useMemo(() => {
      return recipes
      .filter((recipe) => recipe.title.toLowerCase().includes(searchObj.search.toLowerCase()))
      .filter((recipe) => recipe.average_rating >= Number(searchObj.avg_rating))
      .filter((recipe) => {
        if (searchObj.medicinal === false) {
          return true;
        }
        return recipe.medicinal === (searchObj.medicinal === "true");
      })
      .filter((recipe) => selectedTags.every((tag) => recipe.tags.includes(tag)))
    },[searchObj, selectedTags, recipes])
      .filter((recipe) => {
        if (searchObj.favorited === false) {
          return true;
        }
        return auth.user.favorites.some((favorite) => favorite.recipe_id === recipe.id)
      })






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
      <RecipeCard width={width} key={recipe.id} recipe={recipe}/>
    </Grid>
  ))


  return (
    <Box sx={{ flexGrow: 1, ml: 0, mr: 4, mt: 4, mb: 8 }}>
      <Grid sx={{ ml: 0 }} container spacing={2}>
        <Grid item xs={12}>
          <Typography fontFamily='Dosis' variant='h3'>
            Drink Lab
          </Typography>
        </Grid>
        <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column' }} >
        <Grid container spacing={2} sx={{display: 'flex', flexDirection:'column'}}>

          <DrinkFilter recipes={recipes} searchObj={searchObj} handleSearchChange={handleSearchChange} selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>
        </Grid>
        </Grid>
        <Grid sx={{ p: 2, justifyContent: 'center' }} item xs={9}>
          <Grid container spacing={2}>
          {recipeCards}
          </Grid>
        </Grid>
      </Grid>

    </Box>


  )
}

export default Recipes
