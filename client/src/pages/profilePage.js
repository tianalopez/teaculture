import React, {useState} from 'react';
import { Grid, Box, Typography, Button, Fab } from '@mui/material';
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
                  <Typography fontFamily='Dosis' fontSize='1.2rem'>Username</Typography>

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
