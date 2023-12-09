import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
// import routes from "./routes";
import App from "./App";
import "./styles/index.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
/* <GoogleOAuthProvider clientId="549250280107-nn1jit4h855pqmdi7fdn443sc7k2fqni.apps.googleusercontent.com">

</GoogleOAuthProvider> */
//!DO NOT WRAP THE ROUTER, WRAP ALL THE RETURN CONTENTS OF APP
