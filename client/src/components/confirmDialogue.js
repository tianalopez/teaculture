import React from 'react'
import { DialogContentText, DialogContent, DialogTitle, DialogActions, Dialog, Button} from '@mui/material';

const ConfirmDialogue = ({open, handleOpen, handleClose, recipe_id}) => {

  const handleDelete = () => {
    handleClose()
  }

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="confirm-deletion"
        aria-describedby="confirm-deletion"
      >
        <DialogTitle >
          {"Are you sure you want to delete this recipe?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Confirm Deletion
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default ConfirmDialogue
