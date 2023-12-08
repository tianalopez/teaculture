import React, { useState, useEffect, useCallback } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar";
import AlertBar from "./components/alertbar";
import PubNavbar from './components/pubNavbar';
import Footer from "./components/footer";
import Authentication from './pages/authentication';


const App = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [alertType, setAlertType] = useState("");
  const [user, setUser] = useState(null)
  console.log('navigate back home')
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
                navigate(`/users/${updatedUser.id}/dashboard`)
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
                  .then(navigate(`/users/${user.id}/dashboard`))
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
      navigate(`/users/${user.id}/dashboard`);
    }
    console.log('useeffect triggered')
  }, [navigate, handleNewAlert, user]);

  const ctx = { user, updateUser, handleNewAlert, handleAlertType };

  const handleDrinkClick = () => {
    navigate("/drinklab")
  }

  return (
    <>
      {!user ? (

        <div id="welcome">
          {/* {alert && (
            <AlertBar
            alert={alert}
            handleNewAlert={handleNewAlert}
            alertType={alertType}
            handleAlertType={handleAlertType}
            />
          )} */}
          <PubNavbar />
          <h1>Welcome to TEA Culture</h1>
          <h3>Discover and enjoy a variety of drinks</h3>
          <div>
            <button onClick={handleDrinkClick}>Drink Lab</button>
          </div>
          <Authentication updateUser={updateUser}/>
          <Footer />
        </div>
      ) : (
        <div className="app">
          {alert && (
            <AlertBar
              alert={alert}
              handleNewAlert={handleNewAlert}
              alertType={alertType}
              handleAlertType={handleAlertType}
            />
          )}
          <Navbar
            user={user}
            updateUser={updateUser}
            handleNewAlert={handleNewAlert}
          />
          <div className="outlet">
            <Outlet context={ctx} />
          </div>
          <Footer />
        </div>
      )}
    </>
  );

};

export default App
