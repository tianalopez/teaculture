import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/authProvider';
import {useEffect } from "react";
import { loadGoogleApi } from "./googleApi";

//page imports
import Welcome from './pages/welcome';
import Login from './pages/login';
import Recipes from './pages/recipes';
import RecipePage from './pages/recipePage';
import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
import AddRecipe from './pages/addRecipe';
import Communities from './pages/communities';
import CommunityPage from './pages/communityPage';
import Navbar from './components/navbar';
import Error404 from './pages/error404';
import RequireAuth from './auth/requireAuth';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const scope ="";

function App() {

  useEffect(() => {
    loadGoogleApi(clientId, scope)
  }, []);

  return (
  <>
  <AuthProvider>
    <Navbar />
    <Routes>
      <Route path="/" element={<Welcome />}/>
      <Route path="login" element={<Login />} />
      <Route path="drinklab" element={<Recipes />} />
      <Route path="drinklab/:id" element={<RecipePage />} />
      <Route path="users/:id/dashboard" element={<RequireAuth><Dashboard /></RequireAuth> } />
      <Route path="users/:id/profile" element={<RequireAuth><Profile /></RequireAuth>} />
      <Route path="users/:id/adddrink" element={<RequireAuth><AddRecipe /></RequireAuth>} />
      <Route path="communities" element={<RequireAuth><Communities /></RequireAuth>} />
      <Route path="communities/:id" element={<RequireAuth><CommunityPage /></RequireAuth>} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  </AuthProvider>

  </>
  );
}

export default App;
