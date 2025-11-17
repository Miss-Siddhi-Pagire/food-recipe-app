import React, { useState } from 'react'
import foodRecipe from '../assets/foodRecipe.jpg'
import RecipeItems from '../components/RecipeItems'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import InputForm from '../components/InputForm'
import './Home.css'

export default function Home() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const addRecipe = () => {
    let token = localStorage.getItem("token")
    if (token) {
      navigate("/addRecipe")
    }
    else {
      setIsOpen(true)
    }
  }

  return (
    <>   
     
      <section className='home'>
        
        <div className='left'>
              
          <h1 className='welcome'>Welcome to DishDelight</h1>
          <h5 className='home-para'>
            Your culinary adventure begins here! Discover a world of recipes. Share your own cooking creations with a community of food lovers, and get inspired by others’ flavorful ideas. Whether you're a seasoned chef or just starting out, you'll find something to suit your taste and skill. Join a vibrant network where creativity and flavor come together to make every dish a delight. Explore new recipes, enhance your cooking, and connect with food enthusiasts from around the world. Let’s cook, share, and enjoy together!"
          </h5>

          <button onClick={addRecipe}>Share Your Recipe</button>

        </div>

        <div className='right'>
          <img src={foodRecipe} width="400px" height="300px"></img>
        </div>
      </section>
      

      <div className='bg'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d4f6f8" fillOpacity="1" d="M0,64L80,101.3C160,139,320,213,480,224C640,235,800,181,960,176C1120,171,1280,213,1360,234.7L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
      </div>

      {(isOpen) && <Modal onClose={() => setIsOpen(false)}><InputForm setIsOpen={() => setIsOpen(false)} /></Modal>}

      <div className='recipe'>
        <RecipeItems />
      </div>
      
      


    </>
  )
}
