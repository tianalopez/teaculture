import React, {useEffect} from 'react';
import { Modal, TextField, Button,  Rating,  } from '@mui/material';

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
      id='modal'
      open={open}
      onClose={handleClose}
    >
      <div id='review-modal'>
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
          {errorComment && touchedComment}
          <TextField
            name='comment'
            onBlur={handleBlur}
            onChange={(e) => handleChangeComment(e)}
            value={comment}
            sx={{ mt: 2 }} multiline rows={3} placeholder="Add your review here" />
          {errorComment && touchedComment}
          {edit ? (
            <Button name='editButton' type='submit' onClick={handleSubmit} sx={{ mt: 2 }} variant='contained'>Update Review</Button>
          ) : (
            <Button type='submit' onClick={handleSubmit} sx={{ mt: 2 }} variant='contained'>Post Review</Button>

          )}
        </form>
      </div>
    </Modal>
  )
}

export default ReviewModal
