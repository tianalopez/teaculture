import React from 'react';
import { Navigate } from "react-router-dom";
import Authentication from './pages/authentication';
import Recipes from './pages/recipes';
import RecipePage from './pages/recipePage';
import Welcome from './pages/welcome';


const PublicRoutes = () => {
  return [
      { path: "/welcome", element: <Welcome />},
      { path: "/login", element: <Authentication />},
      {path: "/drinklab", element: <Recipes />},
      {path: "/drinklab/:id", element: <RecipePage />},
      {path: "*", element: <Navigate to="/welcome" />},
  ]
}

export default PublicRoutes
