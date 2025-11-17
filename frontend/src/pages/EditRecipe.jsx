import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditRecipe() {
    const [recipeData, setRecipeData] = useState({
        title: '',
        ingredients: '',
        instructions: '',
        time: ''
    }); // Initialized with default values
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        const getData = async () => {
            await axios.get(`https://food-recipe-app-backend-c1mo.onrender.com/recipe/${id}`)
                .then(response => {
                    let res = response.data
                    setRecipeData({
                        title: res.title || '',
                        ingredients: res.ingredients || '',
                        instructions: res.instructions || '',
                        time: res.time || ''
                    })
                })
        }
        getData()
    }, [id])  // Added dependency array to avoid infinite loop

    const onHandleChange = (e) => {
        console.log(e.target.files)
        let val = (e.target.name === "ingredients") ? e.target.value.split(",") : 
                  (e.target.name === "file") ? e.target.files[0] : e.target.value
        setRecipeData(prev => ({ ...prev, [e.target.name]: val }))
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault()
        console.log(recipeData)
        await axios.put(`https://food-recipe-app-backend-c1mo.onrender.com/recipe/${id}`, recipeData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorization': 'bearer ' + localStorage.getItem("token")
            }
        })
        .then(() => navigate("/myRecipe"))
    }

    return (
        <>
            <div className='container'>
                <form className='form' onSubmit={onHandleSubmit}>
                    <div className='form-control'>
                        <label>Title</label>
                        <input 
                            type='text' 
                            className='input' 
                            name='title' 
                            onChange={onHandleChange} 
                            value={recipeData.title} 
                            required 
                        />
                    </div>

                    <div className='form-control'>
                        <label>Time</label>
                        <input 
                            type='text' 
                            className='input' 
                            name='time' 
                            onChange={onHandleChange} 
                            value={recipeData.time} 
                            required 
                        />
                    </div>

                    <div className='form-control'>
                        <label>Ingredients</label>
                        <textarea 
                            className='input-textarea' 
                            name='ingredients' 
                            rows="5" 
                            onChange={onHandleChange} 
                            value={recipeData.ingredients} 
                            required 
                        />
                    </div>

                    <div className='form-control'>
                        <label>Instructions</label>
                        <textarea 
                            className='input-textarea' 
                            name='instructions' 
                            onChange={onHandleChange} 
                            value={recipeData.instructions} 
                            required 
                        />
                    </div>

                    <div className='form-control'>
                        <label>Recipe Image</label>
                        <input 
                            type='file' 
                            className='input' 
                            name='file' 
                            onChange={onHandleChange} 
                          // value={recipeData.file}
                        />
                    </div>

                    <button type='submit'>Edit Recipe</button>
                </form>
            </div>
        </>
    )
}
