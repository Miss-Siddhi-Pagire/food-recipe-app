import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useLoaderData, useParams } from 'react-router-dom'
import './RecipeView.css'
import foodRecipe from '../assets/foodRecipe.jpg'

const API = "https://food-recipe-app-backend-c1mo.onrender.com";

export default function RecipeView() {
  const [recipeData, setRecipeData] = useState({});
  const { id } = useParams();

  const allRecipes = useLoaderData();
  console.log(allRecipes);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${API}/recipe/${id}`);
        const res = response.data;

        setRecipeData({
          title: res.title || "",
          ingredients: res.ingredients || "",
          instructions: res.instructions || "",
          time: res.time || "",
          coverImage: res.coverImage || ""
        });
      } catch (error) {
        console.log("Error fetching recipe:", error);
      }
    };

    getData();
  }, [id]);

  return (
    <div className="recipe-preview-container">

      <div className="recipe-image">

        {recipeData.coverImage ? (
          <img
            src={`${API}/images/${recipeData.coverImage}`}
            alt="Recipe"
          />
        ) : (
          <img src={foodRecipe} alt="Default Recipe" />
        )}

        <Link to="/">
          <p className="back-to-home">Back To Home</p>
        </Link>
      </div>

      <div className="recipe-preview">
        <h2 className="recipe-title">{recipeData.title}</h2>

        <div className="recipe-details">
          <p><strong>Time:</strong> {recipeData.time}</p>

          <h3>Ingredients:</h3>
          <p>{recipeData.ingredients}</p>

          <h3>Instructions:</h3>
          <p>{recipeData.instructions}</p>
        </div>
      </div>
    </div>
  );
}
