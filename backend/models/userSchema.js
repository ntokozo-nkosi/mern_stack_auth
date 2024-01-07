const mongoose = require("mongoose")
const bcrypt =require("bcrypt")

// User Schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
})

userSchema.pre("save", async function() {
    this.password = await bcrypt.hash(this.password, 10)
})

// User model
const User = mongoose.model("User", userSchema)

module.exports = {User}