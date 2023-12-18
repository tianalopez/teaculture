import React, {useState, useEffect} from 'react';
import { Modal, Grid, Avatar, Box, Typography, TextField, Card, ListItemText, CardContent, ListItemIcon, ListItemButton, Divider, Button, ListItem, } from '@mui/material';
import { useAuth } from '../auth/authProvider';
import "../styles/profile.css";
import * as yup from 'yup';
import { useFormik } from "formik";

const ProfileModal = ({open, handleClose}) => {
  const auth = useAuth()
  const [edit, setEdit] = useState()

  const profileSchema = yup.object().shape({
    username: yup.string().required('Please enter a username'),
    email: yup.string().required('Please enter a valid email'),
    bio: yup.string(),
  })

  const formik = useFormik({
    initialValues: {
      username: auth.user.username,
      email: auth.user.email,
      bio: auth.user.bio,
    },
    validationSchema: profileSchema,
    onSubmit: (values, {resetForm}) => {
      console.log('submitted')
    }
  })


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
          <div className='profile-buttons'>
            <div className='prof-button'>
              <Button onClick={() => setEdit(true)}>Edit Profile</Button>
            </div>
            <div className='prof-button'>
              <Button>Update Password</Button>
            </div>
          </div>
        </div>

      </div>
    </Modal>
  )
}

export default ProfileModal
