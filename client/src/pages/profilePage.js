import React, {useState} from 'react';
import { Modal, Grid, Avatar, Box, TextField, Typography, Divider, Button, } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from "formik";
import { useUI } from '../components/UIContext';
import { useAuth } from '../auth/authProvider';

const ProfilePage = () => {
  const auth = useAuth()
  const { handleNewAlert, handleAlertType } = useUI();
  const [edit, setEdit] = useState();
  const [updatedInfo, setUpdatedInfo] = useState({
    bio: auth.user.bio,
    username: auth.user.username,
    email: auth.user.email,
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
    onSubmit: (values, { resetForm }) => {
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
          setUpdatedInfo((old) => ({
            ...old,
            bio: updatedUser.bio,
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
    <Box sx={{ flexGrow: 1, ml: 0, mr: 4, mt: 4, mb: 8 }} >
      <Grid sx={{ mt: 3, ml: 0, alignItems: 'center', }} container spacing={2} justifyContent='center'>
        <Grid item xs={6} sx={{ mx: 'auto', textAlign: 'left', alignItems: 'left', minHeight: '50rem', display: 'flex'}} >
          <Grid sx={{ justifyContent: 'top' }} container spacing={2}>
            <Grid item xs={12} >
              <Grid container spacing={2}>
                <Grid sx={{ pl: '16px' }} item xs={12}>
                  <Typography fontFamily='Dosis' variant='h3'>Profile</Typography>
                </Grid>
                <Grid sx={{ background: '#F6F5F3', borderRadius: '20px', mt: '32px',mr: '32px', ml: '32px' }} item xs={12}>
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
                      <Typography fontSize='1.2rem' fontFamily='Dosis' sx={{ ml: '10px' }}><b>BIO:</b> {auth.user.bio}</Typography>
                    )}
                    <Divider sx={{ mb: 1, mt: 1 }} />
                    <div className='stats'>

                      <div className='stack-stats'>
                        <Typography fontSize='1.2rem' fontFamily='Dosis'> {auth.user.owned_recipes.length}</Typography>
                        <Typography fontSize='1.2rem' fontFamily='Dosis'>Recipes Created</Typography>
                      </div>
                      <div className='stack-stats'>
                        <Typography fontSize='1.2rem' fontFamily='Dosis'>{auth.user.owned_communities.length}</Typography>
                        <Typography fontSize='1.2rem' fontFamily='Dosis'>Communities Created</Typography>
                      </div>
                      <div className='profile-buttons'>
                        <div className='prof-button'>
                          {!edit ? (<Button sx={{ color: '#F6F5F3' }} onClick={() => setEdit(true)}>Edit Profile</Button>
                          ) : (
                            <Button sx={{ color: '#F6F5F3' }} type='submit' onClick={formik.handleSubmit}>Update Profile</Button>
                          )}
                        </div>
                        <div className='prof-button'>
                <Button>Update Password</Button>
              </div>
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} sx={{ backgroundColor: '#deefd0', minHeight: '50rem', display: 'flex', alignItems: 'center', borderRadius: '20px',}}>
          <Grid sx={{ pr: '16px', }} container spacing={2}>
            <Grid sx={{ pl: 0, display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center' }} item xs={12}>
              <img alt='brewing tea' src='/images/coffee.png'></img>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProfilePage
