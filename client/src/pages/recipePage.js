import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useFormik} from 'formik';
import * as yup from 'yup';
import { Box, Card, Grid,CardContent, CircularProgress, Button, Typography, Rating, Paper, } from '@mui/material';
import "../styles/recipePage.css";
import { useAuth } from "../auth/authProvider";
import ReviewModal from "../components/reviewModal";
import ConfirmDialogue from "../components/confirmDialogue";

const RecipePage = () => {
  const auth = useAuth()
  const {id} = useParams()
  const [edit, setEdit] = useState(false)
  const [recipe, setRecipe] = useState()
  const [reviews, setReviews] = useState()
  const [dialogue, setDialogueOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [render, setRender] = useState(false)
  const [editingReview, setEditingReview] = useState({})

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
  },[id, render])

  const reviewSchema = yup.object().shape({
    rating: yup.number().required('Please enter a rating'),
    comment: yup.string().required('Please enter a comment').min(3, 'Comment is too short - should be 3 characters minimum.')
  });

  const formik = useFormik({
    initialValues: {
      rating: edit ? editingReview.rating: 0,
      comment: edit ? editingReview.comment: "",
    },
    validationSchema: reviewSchema,
    onSubmit: (values, {resetForm}) => {
      let correctValues={
        rating: values.rating,
        comment: values.comment,
        recipe_id: id,
        user_id: auth.user && auth.user.id ? auth.user.id : undefined
      }
      let fetchPromise = edit
        ? fetch(`/reviews/${editingReview.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(correctValues),
        })
        : fetch(`/reviews/journal${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(correctValues),
        });

      fetchPromise
      .then(r => r.json())
      .then((obj) => console.log(obj))
      .catch(err => console.log(err))

      resetForm()
      setOpen(false)
      setEdit(false)
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

  //EDIT/DELETE REQUEST TO REVIEW
    const handleEdit = (e, review_id) => {
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
      <CardContent style={{ padding: '5px', display: 'flex', flex: 1}}>
        <div className=".edit-review">
          <Rating value={review.rating} readOnly />
          <Typography>{review.comment}</Typography>
        </div>
        <div className="edit-review">
          {auth.user && review.user_id === auth.user.id ? (
              <>
              <Button onClick={(e) => {
                setOpen(true)
                setEdit(true)
                setEditingReview(review)
                }}>Edit Review</Button>
              <Button name='deleteButton' onClick={(e) => handleEdit(e, review.id)}>Delete Review</Button>
              </>
          ) : (
            null
          )}
        </div>
      </CardContent>
    </Card>
  ))

  const openDialogue = () => {
    setDialogueOpen(true)
  }
  const closeDialogue = () => {
    setDialogueOpen(false)
  }

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
          {auth.user && auth.user.id === recipe.creator_id ?
          <Button sx={{ml:2}} onClick={openDialogue} variant='contained'>Delete Review</Button>
          : null}
          {dialogue ? <ConfirmDialogue open={dialogue} handleOpen={openDialogue} handleClose={closeDialogue} recipe_id={recipe.id} />: null}
          {edit ? (
            <ReviewModal
              open={open}
              handleClose={handleClose}
              rating={formik.values.rating}
              touchedRating={formik.touched.rating}
              errorRating={formik.errors.rating}
              comment={formik.values.comment}
              touchedComment={formik.touched.comment}
              errorComment={formik.errors.comment}
              handleBlur={formik.handleBlur}
              handleChangeRating={formik.setFieldValue}
              handleChangeComment={formik.handleChange}
              handleSubmit={formik.handleSubmit}
              edit={edit}
              handleEdit={handleEdit}
              editingReview={editingReview}
              formik={formik}
            />
          ) : (
            <ReviewModal
              open={open}
              handleClose={handleClose}
              rating={formik.values.rating}
              touchedRating={formik.touched.rating}
              errorRating={formik.errors.rating}
              comment={formik.values.comment}
              touchedComment={formik.touched.comment}
              errorComment={formik.errors.comment}
              handleBlur={formik.handleBlur}
              handleChangeRating={formik.setFieldValue}
              handleChangeComment={formik.handleChange}
              handleSubmit={formik.handleSubmit}
              edit={edit}
              handleEdit={handleEdit}
              editingReview={editingReview}
              formik={formik}
            />
          )}
            {reviewDisplay}
        </Grid>
      </Grid>
    </Box>
  )
}

export default RecipePage
