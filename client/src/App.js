import React, { useState, useEffect, useCallback } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar";
import AlertBar from "./components/alertbar";
import PubNavbar from './components/pubNavbar';
import Footer from "./components/footer";


const App = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [alertType, setAlertType] = useState("");
  const [user, setUser] = useState(null)

  const updateUser = (user) => setUser(user);

  const handleNewAlert = useCallback((alert) => {
    setAlert(alert);
  }, []);

  const handleAlertType = (type) => setAlertType(type);

  useEffect(() => {
    if (!user) {
      navigate("/");
      fetch("/checksession")
        .then((resp) => {
          if (resp.ok) {
            resp
              .json()
              .then(updateUser)
              .then(navigate(`/users/${user.id}/dashboard`));
          } else {
            resp.json().then((errorObj) => {
              // handleNewAlert(errorObj.error);
              // handleAlertType("error");
              console.log('Not Authorized')
            });
          }
        })
        .catch((err) => {
          handleNewAlert(err.error);
          handleAlertType("error");
        });
    } else {
      navigate(`/users/${user.id}/dashboard`);
    }
  }, [navigate, handleNewAlert, user]);

  const ctx = { user, updateUser, handleNewAlert, handleAlertType };

  const handleDrinkClick = () => {
    navigate("/drinklab")
  }

  return (
    <>
      {!user ? (
        <div id="welcome">
          {alert && (
            <AlertBar
              alert={alert}
              handleNewAlert={handleNewAlert}
              alertType={alertType}
              handleAlertType={handleAlertType}
            />
          )}
          <PubNavbar />
          <h1>Welcome to TEA Culture</h1>
          <h3>Discover and enjoy a variety of drinks</h3>
          <div>
            <button onClick={handleDrinkClick}>Drink Lab</button>
          </div>
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
