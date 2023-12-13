import React from 'react';
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
}) => {
  return (
    <Modal
      id='modal'
      open={open}
      onClose={handleClose}
    >
      <div id='review-modal'>
        <h1 className='modal-title'>
          Add a Review
        </h1>
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
          <Button type='submit' onClick={handleSubmit} sx={{ mt: 2 }} variant='contained'>Post Review</Button>
        </form>
      </div>
    </Modal>
  )
}

export default ReviewModal
