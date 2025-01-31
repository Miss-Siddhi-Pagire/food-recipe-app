import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useLoaderData, useNavigate, useParams } from 'react-router-dom'
import './RecipeView.css'
import foodRecipe from '../assets/foodRecipe.jpg'  // Default image

export default function RecipeView() {
  const [recipeData, setRecipeData] = useState({})
  const navigate = useNavigate()
  const { id } = useParams()

  // Get all recipes data (useLoaderData can be useful in certain situations like preloading)
  const allRecipes = useLoaderData()
  console.log(allRecipes)

  const onHandleChange = (e) => {
    console.log(e.target.files)
    let val = (e.target.name === "ingredients") ? e.target.value.split(",") : (e.target.name === "file") ? e.target.files[0] : e.target.value
    setRecipeData(pre => ({ ...pre, [e.target.name]: val }))
  }

  useEffect(() => {
    const getData = async () => {
      await axios.get(`http://localhost:5000/recipe/${id}`)
        .then(response => {
          let res = response.data
          setRecipeData({
            title: res.title || '',
            ingredients: res.ingredients || '',
            instructions: res.instructions || '',
            time: res.time || '',
            coverImage: res.coverImage || ''  // Make sure coverImage is included in the response
          })
        })
    }
    getData()
  }, [id])  // Added dependency array to avoid infinite loop

  return (
    <>
    <div className='recipe-preview-container'>

        <div className='recipe-image'>
            {/* Use recipeData.coverImage for the image URL if it's available */}
            {recipeData.coverImage &&
              <img src={`http://localhost:5000/images/${recipeData.coverImage}`} alt="Recipe Image" />
            }
            {/* Use a fallback image if no coverImage is provided */}
            {!recipeData.coverImage && <img src={foodRecipe} alt="Fallback Recipe Image" />}

            <Link to='/'><p className='back-to-home'>Back To Home</p></Link>
          </div>  




        <div className='recipe-preview'>
            <h2 className='recipe-title'>{recipeData.title}</h2>

              <div className='recipe-details'>
                <p><strong>Time:</strong> {recipeData.time}</p>

                <h3>Ingredients:</h3>
                <p>{recipeData.ingredients}</p>

                <h3>Instructions:</h3>
                <p>{recipeData.instructions}</p>

              </div>
        </div>

        
      </div>

    </>
  )
}
