import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from '@react-oauth/google';
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import React from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
/* <GoogleOAuthProvider clientId="549250280107-nn1jit4h855pqmdi7fdn443sc7k2fqni.apps.googleusercontent.com">

</GoogleOAuthProvider> */
//!DO NOT WRAP THE ROUTER, WRAP ALL THE RETURN CONTENTS OF APP
