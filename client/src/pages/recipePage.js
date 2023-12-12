import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Modal, TextareaAutosize, Grid, CircularProgress, TextField, Button, Typography, Rating, Paper, } from '@mui/material';
import "../styles/recipePage.css";
import { useAuth } from "../auth/authProvider";

const RecipePage = () => {
  const auth = useAuth()
  const {id} = useParams()
  const [recipe, setRecipe] = useState()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    fetch(`/recipes/${id}`)
    .then(r => r.json())
    .then(setRecipe)
    .catch(err => console.log(err))
  }, [id])

  const reviewSchema = yup.object().shape({
    rating: yup.number().required('Please enter a rating'),
    comment: yup.string().required('Please enter a comment').min(3, 'Comment is too short - should be 3 characters minimum.')
  });

  const formik = useFormik({
    initialValues: {
      rating: 0,
      comment: "",
    },
    validationSchema: reviewSchema,
    onSubmit: (values) => {
      const correctValues={
        rating: values.rating,
        comment: values.comment,
        recipe_id: id,
        user_id: auth.user.id
      }
      fetch(`/reviews`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(correctValues)
      })
      .then(r => r.json())
      .then((newReview) => console.log(newReview))
      .catch(err => console.log(err))

      setOpen(false)

      //run a POST
      console.log('submitted', correctValues)
    }
  })

  if (!recipe) {
    return <CircularProgress />
  }
  //after you have recipe, destructure
  const {title, creator, average_rating, ingredients, image, instructions, tags, medicinal} = recipe
  const ingredientArray = ingredients.split(",").map((ingredient) => (
    <li>{ingredient}</li>
  ))
  //!MUST PUT USER INSTRUCTIONS FOR EDITING (USE SNACKBAR?POPUP)
  const instructionsArray = instructions.split(/\.\s+/).filter(instruction => instruction.trim() !== "").map((instruction, index) => (
    <li key={index}>{instruction.trim()}</li>
  ));





  return (
    <Box sx={{ flexGrow: 1, ml: 4, mr: 4, mt: 8 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h3'>
            {title}
          </Typography>
          <Grid container item xs={12}>
          <Rating sx={{m:2}} value={average_rating} readOnly/>
            <Typography sx={{ m: 2 }}>
              {creator.username}
          </Typography>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Typography>
            Ingredients
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography>
            Instructions
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={4}>
          {ingredientArray}
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper>
            {instructionsArray}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Comments
          </Typography>
        </Grid>
        <Grid item xs={12} justifyContent="flex-end">
          <Button onClick={handleOpen} variant='contained'>Add a Review</Button>
          <Modal
            id='modal'
            open={open}
            onClose={handleClose}
          >
            <div id='review-modal'>
                <h1 className='modal-title'>
                  Add a Review
                </h1>
              <form className='modal-form' onSubmit={formik.handleSubmit}>
                <Rating
                  name='rating'
                  onBlur={formik.handleBlur}
                  onChange={(event, newValue) => formik.setFieldValue('rating', newValue)}
                  value={formik.values.rating}
                  sx={{ mt: 2, alignSelf: 'flex-start' }}/>
                {formik.errors.rating && formik.touched.rating}
                <TextField
                  name='comment'
                  onBlur={formik.handleBlur}
                  onChange={(e) => formik.handleChange(e)}
                  value={formik.values.comment}
                  sx={{ mt: 2 }} multiline rows={3} placeholder="Add your review here"/>
                {formik.errors.comment && formik.touched.comment}
                <Button type='button' onClick={formik.handleSubmit} sx={{mt: 2}} variant='contained'>Post Review</Button>
              </form>
            </div>
          </Modal>
          <Paper sx={{ display: 'flex', alignItems: 'center', padding: 2, width: '100%', justifyContent: 'space-between' }}>
            <TextareaAutosize style={{ flex: 1, mr: 2, width: '100%' }}  minRows={3} placeholder='Add a new comment'/>
            {/* <TextField sx={{m:2}}multiline rows={3} placeholder="Add a new comment"/> */}
            <Button sx={{ml:2}} variant='contained'>Add Comment</Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default RecipePage
