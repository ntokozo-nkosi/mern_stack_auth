require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const {authenticate} = require("./middleware/userAuth")
const cookieParser = require("cookie-parser")
const cors = require("cors")

port = process.env.PORT || 3000

async function connectDB(){
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/mern_app")
        console.log("DB connected")
    } catch (e) {
        console.log("Database Error")
    }
}

connectDB()

const AuthRouter = require("./routes/auth.route")

app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", AuthRouter)

app.get("/", authenticate)

app.listen(port, ()=> {
    console.log("server running on port:", port)
})