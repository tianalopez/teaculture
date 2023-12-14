
import React, { createContext, useContext, useState, useCallback } from 'react';

const UIContext = createContext(null);

export const UIProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);
  const [alertType, setAlertType] = useState("");

  const handleNewAlert = useCallback((alert) => {
    setAlert(alert);
  }, []);

  const handleAlertType = (type) => setAlertType(type);

  return (
    <UIContext.Provider value={{ alert, alertType, handleNewAlert, handleAlertType }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  return useContext(UIContext);
};
