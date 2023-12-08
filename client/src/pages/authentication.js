import React, { useState } from "react";
import { useFormik } from "formik"
import * as yup from "yup"

function Authentication({ updateUser, handleNewAlert, handleAlertType }) {

  const [signUp, setSignUp] = useState(false);

  const handleClick = () => setSignUp((signUp) => !signUp);

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

  const url = signUp ? "/register" : "/login";

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: signUp ? signUpSchema : logInSchema,
    onSubmit: (values) => {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((resp) => {
          console.log(resp)
          if (resp.ok) {
            console.log("The issue is after a good response")
            resp.json().then(updateUser);
            // handleNewAlert("Welcome!");
            // handleAlertType("success");
          } else {
            resp.json().then((errorObj) => {
              console.log("There was a bad response")
              // handleNewAlert(errorObj.error);
              // handleAlertType("error");
            });
          }
        })
        .catch((err) => {
          // handleNewAlert(err.error);
          // handleAlertType("error");
        });
    },
  });
  return (
    <div id="account-form">
      <div id='content'>
        <h1>Welcome to Virtual Planner</h1>
        <div id="register-switch">
          {signUp ? <button onClick={() => handleClick(true)} >Login</button> : <button id='underline' >Login</button>}
          {signUp ? <button id='underline'  >Register</button> : <button onClick={() => handleClick(false)} >Register</button>}
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div >
            <label htmlFor='email'>Email</label>
            <input  id='email' type='text' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.errors.email && formik.touched.email ? <div >{formik.errors.email}</div> : null}
          </div>
          {signUp && (
            <div >
              <label htmlFor='username'>Username</label>
              <input  type='text' name='username' value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.errors.username && formik.touched.username ? <div >{formik.errors.username}</div> : null}
            </div>
          )}
          <div >
            <label htmlFor='password'>Password</label>
            <input  type='password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.errors.password && formik.touched.password ? <div >{formik.errors.password}</div> : null}
          </div>
          <input id='login' type='submit' value={signUp ? 'Sign Up' : 'Log In'} />
        </form>
      </div>
    </div>
  )
}

export default Authentication;
