const jwt = require("jsonwebtoken")
const {User} = require("../models/userSchema")

const authenticate = async (req,res,next) => {
    try {
        // get token
        const token = req.cookies.access_token
        if (!token) {
            return res.status(401).json({message: "unauthorised", success: false})
        }

        jwt.verify(token, "secretkey", async (err, user) => {
            if (err) {
                return res.json({message: "unauthorised", success: false})
            }

            user = await User.findById(user._id, {username:1})

            return res.json({user: user.username, message: "Authorised", success: true})
        })

        // verify token
    } catch (e) {
        console.log(e)
        return res.status(500).json({message: "Server error", success: false})
    }
    
}

module.exports = {authenticate}