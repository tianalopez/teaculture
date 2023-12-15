import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DialogTitle, DialogActions, Dialog, Button} from '@mui/material';
import { useUI } from './UIContext';

const ConfirmDialogue = ({open, handleOpen, handleClose, recipe_id}) => {
  const { handleNewAlert, handleAlertType } = useUI()
  const navigate = useNavigate()
  const handleDelete = () => {
    fetch(`/recipes/${recipe_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(() => {
      handleNewAlert('Recipe Deleted!')
      handleAlertType('success')
    })
    .catch(err => {
      handleNewAlert(err.error)
      handleAlertType('error')
    })
    navigate('/drinklab')
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
