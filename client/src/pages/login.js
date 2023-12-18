import React, { useState, useEffect } from "react";
import { useFormik } from "formik"
import * as yup from "yup"
import { useAuth } from "../auth/authProvider";
import { Grid, Box, Typography, Button, Fab } from '@mui/material';



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
    <>
    <Box sx={{ flexGrow: 1, ml: 1, mr: 3, mt: 8 , }} >
      <Grid sx={{mt: 12, ml:0}} container spacing={2} justifyContent='center'>
          <Grid item xs={6} sx={{ backgroundColor:'#deefd0'}}>
            <Grid sx={{ pr: '16px' }}container spacing={2}>
              <Grid sx={{ pl: 0, display:'flex', flexDirection: 'column', textAlign:'center',justifyContent:'center' }} item xs={12}>
                <Typography variant='h3'> Welcome Back! </Typography>
                <Typography variant='h5'>Login or Register to connect with tea and cafe drink enthusiasts!</Typography>
                <img alt='tea' src='https://cdn.dribbble.com/users/1613082/screenshots/6307314/tea-01_4x.jpg?resize=1600x1200&vertical=center'></img>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sx={{ mx: 'auto', textAlign: 'center', backgroundColor:'#EFC8C8' }} >
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
                <form>

                </form>
              </Grid>
            </Grid>
          </Grid>
      </Grid>
    </Box>
    <div id='signInDiv'></div>
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
