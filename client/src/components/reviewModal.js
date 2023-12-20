import React, {useEffect} from 'react';
import { Modal, TextField, Button,  Rating, Backdrop } from '@mui/material';

const ReviewModal = ({
  open,
  handleClose,
  rating,
  touchedRating,
  errorRating,
  comment,
  touchedComment,
  errorComment,
  handleBlur,
  handleChangeRating,
  handleChangeComment,
  handleSubmit,
  edit,
  editingReview,
  formik,
}) => {

  useEffect(() => {
    // Set initial values when editingReview changes
    formik.setValues({
      rating: editingReview.rating,
      comment: editingReview.comment,
    });
  }, [editingReview, edit]);

  return (
    <Modal
      id='review-modal'
      open={open}
      onClose={handleClose}
      // closeAfterTransition
      // BackdropComponent={(props) => (
      //   <Backdrop {...props} onClick={() => {
      //     handleClose()
      //     setEdit(false)
      //   }} />
      // )}
    >
      <div className='modal-container'>
        {edit ? (
          <h1 className='modal-title'>
            Update Review
          </h1>
        ): (
          <h1 className='modal-title'>
            Add a Review
          </h1>
        )}
        <form className='modal-form' onSubmit={handleSubmit}>
          <Rating
            name='rating'
            onBlur={handleBlur}
            onChange={(event, newValue) => handleChangeRating('rating', newValue)}
            value={rating}
            sx={{ mt: 2, alignSelf: 'flex-start' }} />
          {errorRating && touchedRating ? <div>{errorRating}</div> : null}
          <TextField
            InputProps={{
              style: { fontSize: '1.3rem', fontFamily: 'Dosis' },
            }}
            name='comment'
            onBlur={handleBlur}
            onChange={(e) => handleChangeComment(e)}
            value={comment}
            sx={{
              mt: 2, fontFamily: 'Dosis',
              '& textarea::placeholder': {
                fontFamily: 'Dosis',
              }, }} multiline rows={3} placeholder="Add your review here" />
          {errorComment && touchedComment ? <div>{errorComment}</div> : null}
          {edit ? (
            <Button className='filter-tag-clicked' name='editButton' type='submit' onClick={handleSubmit} sx={{ mt: 2 }} variant='contained'>Update Review</Button>
          ) : (
            <Button className='filter-tag-clicked'type='submit' onClick={handleSubmit} sx={{ mt: 2 }} variant='contained'>Post Review</Button>

          )}
        </form>
      </div>
    </Modal>
  )
}

export default ReviewModal
