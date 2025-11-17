const express=require("express")
const app=express()
const dotenv=require("dotenv").config()
const connectDb=require("./config/connectionDb")
const cors=require("cors")

const PORT=process.env.PORT||3000

connectDb()
app.use(express.json())

app.use(cors({
  origin: "https://food-recipe-app-backend-c1mo.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.use("/",require("./routes/user"))

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/recipe",require("./routes/recipe"))
app.listen(PORT,(err)=>{
    console.log(`App is listning at port ${PORT}`)
})