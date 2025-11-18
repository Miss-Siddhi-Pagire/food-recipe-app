import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import MainNavigation from './components/MainNavigation'
import axios from 'axios'
import AddFoodRecipe from './pages/AddFoodRecipe'
import EditRecipe from './pages/EditRecipe'
import RecipeItems from './components/RecipeItems'
import RecipeView from './pages/RecipeView'

// ✅ Fallback API (Fixes Network Error)
const API = import.meta.env.VITE_API_URL || "https://food-recipe-app-backend-c1mo.onrender.com";

// ⭐ Safe API getter
const safeGet = async (url) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.error("API ERROR:", err);
    return [];         // Prevents route loader crash
  }
};

// ⭐ Loaders
const getAllRecipes = async () => {
  return await safeGet(`${API}/recipe`);
};

const getMyRecipes = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return [];
  const all = await getAllRecipes();
  return all.filter(r => r.createdBy === user._id);
};

const getFavRecipes = () => {
  return JSON.parse(localStorage.getItem("fav")) || [];
};

// ⭐ Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    children: [
      { path: "/", element: <Home />, loader: getAllRecipes },
      { path: "/myRecipe", element: <Home />, loader: getMyRecipes },
      { path: "/favRecipe", element: <Home />, loader: getFavRecipes },
      { path: "/addRecipe", element: <AddFoodRecipe /> },
      { path: "/editRecipe/:id", element: <EditRecipe /> },
      { path: "/allRecipes", element: <RecipeItems />, loader: getAllRecipes },
      { path: "/recipeView/:id", element: <RecipeView /> },
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />
}
