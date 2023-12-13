import React, {useState} from 'react'
import { ImageList, Chip, FormControlLabel, ImageListItem, List, ListItem, ListItemIcon, ListItemText, Box, TextField, Grid, Typography, Button, Paper, } from '@mui/material';
import '../styles/addRecipe.css'
import EditIcon from '@mui/icons-material/Edit';
import CoffeeTwoToneIcon from '@mui/icons-material/CoffeeTwoTone';
import DoneIcon from '@mui/icons-material/Done'
import { MedicinalSwitch } from '../styles/SwitchStyles';
import * as yup from 'yup';
import { useFormik } from "formik";
import {useAuth} from "../auth/authProvider"

const RecipeForm = () => {
  const auth = useAuth()
  const [chipStates, setChipStates] = useState(Array(5).fill(false))
  const randomImage = [
    "/images/img1.jpg",
    "/images/img2.jpg",
    "/images/img3.jpg",
    "/images/img4.jpg",
    "/images/img5.jpg",
    "/images/img6.jpg",
    "/images/img7.jpg",
    "/images/img8.jpg",
  ]
  const tags = ['caffeine', 'creamy', 'spiced', 'citrusy', 'herbal']

  const handleChipClick = (index) => {
    setChipStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const recipeSchema = yup.object().shape({
    title: yup
      .string()
      .required("Please enter a recipe title"),
    instructions: yup
      .string()
      .required("Please enter in some instructions"),
    tags: yup
      .string()
      .required('Please select at least one tag'),
    ingredients: yup
      .string()
      .required('Please put at least one ingredient'),
    medicinal: yup
      .boolean()
      .required('Please indicate if your drink has medicinal properties'),
    image: yup
      .string()
      .required('Please select one image')
  })

  const formik = useFormik({
    initialValues: {
      title: '',
      instructions: '',
      tags: '',
      ingredients: '',
      medicinal: null,
      image: '',
    },
    validationSchema: recipeSchema,
    onSubmit: (values, {resetForm}) => {
      console.log('build out a fetch POST', 'submitted')
      resetForm()
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid className='recipe-container' container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label='Add Title'
            defaultValue='Add Title'
            helperText='Cannot leave title blank'
          />
          <Button >
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
                <ListItem key={index} sx={{ pl: 0, pr: 0 }}>
                  <ListItemIcon >
                    <CoffeeTwoToneIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <TextField
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
                    <ImageListItem key={image}>
                      <img
                        srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt='drink'
                        src={`${image}?w=164&h=164&fit=crop&auto=format`}
                        loading='lazy'
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Grid>
              <Grid item xs={3}>
                <Typography variant='h6'>Select Relevant Tags</Typography>
                <Grid sx={{ mt: 1, mb: 4 }} container spacing={2}>
                  {chipStates.map((isFilled, index) => (
                    <Grid item key={index}>
                      <Chip
                        label={tags[index]}
                        onClick={() => handleChipClick(index)}
                        variant='outlined'
                        icon={isFilled ? <DoneIcon /> : null}
                        style={{ padding: '15px', fontSize: '18px', borderColor: '#9C9C9C', backgroundColor: isFilled ? 'rgba(172, 207, 201, 0.5)' : '' }}
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
                  // checked={searchObj.medicinal}
                  // onChange={onChange}
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
