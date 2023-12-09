import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check for the existence of relevant cookies
    const accessCookie = Cookies.get('access_token_cookie');
    const refreshCookie = Cookies.get('refresh_token_cookie');

    // Update authentication status based on cookie presence
    setAuthenticated(!!accessCookie && !!refreshCookie);
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
