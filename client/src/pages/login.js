import React, { useState, useEffect } from "react";
import { useFormik } from "formik"
import * as yup from "yup"
import { useAuth } from "../auth/authProvider";
import { Grid, Box, Typography, Button, Fab } from '@mui/material';
import { Textarea, Input } from '@mui/joy';



const Login = () => {
  const [signUp, setSignUp] = useState(false);
  const handleClick = () => setSignUp((signUp) => !signUp);
  const auth = useAuth()


  useEffect(() => {
    window.google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: 'outline', size: 'large'}
    )

  }, [])

  const signUpSchema = yup.object().shape({
    username: yup.string().required("Please enter a username"),
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Please enter a user email"),
    password: yup
      .string()
      .required("Please enter a user password")
      .min(12, "Password is too short - should be 12 characters minimum."),
  });

  const logInSchema = yup.object().shape({
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Please enter a user email"),
    password: yup.string().required("Please enter a password"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: signUp ? signUpSchema : logInSchema,
    onSubmit: (values) => {
      //call the function onAuthenticate you defined inside AuthWrapper
      auth.onAuthenticate(values, signUp)
      //!DO YOU NEED TO NAVIGATE HERE?
      //!you can grab the user using auth context auth.user
    }})
//!NEED TO PASS IN THIS FUNCTION WITH WRAPPER
//!make values a use state

  return (
    <Box sx={{ flexGrow: 1, ml: 1, mr: 3, mt: 2 }} >
      <Grid sx={{ mt: 3, ml: 0, alignItems: 'center',}} container spacing={2} justifyContent='center'>
        <Grid item xs={6} sx={{ backgroundColor: '#deefd0', minHeight: '50rem', display: 'flex', alignItems: 'center', borderRadius: '20px', boxShadow: '0 0 30px #DEEFD0' }}>
            <Grid sx={{ pr: '16px',  }}container spacing={2}>
              <Grid sx={{ pl: 0, display:'flex', flexDirection: 'column', textAlign:'center',justifyContent:'center' }} item xs={12}>
              <Typography fontFamily='Dosis'variant='h3' color='#2B2539'> Welcome Back! </Typography>
              <Typography fontFamily='Dosis' variant='h5' color='#2B2539'>Login or Register to connect with tea and cafe drink enthusiasts!</Typography>
                <img alt='tea bag' src='https://cdn.dribbble.com/users/1613082/screenshots/6307314/tea-01_4x.jpg?resize=1600x1200&vertical=center'></img>
              </Grid>
            </Grid>
          </Grid>
        <Grid item xs={6} sx={{ mx: 'auto', textAlign: 'center', alignItems: 'center', backgroundColor: '#EFC8C8', minHeight: '50rem', display: 'flex', borderRadius: '20px', boxShadow: '0 0 30px #EFC8C8' }} >
            <Grid sx={{justifyContent:'center'}}container spacing={2}>
              <Grid item xs={12} >
                {signUp ?
                  (<Fab sx={{ mr: 1, }} variant='extended' onClick={() => handleClick(true)}>
                    Login
                  </Fab>) :
                  (<Fab sx={{ mr: 1, backgroundColor: '#deefd0' }} variant='extended' onClick={() => handleClick(true)}>
                    Login
                  </Fab>)}
                {signUp ?
                  (<Fab sx={{ ml: 1 ,backgroundColor: '#deefd0'}} variant='extended' onClick={() => handleClick(false)}>
                  Register
                  </Fab>) :
                  (<Fab sx={{ ml: 1,  }} variant='extended' onClick={() => handleClick(false)}>
                    Register
                  </Fab>) }
                  <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3}}>
                      <Typography variant="caption">Email</Typography>
                      <Input
                        placeholder='Input Email'
                        fontFamily='Dosis'
                        type='text'
                        name='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.email && formik.touched.email ? <div >{formik.errors.email}</div> : null}
                    </Grid>
                    {signUp ? (
                      <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                        <Typography variant="caption">Username</Typography>
                        <Input
                          fontFamily='Dosis'
                          placeholder='Input Username'
                          type='text'
                          name='username'
                          value={formik.values.username}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.username && formik.touched.username ? <div >{formik.errors.username}</div> : null}
                      </Grid>

                    ) : (null)}
                    <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                      <Typography variant="caption">Password</Typography>
                      <Input
                        placeholder='Input Password'
                        type='password'
                        name='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.password && formik.touched.password ? <div >{formik.errors.password}</div> : null}
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
                      {signUp ? (
                    <Button type='submit' onClick={formik.handleSubmit} sx={{ backgroundColor: '#deefd0', color:'#2B2539'}}variant='contained'>Sign Up</Button>
                      ) : (
                      <Button type='submit' onClick={formik.handleSubmit} sx={{ backgroundColor: '#deefd0', color:'#2B2539'}}variant='contained'>Log in</Button>
                      )}
                    <Grid id='signInDiv' item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt:10 }}>
                    </Grid>

                    </Grid>
                  </Grid>


              </Grid>
            </Grid>
          </Grid>
      </Grid>
    </Box>
  )
}

export default Login
