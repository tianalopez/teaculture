import React, {useState, useEffect} from 'react';
import { Modal, Grid, Avatar, Box, Typography, TextField, Card, ListItemText, CardContent, ListItemIcon, ListItemButton, Divider, Button, ListItem, } from '@mui/material';
import { useAuth } from '../auth/authProvider';
import "../styles/profile.css"

const ProfileModal = ({open, handleClose}) => {
  const auth = useAuth()
  console.log(auth.user)
  return (
    <Modal
      id='profile-modal'
      open={open}
      onClose={handleClose}
      >
      <div className='modal-container'>
        <h1 className='modal-title'>Profile</h1>
        <div className='review-header'>
          <Avatar sx={{width: 100, height:100}}/>
          <div id='user-info'>
            <Typography><b>USERNAME:</b> {auth.user.username}</Typography>
            <Typography><b>JOINED:</b> {new Date(auth.user.created_at).toLocaleString('en-US', {
              month: 'long', day: 'numeric', year: 'numeric',
            })}</Typography>
            <Typography><b>EMAIL:</b> {auth.user.email}</Typography>
          </div>
        </div>
        <div id='extra-info'>
          <Typography sx={{ml:'10px'}}><b>BIO:</b> {auth.user.bio}</Typography>
          <Divider sx={{mb:1, mt:1}} />
          <div className='stats'>

            <div className='stack-stats'>
              <Typography> {auth.user.owned_recipes.length}</Typography>
              <Typography>Recipes Created</Typography>
            </div>
            <div className='stack-stats'>
              <Typography>{auth.user.owned_communities.length}</Typography>
              <Typography>Communities Created</Typography>
            </div>
          </div>
        </div>

      </div>
    </Modal>
  )
}

export default ProfileModal
