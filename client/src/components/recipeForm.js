import React, {useState, useEffect} from 'react'
import { ImageList, Chip, FormControlLabel, ImageListItem, List, ListItem, ListItemIcon, ListItemText, Box, TextField, Grid, Typography, Button, Paper, } from '@mui/material';
import '../styles/addRecipe.css'
import EditIcon from '@mui/icons-material/Edit';
import CoffeeTwoToneIcon from '@mui/icons-material/CoffeeTwoTone';
import DoneIcon from '@mui/icons-material/Done'
import { MedicinalSwitch } from '../styles/SwitchStyles';
import {useAuth} from "../auth/authProvider"
import _ from 'lodash'

const RecipeForm = ({formik}) => {
  const auth = useAuth()
  const tags = ['caffeine', 'creamy', 'spiced', 'citrusy', 'herbal']
  const initialChips = Array(5).fill("").map((_,index) => ({name:tags[index], value:false}))
  const [chipStates, setChipStates] = useState(initialChips)
  const [selectedImg, setSelectedImg] = useState(null)
  const initialIngredients = Array(10).fill("").map((_, index) => ({ index, value: "" }));
  const [ingredients, setIngredients] = useState(initialIngredients)
  const initialInstructions = Array(10).fill("").map((_, index) => ({ index, value: "" }));
  const [instructions, setInstructions] = useState(initialInstructions)
  const randomImage = [
    {img: "/images/img1.jpg"},
    {img: "/images/img2.jpg"},
    {img: "/images/img3.jpg"},
    {img: "/images/img4.jpg"},
    {img: "/images/img5.jpg"},
    {img: "/images/img6.jpg"},
    {img: "/images/img7.jpg"},
    {img: "/images/img8.jpg"},
  ]

  //grab the values of any ingredient or instruction input
  const handleChange = (e, index) => {
      if (e.target.name === 'ingredients') {
      setIngredients(prevIngredients => {
        // Create a copy of the existing array
        const newIngredients = [...prevIngredients];
        // Update the value of the specific ingredient
        newIngredients[index] = { ...newIngredients[index], value: e.target.value };
        return newIngredients;
      });
    }
    else if (e.target.name === 'instructions') {
      setInstructions(prevInstructions => {
        // Create a copy of the existing array
        const newInstructions = [...prevInstructions];
        // Update the value of the specific ingredient
        newInstructions[index] = { ...newInstructions[index], value: e.target.value };
        return newInstructions;
      });
    }
    else {
      setChipStates(prevChips => {
        return prevChips.map((chip) => {
          if (chip.name === e.target.textContent) {
            return {...chip, value: !chip.value}
          }
          return chip
        })
      })
    }

  }


  //set the formik form with the gathered values as they change
  useEffect(() => {
    const ingredientString = ingredients.map((item) => item.value.trim()).filter(Boolean).map((ingredient) => ingredient.replace(/[.,]$/, '')).join(",")
    const instructionString = instructions.map((item) => item.value.trim()).filter(Boolean).map((ingredient) => ingredient.replace(/[.,]$/, '')).join(".")
    const tagString = chipStates.filter((chipObj) => chipObj.value === true).map(chipObj => chipObj.name).join(",")
    //grab the image from selectedImg

  },[ingredients, instructions, chipStates,formik])

  const handleSubmit = (e) => {
    e.preventDefault()
    const ingredientString = ingredients.map((item) => item.value.trim()).filter(Boolean).map((ingredient) => ingredient.replace(/[.,]$/, '')).join(",")
    const instructionString = instructions.map((item) => item.value.trim()).filter(Boolean).map((ingredient) => ingredient.replace(/[.,]$/, '')).join(".")
    const tagString = chipStates.filter((chipObj) => chipObj.value === true).map(chipObj => chipObj.name).join(",")
    formik.setFieldValue('ingredients', ingredientString);
    formik.setFieldValue('instructions', instructionString);
    formik.setFieldValue('tags', tagString);
    formik.setFieldValue('image', selectedImg);

    formik.handleSubmit()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid className='recipe-container' container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            label='Add Title'
            defaultValue='Add Title'
            helperText='Cannot leave title blank'
            value={formik.values.title}
            name='title'
            onChange={formik.handleChange}
          />
          <Button type='submit'>
            Add Recipe
          </Button>
        </Grid>
        <Grid sx={{ pl: 2, }} item xs={4}>
          <Paper sx={{ p: 3 }} elevation={4}>
            <Typography variant='h6'>
              Add Ingredients
            </Typography>
            <List sx={{ ml: 1, mr: 1 }} className='ingredients-list'>
              {[...Array(10).keys()].map((index) => (
                <ListItem
                  key={index} sx={{ pl: 0, pr: 0 }}>
                  <ListItemIcon >
                    <CoffeeTwoToneIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <TextField
                      onChange={(e) => handleChange(e, index)}
                      value={ingredients[index].value}
                      name='ingredients'
                      fullWidth
                      placeholder="Enter ingredient"
                      variant='standard'
                    />
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid sx={{ pl: 2, pr: 2 }} item xs={8}>
          <Paper sx={{ p: 3 }} elevation={4}>
            <Typography variant='h6'>
              Add Instructions
            </Typography>
            <List sx={{ ml: 1, mr: 1 }} className='ingredients-list'>
              {[...Array(10).keys()].map((index) => (
                <ListItem key={index}>
                  <ListItemIcon >
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <TextField
                      onChange={(e) => handleChange(e, index)}
                      value={instructions[index].value}
                      name='instructions'
                      fullWidth
                      placeholder="Enter instruction"
                      variant='standard'
                    />
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid sx={{ pr: 2, mb: 2 }} item xs={12}>
          <Paper sx={{ p: 3 }} elevation={4}>
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <Typography variant='h6'>Pick Cover Image</Typography>
                <ImageList sx={{ width: '100%' }} cols={4} rowHeight={164}>
                  {randomImage.map((image) => (
                    <ImageListItem
                      sx={{m:0.5}}
                      title={image.img} key={image.img}>
                      <img
                        className={selectedImg === image.img ? 'selectedImg' : 'allImg'}
                        srcSet={`${image.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt='drink'
                        src={`${image.img}?w=164&h=164&fit=crop&auto=format`}
                        loading='lazy'
                        onClick={() => setSelectedImg(image.img)}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Grid>
              <Grid item xs={3}>
                <Typography variant='h6'>Select Relevant Tags</Typography>
                <Grid sx={{ mt: 1, mb: 4 }} container spacing={2}>
                  {chipStates.map((chipObj, index) => (
                    <Grid item key={index}>
                      <Chip
                        name={tags[index]}
                        label={tags[index]}
                        onClick={(e) => handleChange(e, index)}
                        variant='outlined'
                        icon={chipObj.value ? <DoneIcon /> : null}
                        style={{ padding: '15px', fontSize: '18px', borderColor: '#9C9C9C', backgroundColor: chipObj.value ? 'rgba(172, 207, 201, 0.5)' : '' }}
                      />
                    </Grid>
                  ))}
                </Grid>
                <FormControlLabel
                  label="Medicinal Drink"
                  labelPlacement='start'
                  sx={{ ml: 0 }}
                  control={<MedicinalSwitch
                    name="medicinal"
                    checked={formik.values.medicinal}
                    onChange={(e) => formik.setFieldValue('medicinal', e.target.checked)}
                  />}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </form>
  )
}

export default RecipeForm
