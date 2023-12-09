import React, { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import PrivateRoutes from "./privateRoutes";
import PublicRoutes from "./publicRoutes";
import { checkAuth } from "./components/checkAuth";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "./authcontext";


const App = () => {
  const {authenticated } = useAuth
  // const [routeStatus, setRouteStatus] = useState(false)

  // const getAccessToken = () => {
  //   return Cookies.get('access_token_cookie');
  // };

  // const getRefreshToken = () => {
  //   return Cookies.get('refresh_token_cookie');
  // };

  // const getCookie = (name) => {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) return parts.pop().split(';').shift();
  // }

  // useEffect(() => {
  //   if (!checkAuth()) {
  //     fetch("/current-user")
  //       .then((resp) => {
  //         if (resp.ok) {
  //           resp
  //             .json()
  //             .then(() => setRouteStatus(true))
  //         } else if (resp.status === 401) {
  //           fetch("/refresh", {
  //             method: "POST",
  //             headers: {
  //               'X-CSRF-TOKEN': getCookie('csrf_refresh_token'),
  //             }
  //           })
  //             .then(resp => {
  //               if (resp.ok) {
  //                 resp
  //                   .json()
  //                   .then(() => setRouteStatus(true))
  //               } else {
  //                 resp
  //                   .json()
  //                   .then(console.log('Not Authorized'))
  //               }
  //             })
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   } else {
  //     setRouteStatus(true)
  //   }
  // }, [getAccessToken(), getRefreshToken()]);


  const router = createBrowserRouter([
    authenticated ? PrivateRoutes() : {},
    ...PublicRoutes()

  ]);

  return ( <RouterProvider router={router} />);

};

export default App
