import App from "./App";
import HomePage from "./pages/homePage";
import Authentication from "./pages/authentication";
import Error404 from "./pages/error404";
import Communities from "./pages/communities";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import Recipes from "./pages/recipes";
import addRecipe from "./pages/addRecipe";
import recipeCard from "./pages/recipeCard";
import CommunityPage from "./pages/communityPage";

const routes =[
  {
    path: "/",
    element: <App />,
    errorElement: <Error404 />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/login",
        element: <Authentication />
      },
      {
        path: "users/:id/dashboard",
        element: <Dashboard />
      },
      {
        path: "/users/:id/profile",
        element: <Profile />
      },
      {
        path: "/users/:id/adddrink",
        element: <addRecipe />
      },
      {
        path: "/drinklab",
        element: <Recipes />
      },
      {
        path: "/drinklab/:id",
        element: <recipeCard />
      },
      {
        path: "/communities",
        element: <Communities />,
      },
      {
        path: "/communities/:id",
        element: <CommunityPage />,
      },
    ]
  }
];

export default routes;