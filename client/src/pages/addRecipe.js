import React, {useState, TransitionGroup } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box,  Grid, Typography, } from '@mui/material';
import RecipeForm from '../components/recipeForm';
import * as yup from 'yup';
import { useFormik } from "formik";
import { useAuth } from "../auth/authProvider"
import { useUI } from '../components/UIContext';


const AddRecipe = () => {
  const navigate = useNavigate()
  const { handleNewAlert, handleAlertType } = useUI()
  const [edit, setEdit] = useState(false)
  const [recipeId, setRecipeId] = useState()
  const recipeSchema = yup.object().shape({
    title: yup.string().required('Please enter a recipe title'),
    instructions: yup.string().required('Please enter in some instructions'),
    tags: yup.string().required('Please select at least one tag'),
    ingredients: yup.string().required('Please put at least one ingredient'),
    medicinal: yup.boolean().required('Please indicate if your drink has medicinal properties'),
    image: yup.string().required('Please select one image'),
    creator_id: yup.number().required(),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      instructions: '',
      tags: '',
      ingredients: '',
      medicinal: false,
      image: '',
      creator_id: null,
    },
    validationSchema: recipeSchema,
    onSubmit: (values, { resetForm }) => {
      //! add the checktoken route, if repsonse is good, do the POST
      //!if checktoken is bad, refresh is good, do the POST
      //!else navigate/logout/DELETE
      if (!edit) {
        fetch('/recipes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(values)
        })
        .then(r => {
          r.json()
          if (!r.ok) {
            console.log(r)
          }
        })
        .then((data) => {
          handleNewAlert('Recipe Added!')
          handleAlertType('success')
        })
        .catch((err) => {
          handleNewAlert(err.error)
          handleAlertType('error')
        })
        resetForm();
        navigate('/drinklab')
      }
      else {
        fetch(`/recipes/${recipeId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(values)
        })
        .then(r => r.json())
        .then((data) => {
          handleNewAlert('Recipe Updated!')
          handleAlertType('success')
        })
        .catch((err) => {
          handleNewAlert(err.error)
          handleAlertType('error')
        })
        resetForm()
        setEdit(false)
        navigate('/drinklab')
      }
    },
  });

  return (
    <Box sx={{ flexGrow: 1, ml: 4, mr: 4, mt: 8, mb:8 }}>
        <Grid sx={{mb: 5}} item xs={12}>
          <Typography variant='h3'>Create a New Recipe</Typography>
        </Grid>
      <RecipeForm formik={formik} setEdit={setEdit} setRecipeId={setRecipeId}/>
    </Box>
  )
}

export default AddRecipe
