import React from 'react';
import { useAuth } from './authProvider';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({children}) => {
  const auth = useAuth()

  if (!auth.user) {
    return <Navigate to='/' />
  }

  return children
}

export default RequireAuth
