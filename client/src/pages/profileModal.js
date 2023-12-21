import React, {useState, useEffect} from 'react';
import { Modal, Grid, Avatar, Box, TextField,Typography, Divider, Button, } from '@mui/material';
import { useAuth } from '../auth/authProvider';
import "../styles/profile.css";
import * as yup from 'yup';
import { useFormik } from "formik";
import { useUI } from '../components/UIContext';

const ProfileModal = ({open, handleClose}) => {
  const auth = useAuth()
  const { handleNewAlert, handleAlertType } = useUI();
  const [edit, setEdit] = useState();
  const [updatedInfo, setUpdatedInfo] = useState({
    bio:auth.user.bio,
    username:auth.user.username,
    email:auth.user.email,
  })

  const profileSchema = yup.object().shape({
    username: yup.string().required('Please enter a username'),
    email: yup.string().required('Please enter a valid email'),
    bio: yup.string(),
  })

  const formik = useFormik({
    initialValues: {
      username: updatedInfo.username,
      email: updatedInfo.email,
      bio: updatedInfo.bio,
    },
    validationSchema: profileSchema,
    onSubmit: (values, {resetForm}) => {
      fetch(`/users/${auth.user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(values)
      })
      .then(r => r.json())
      .then((updatedUser) => {
        setUpdatedInfo((old) => ({...old,
          bio:updatedUser.bio,
          username: updatedUser.username,
          email: updatedUser.email,
        }))
        handleNewAlert("User information updated!")
        handleAlertType('success')
        setEdit(false)
        resetForm()
      })
      .catch((err) => {
        handleNewAlert(`${err.error}`)
        handleAlertType('error')
        setEdit(false)
      })
    }
  })


  return (
    <Modal
      id='profile-modal'
      open={open}
      onClose={handleClose}
      >
      <div className='modal-container' >
        <h1 className='modal-title'>Profile</h1>
        <div className='review-header'>
          <Avatar sx={{width: 100, height:100}}/>
          <div id='user-info'>
            {edit ? (
              <Typography fontFamily='Dosis' fontSize='1.2rem'><b>USERNAME:</b> <TextField
                InputProps={{
                  style: { fontSize: '1.1rem', fontFamily: 'Dosis' },
                }}
                InputLabelProps={{
                  style: { fontSize: '1.1rem', fontFamily: 'Dosis' },
                }}
                onChange={formik.handleChange}
                value={formik.values.username}
                name='username'
                fullWidth
                placeholder="Update Username"

              /></Typography>
            ) : (<Typography fontFamily='Dosis' fontSize='1.2rem'><b>USERNAME:</b> {auth.user.username}</Typography>)}
            <Typography fontFamily='Dosis' fontSize='1.2rem'><b>JOINED:</b> {new Date(auth.user.created_at).toLocaleString('en-US', {
              month: 'long', day: 'numeric', year: 'numeric',
            })}</Typography>
            {edit ? (
              <Typography fontFamily='Dosis' fontSize='1.2rem'><b>EMAIL:</b> <TextField
                InputProps={{
                  style: { fontSize: '1.1rem', fontFamily: 'Dosis' },
                }}
                InputLabelProps={{
                  style: { fontSize: '1.1rem', fontFamily: 'Dosis' },
                }}
                onChange={formik.handleChange}
                value={formik.values.email}
                name='email'
                fullWidth
                placeholder="Update Email"

              /></Typography>
            ) : (<Typography fontFamily='Dosis' fontSize='1.2rem'><b>EMAIL:</b> {auth.user.email}</Typography>)}
          </div>
        </div>
        <div id='extra-info'>
          {edit ? (<TextField
            InputProps={{
              style: { fontSize: '1.1rem', fontFamily: 'Dosis' },
            }}
            InputLabelProps={{
              style: { fontSize: '1.1rem', fontFamily: 'Dosis' },
            }}
            onChange={formik.handleChange}
            value={formik.values.bio}
            name='bio'
            fullWidth
            placeholder="Update Bio"
          />) : (
            <Typography fontSize='1.2rem' fontFamily='Dosis' sx={{ml:'10px'}}><b>BIO:</b> {auth.user.bio}</Typography>
          )}
          <Divider sx={{mb:1, mt:1}} />
          <div className='stats'>

            <div className='stack-stats'>
              <Typography fontSize='1.2rem' fontFamily='Dosis'> {auth.user.owned_recipes.length}</Typography>
              <Typography fontSize='1.2rem' fontFamily='Dosis'>Recipes Created</Typography>
            </div>
            <div className='stack-stats'>
              <Typography fontSize='1.2rem' fontFamily='Dosis'>{auth.user.owned_communities.length}</Typography>
              <Typography fontSize='1.2rem' fontFamily='Dosis'>Communities Created</Typography>
            </div>
          </div>
          <div className='profile-buttons'>
            <div className='prof-button'>
              {!edit ? (<Button sx={{ color:'#F6F5F3'}}onClick={() => setEdit(true)}>Edit Profile</Button>
              ) : (
                  <Button sx={{ color: '#F6F5F3' }} type='submit' onClick={formik.handleSubmit}>Update Profile</Button>
              )}
            </div>
            {/* <div className='prof-button'>
              <Button>Update Password</Button>
            </div> */}
          </div>
        </div>

      </div>
    </Modal>
  )
}

export default ProfileModal
