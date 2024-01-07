const express = require("express")
const router = express.Router()
const {UserSchema} = require("../models/joiSchemas")
const {User} = require("../models/userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

router.post("/signup", async (req, res) => {
    try {
        // Store the formData
        const formData = req.body
        
        // validate the form data and create a new User 
        const {error} = UserSchema.validate(formData)

        if (error) {
            return res.status(500).json({message: error.message.replace(/"/g, ""), success: false})
        }

        // check if user does not already exist (username and email must be unique)
        const existingUserName = await User.findOne({username: formData.username})
        if (existingUserName) {
            return res.status(500).json({message: "Username exists", success: false})
        }

        const existingEmail = await User.findOne({email: formData.email})
        if (existingEmail) {
            return res.status(500).json({message: "Email already exists", success: false})
        }

        await User.create(formData)
         
        // send a response 
        return res.json({message: "registered succesfully", success: true})

    } catch (e) {
        console.log(e)
    }
})

router.post("/login", async (req, res) => {
    try {
        // Store the formData
        const {username, password} = req.body 

        // check if the user exists 
        const user = await User.findOne({username: username})
        if (!user) {
            return res.status(401).json({message: "Invalid Username or Password", success: false}) 
        }

        // check if given password matches the stored password
        const result = await bcrypt.compare(password, user.password)
        if (!result) {
            return res.status(401).json({message: "Invalid Username or Password", success: false}) 
        }

        // generate a json web token
        const token = await jwt.sign({_id: user._id}, "secretkey", {expiresIn: "45m"})

        // send a response 
        res.cookie("access_token",token, {httpOnly: true})
        return res.json({success: true, token:token})

    } catch (e) {
        console.log(e)
    }
})

module.exports = router