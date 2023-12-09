import React, {lazy} from 'react';
import { Navigate } from 'react-router-dom';
import Layout from './Layout';
// import Communities from "./pages/communities";
// import Dashboard from "./pages/dashboard";
// import Profile from "./pages/profile";
// import AddRecipe from "./pages/addRecipe";
// import CommunityPage from "./pages/communityPage";
// import RecipePage from './pages/recipePage';
// import Recipes from './pages/recipes';

const Dashboard = lazy(
  () => import ("./pages/dashboard")
)
const Communities = lazy(
  () => import ("./pages/communities")
)
const Profile = lazy(
  () => import ("./pages/profile")
)
const AddRecipe = lazy(
  () => import ("./pages/addRecipe")
)
const CommunityPage = lazy(
  () => import ("./pages/communityPage")
)
const RecipePage = lazy(
  () => import ("./pages/recipePage")
)
const Recipes = lazy(
  () => import ("./pages/recipes")
)



const PrivateRoutes = () => {
  return {
    element: <Layout />,
    children: [
      { path: "/", element: <Dashboard />},
      {path: "/siphub", element: <Communities />},
      {path: "/siphub/:id", element: <CommunityPage />},
      { path: "/users/:id/adddrink", element: <AddRecipe />},
      { path: "/users/:id/profile", element: <Profile />},
      {path: "/drinklab", element: <Recipes />},
      { path: "/drinklab/:id",element: <RecipePage />},
      {path: "*", element: <Navigate to="/" />},
    ]
  }
}

export default PrivateRoutes
