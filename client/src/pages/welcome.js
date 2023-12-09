import React, { useState, useEffect, useCallback } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import PubNavbar from '../components/pubNavbar';
import Footer from '../components/footer';



const Welcome = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [alertType, setAlertType] = useState("");
  const [user, setUser] = useState(null)
  console.log('app is mounting')
  const updateUser = (user) => setUser(user);

  const handleNewAlert = useCallback((alert) => {
    setAlert(alert);
  }, []);

  const handleAlertType = (type) => setAlertType(type);

  //extracts the value of a cookie by name
  //splits the cookie string into an array using the provided name
  //extracts and returns the value of the cookie if found
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  useEffect(() => {
    if (!user) {
      // navigate("/");
      fetch("/current-user")
        .then((resp) => {
          if (resp.ok) {
            console.log('current user response was okay')
            resp
              .json()
              .then((updatedUser => {
                updateUser(updatedUser)
                navigate(`/`)
              }))
              // .then(navigate(`/users/${user.id}/dashboard`));
          } else if (resp.status === 401) {
            console.log('current user resonse was not okay')
            fetch("/refresh", {
              method: "POST",
              headers: {
                'X-CSRF-TOKEN': getCookie('csrf_refresh_token'),
              }
            })
            .then(resp => {
              if (resp.ok) {
                console.log('refresh was okay')
                resp
                  .json()
                  .then(updateUser)
                  .then(navigate(`/`))
              } else {
                console.log('refresh not okay')
                resp
                  .json()
                  .then(console.log('Not Authorized'))
              }
            })
          }
        })
        .catch((err) => {
          handleNewAlert(err.error);
          handleAlertType("error");
        });
    } else {
      console.log('there is a user')
      navigate(`/`);
    }
    console.log('useeffect triggered')
  }, [navigate, handleNewAlert, user]);



  const handleDrinkClick = () => {
    navigate("/drinklab")
  }

  return (
    <>
      <PubNavbar />
      <h1>Welcome to TEA Culture</h1>
      <h3>Discover and enjoy a variety of drinks</h3>
      <div>
        <button onClick={handleDrinkClick}>Drink Lab</button>
      </div>
      <Footer />
    </>
  );

};

export default Welcome
