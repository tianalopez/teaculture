import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useFormik} from 'formik';
import * as yup from 'yup';
import { Box, Card, Grid,CardContent, ListItem, Divider, ListItemText,List,CircularProgress, Button, Typography, Rating, Paper, } from '@mui/material';
import "../styles/recipePage.css";
import { useAuth } from "../auth/authProvider";
import ReviewModal from "../components/reviewModal";
import ConfirmDialogue from "../components/confirmDialogue";
import { useUI } from "../components/UIContext";

const RecipePage = () => {
  const auth = useAuth()
  const navigate = useNavigate()
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
  const { handleNewAlert, handleAlertType } = useUI()


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
      .then(() => {
        handleNewAlert('Success!')
        handleAlertType('success')
        resetForm()
      })
      .catch(err => {
        handleNewAlert(err.error)
        handleAlertType('error')
        resetForm()
      })

      setOpen(false)
      setEdit(false)
      setRender((status) => !status)
    }
  })
  useEffect(() => {
    if (!edit) {
      formik.handleReset();
    }
  }, [edit]);

  if (!recipe || !reviews) {
    return <CircularProgress />
  }
  //after you have recipe and reviews, destructure
  const {title, creator, average_rating, ingredients, image, instructions, tags, medicinal} = recipe
  const ingredientArray = ingredients.split(",").map((ingredient, index) => (
    [
      <ListItem key={index} disablePadding>
        <Typography component="span">• {ingredient}</Typography>
      </ListItem>,
      index < ingredients.length - 1 && <Divider key={`divider-below-${index}`} />,
    ]
  ))
  //!MUST PUT USER INSTRUCTIONS FOR EDITING (USE SNACKBAR?POPUP)
  const instructionsArray = instructions.split(/\.\s+/).filter(instruction => instruction.trim() !== "").map((instruction, index) => (
    [
      <ListItem key={index} disablePadding>
        <Typography component="span">• {instruction.trim()}</Typography>
      </ListItem>,
      index < instructions.length - 1 && <Divider key={`divider-${index}`} />,
    ]
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
          .then(() => {
            handleNewAlert('Review Deleted!')
            handleAlertType('success')
          })
          .catch(err => {
            handleNewAlert(err.error)
            handleAlertType('error')
          })
        setRender((status) => !status)
      }

      console.log(reviews)
  const reviewDisplay = reviews.map((review) => (
    <Card key={review.id} sx={{ mt: 2, mb: 2, display: 'flex', alignItems: 'center', padding: 2, width: '100%', justifyContent: 'space-between' }}>
      <CardContent style={{ padding: '5px', display: 'flex', flex: 1}}>
        <div className=".edit-review">
          <Rating value={review.rating} readOnly />
          <Typography fontSize='1.1rem' fontFamily='Dosis'>Author: {review.user.username}</Typography>
          <Typography fontFamily='Dosis'>{review.comment}</Typography>
        </div>
        <div className="edit-review">
          {auth.user && review.user_id === auth.user.id ? (
              <>
              <Button sx={{mb:1}}className='filter-tag-clicked' onClick={(e) => {
                setOpen(true)
                setEdit(true)
                setEditingReview(review)
                }}>Edit Review</Button>
              <Button className='filter-tag-clicked' name='deleteButton' onClick={(e) => handleEdit(e, review.id)}>Delete Review</Button>
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
  const handleEditRecipe = () => {
    const recipeObj = recipe
    navigate(`/users/${auth.user.id}/adddrink`, {state: {recipeObj}})
  }


  return (
    <Box sx={{ flexGrow: 1, ml: 4, mr: 4, mt: 8 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography fontFamily='Dosis' variant='h3'>
            {title}
          </Typography>
          <Grid container item xs={12}>
          <Rating sx={{m:2}} value={average_rating} readOnly/>
            <Typography fontFamily='Dosis' fontSize='1.2rem' sx={{ m: 2 }}>
              {creator.username}
          </Typography>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{
            height:'30vh',
            p: 2,
            overflow: 'scroll',
            backgroundColor: '#F6F5F3',
            borderRadius: '20px',
            position: 'relative',
            padding: '20px',
            marginBottom: '20px',
          }} elevation={4}>
            <Typography fontFamily='Dosis' fontSize='1.5rem'>
            <img style={{ marginRight: '8px', width: '20px', height: '20px' }} src="/images/whisk.png" alt='whisk'>
            </img>
              Ingredients
            </Typography>
            <List>
              {ingredientArray}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper sx={{
            p: 2,
            height: '30vh',
            backgroundColor: '#F6F5F3',
            borderRadius: '20px',
            padding: '20px',
            overflow: 'scroll',
            marginBottom: '20px' }} elevation={4}>
            <Typography fontFamily='Dosis' fontSize='1.5rem'>
              <img style={{ marginRight: '8px', width: '20px', height: '20px' }} src="/images/books.png" alt='whisk'>
              </img>
              Instructions
            </Typography>
            <List>
              {instructionsArray}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography fontFamily='Dosis' variant='h5'>
            Comments
          </Typography>
        </Grid>
        <Grid item xs={12} justifyContent="flex-end">
          {auth.user && auth.user.id !== recipe.creator_id ?
          <Button className='filter-tag-clicked' onClick={() => {
            setEdit(false)
            formik.handleReset()
            setOpen(true)
          }} variant='contained'>Add a Review</Button>
          : null}
          {auth.user && auth.user.id === recipe.creator_id ?
          <Button className='filter-tag-clicked'sx={{ml:2}} onClick={openDialogue} variant='contained'>Delete Recipe</Button>
          : null}
          {auth.user && auth.user.id === recipe.creator_id ?
          <Button className='filter-tag-clicked'sx={{ml:2}} onClick={handleEditRecipe} variant='contained'>Edit Recipe</Button>
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
