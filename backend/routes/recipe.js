const express=require("express")
const router=express.Router()
const {getRecipes, getRecipe, addRecipe, editRecipe,recipeView,deleteRecipe,upload}=require("../controller/recipe")
const verifyToken = require("../middleware/auth")

router.get("/",getRecipes) //get all recipie
router.get("/:id",getRecipe)//getRecipe by ID
router.post("/",upload.single('file'),verifyToken,addRecipe)//add recipe
router.put("/:id",upload.single('file'),editRecipe)//update recipe
router.delete("/:id",deleteRecipe)//delete recipe
//router.get("/search",searchR)

module.exports=router

