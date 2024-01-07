const Joi = require("joi")

const UserSchema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(8).max(30)
})

module.exports = {UserSchema}