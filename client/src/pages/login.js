import React, { useState } from "react";
import { useFormik } from "formik"
import * as yup from "yup"
import { useAuth } from "../auth/authProvider";
import { Grid, Box, Typography, Button, Fab } from '@mui/material'
import GLogin from "../components/googleLogin";
import { GoogleLogin } from '@react-oauth/google';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;


const Login = () => {
  const [signUp, setSignUp] = useState(false);
  const handleClick = () => setSignUp((signUp) => !signUp);
  const auth = useAuth()

  const onSuccess = (googleUser) => {
    const id_token = googleUser.getAuthResponse().id_token
    auth.onGLogin(id_token)
  }

  const onError = () => {
    console.log("Failed")
  }

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
    <>
      <GoogleLogin
        clientId={clientId}
        buttonText="Google Login"
        onSuccess={onSuccess}
        onError={onError}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    <Box sx={{ flexGrow: 1, ml: 4, mr: 4, mt: 8 }}>
      <Grid sx={{mt: 12}} container spacing={2} justifyContent='center'>
          <Grid xs={12} sx={{ mx: 'auto', textAlign:'center' }} >
            <Fab sx={{mr: 1}} variant='extended' onClick={() => handleClick(true)}>
              Login
            </Fab>
            <Fab sx={{ ml: 1 }} variant='extended' onClick={() => handleClick(false)}>
            Register
            </Fab>
        </Grid>
          <Grid item xs={6} sx={{ mx: 'auto', textAlign: 'center' }}>
          <Typography>
            This is where the form would go
          </Typography>
        </Grid>
      </Grid>
    </Box>
    <div id="account-form">
      <div id='content'>
        <h1>Login/Register</h1>
        <div id="register-switch">
          {signUp ? <button onClick={() => handleClick(true)} >Login</button> : <button id='underline' >Login</button>}
          {signUp ? <button id='underline'  >Register</button> : <button onClick={() => handleClick(false)} >Register</button>}
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div >
            <label htmlFor='email'>Email</label>
            <input id='email' type='text' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.errors.email && formik.touched.email ? <div >{formik.errors.email}</div> : null}
          </div>
          {signUp && (
            <div >
              <label htmlFor='username'>Username</label>
              <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.errors.username && formik.touched.username ? <div >{formik.errors.username}</div> : null}
            </div>
          )}
          <div >
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.errors.password && formik.touched.password ? <div >{formik.errors.password}</div> : null}
          </div>
          <input id='login' type='submit' value={signUp ? 'Sign Up' : 'Log In'} />
        </form>
      </div>
    </div>
    </>
  )
}

export default Login
