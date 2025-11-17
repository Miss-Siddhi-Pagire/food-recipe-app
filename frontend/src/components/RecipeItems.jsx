import React, { useEffect, useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { BsFillStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { GiCampCookingPot } from "react-icons/gi";
import './RecipeItems.css'
import './SearchBar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


export default function RecipeItems() {
  const recipes = useLoaderData()
  const [allRecipes, setAllRecipes] = useState(recipes) // Initial recipes state
  const [searchQuery, setSearchQuery] = useState('') // Search input state
  let path = window.location.pathname === "/myRecipe" ? true : false
  let favItems = JSON.parse(localStorage.getItem("fav")) ?? []
  const [isFavRecipe, setIsFavRecipe] = useState(false)

  useEffect(() => {
    setAllRecipes(recipes)
  }, [recipes])

  // Filter recipes based on search query
  const filteredRecipes = allRecipes.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const onDelete = async (id) => {
    await axios.delete(`http://localhost:5000/recipe/${id}`)
      .then((res) => console.log(res))
    setAllRecipes(recipes => recipes.filter(recipe => recipe._id !== id))
    let filterItem = favItems.filter(recipe => recipe._id !== id)
    localStorage.setItem("fav", JSON.stringify(filterItem))
  }

  const favRecipe = (item) => {
    let filterItem = favItems.filter(recipe => recipe._id !== item._id)
    favItems = favItems.filter(recipe => recipe._id === item._id).length === 0 ? [...favItems, item] : filterItem
    localStorage.setItem("fav", JSON.stringify(favItems))
    setIsFavRecipe(prev => !prev)
  }

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }
  
  return (
    <>
      <h2 className='flavorful-fest'>Flavorful Feast...<GiCampCookingPot /></h2><br />

      {/* Search Bar */}
      <form className="search-container">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />

        <input
          type="text"
          className="search-input"
          placeholder="Search for a recipe..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
              </form>

      
      <div className='card-container'>
        {
          filteredRecipes?.map((item, index) => (
            <div key={index} className='card'>
              <img src={`http://localhost:5000/images/${item.coverImage}`} width="120px" height="100px" alt="Recipe" />
              <div className='card-body'>
                <div className='title'>{item.title}</div>
                <div className='icons'>
                  <div className="timer"><BsFillStopwatchFill />{item.time}</div>
                  {
                    (!path) ?
                      <FaHeart onClick={() => favRecipe(item)} style={{ color: (favItems.some(res => res._id === item._id)) ? "red" : "" }} /> :
                      <div className='action'>
                        <Link to={`/editRecipe/${item._id}`} className="editIcon"><FaEdit /></Link>
                        <MdDelete onClick={() => onDelete(item._id)} className='deleteIcon' />
                      </div>
                  }
                </div>

                <div>
                  <Link to={`/recipeView/${item._id}`}><button className='explore'><span className='explore-name'>Read</span></button></Link>
                </div>

              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}


