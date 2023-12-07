import React, { useState, useEffect, useCallback } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar";
import AlertBar from "./components/alertbar";
import HomePage from "./pages/homePage";
import Authentication from "./pages/authentication";
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

  return (
    <div>App</div>
  )
}

export default App
