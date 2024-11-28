const express = require("express");
const login = express.Router();

const {authorizeUser} = require("../middleware/authorization.js")
const {signInSchema} = require("../middleware/validators/userValidators.js")
const {validationError} = require("../middleware/validators/errorValidator.js")

login.get("/",(req,res) => {
    res.status(200).json("Login Page")
})

// SIGN IN
login.post("/", signInSchema, validationError, authorizeUser, async (req,res) => {
const {user_id, token} = req.body
res.status(200).json({
    message: "Sign In Successful!",
    token: token,
    user_id: user_id
})
})

module.exports = login