import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useFormik} from 'formik';
import * as yup from 'yup';
import { Box,Modal, Card, Grid, CardActions,CardContent, CircularProgress, TextField, Button, Typography, Rating, Paper, } from '@mui/material';
import "../styles/recipePage.css";
import { useAuth } from "../auth/authProvider";

const RecipePage = () => {
  const auth = useAuth()
  const {id} = useParams()

  const [recipe, setRecipe] = useState()
  const [reviews, setReviews] = useState()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [render, setRender] = useState(false)

  console.log(reviews)
  useEffect(() => {
    Promise.all([
      fetch(`/recipes/${id}`).then((r) => r.json()),
      fetch(`/reviews/journal${id}`).then((r) => r.json()),
    ])
      .then(([recipeData, reviewsData]) => {
        setRecipe(recipeData);
        setReviews(reviewsData);
      })
      .catch((err) => console.log(err));


  //   fetch(`/recipes/${id}`)
  //   .then(r => r.json())
  //   .then(setRecipe)
  //   .catch(err => console.log(err))
  // }, [id, render])

  // useEffect(() => {
  //   fetch(`/reviews/journal${id}`)
  //   .then(r => r.json())
  //   .then(setReviews)
  //   .catch(err => console.log(err))
  },[id, render])

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
    onSubmit: (values, {resetForm}) => {
      const correctValues={
        rating: values.rating,
        comment: values.comment,
        recipe_id: id,
        user_id: auth.user.id
      }
      fetch(`/reviews/journal${id}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(correctValues)
      })
      .then(r => r.json())
      .catch(err => console.log(err))

      resetForm()
      setOpen(false)
      setRender((status) => !status)

      //run a POST
      console.log('submitted', correctValues)
    }
  })

  if (!recipe || !reviews) {
    return <CircularProgress />
  }
  //after you have recipe and reviews, destructure
  const {title, creator, average_rating, ingredients, image, instructions, tags, medicinal} = recipe
  const ingredientArray = ingredients.split(",").map((ingredient) => (
    <li>{ingredient}</li>
  ))
  //!MUST PUT USER INSTRUCTIONS FOR EDITING (USE SNACKBAR?POPUP)
  const instructionsArray = instructions.split(/\.\s+/).filter(instruction => instruction.trim() !== "").map((instruction, index) => (
    <li key={index}>{instruction.trim()}</li>
  ));
  //DELETE REQUEST TO REVIEW
    const handleDelete = (review_id) => {
      fetch(`/reviews/${review_id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(r => r.json())
      .catch(err => console.log(err))
      setRender((status) => !status)
    }

  const reviewDisplay = reviews.map((review) => (
    <Card key={review.id} sx={{ mt: 2, mb: 2, display: 'flex', alignItems: 'center', padding: 2, width: '100%', justifyContent: 'space-between' }}>
      <CardContent style={{ padding: '5px', display: 'flex', flex: 1, alignItems: 'center' }}>
          <Typography>{review.comment}</Typography>
        <div className="edit-review">
        {review.user_id === auth.user.id ? (
            <>
            <Button>Edit Review</Button>
            <Button onClick={() => handleDelete(review.id)}>Delete Review</Button>
            </>
        ) : (
          null
        )}

        </div>
      </CardContent>
    </Card>
  ))


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
          <Typography variant='h6'>
            Comments
          </Typography>
        </Grid>
        <Grid item xs={12} justifyContent="flex-end">
          {auth.user ?
          <Button onClick={handleOpen} variant='contained'>Add a Review</Button>
          : null}
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
                <Button type='submit' onClick={formik.handleSubmit} sx={{mt: 2}} variant='contained'>Post Review</Button>
              </form>
            </div>
          </Modal>
            {reviewDisplay}
        </Grid>
      </Grid>
    </Box>
  )
}

export default RecipePage
