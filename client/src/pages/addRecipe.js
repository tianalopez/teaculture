import React, {useState, TransitionGroup } from 'react'
import { Box,  Grid, Typography, } from '@mui/material';
import RecipeForm from '../components/recipeForm';
import * as yup from 'yup';
import { useFormik } from "formik";
import { useAuth } from "../auth/authProvider"


const AddRecipe = () => {

  const recipeSchema = yup.object().shape({
    title: yup.string().required('Please enter a recipe title'),
    instructions: yup.string().required('Please enter in some instructions'),
    tags: yup.string().required('Please select at least one tag'),
    ingredients: yup.string().required('Please put at least one ingredient'),
    medicinal: yup.boolean().required('Please indicate if your drink has medicinal properties'),
    image: yup.string().required('Please select one image'),
  });

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
    onSubmit: (values, { resetForm }) => {
      console.log('build out a fetch POST', 'submitted');
      resetForm();
    },
  });
  return (
    <Box sx={{ flexGrow: 1, ml: 4, mr: 4, mt: 8, mb:8 }}>
        <Grid sx={{mb: 5}} item xs={12}>
          <Typography variant='h3'>Create a New Recipe</Typography>
        </Grid>
      <RecipeForm formik={formik} />
    </Box>
  )
}

export default AddRecipe
