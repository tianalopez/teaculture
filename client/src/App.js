import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/authProvider';
import { UIProvider } from './components/UIContext';
import {useEffect } from "react";
import AlertBar from './components/alertbar';
import Footer from './components/footer';


//page imports
// import Welcome from './pages/welcome';
import Login from './pages/login';
import Recipes from './pages/recipes';
import RecipePage from './pages/recipePage';
import Dashboard from './pages/dashboard';
import ProfilePage from './pages/profilePage';
import AddRecipe from './pages/addRecipe';
import Communities from './pages/communities';
import CommunityPage from './pages/communityPage';
import Navbar from './components/navbar';
import Error404 from './pages/error404';
import RequireAuth from './auth/requireAuth';

//! UI above auth
function App() {

  return (
  <>
  <UIProvider>
    <AuthProvider>
      <Navbar />
      <AlertBar />
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="login" element={<Login />} />
        <Route path="drinklab" element={<Recipes />} />
        <Route path="drinklab/:id" element={<RecipePage />} />
        <Route path="users/:id/dashboard" element={<RequireAuth><Dashboard /></RequireAuth> } />
        <Route path="users/:id/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
        <Route path="users/:id/addrecipe" element={<RequireAuth><AddRecipe /></RequireAuth>} />
        <Route path="siphub" element={<RequireAuth><Communities /></RequireAuth>} />
        <Route path="siphub/:id" element={<RequireAuth><CommunityPage /></RequireAuth>} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </AuthProvider>
  </UIProvider>

  </>
  );
}

export default App;
