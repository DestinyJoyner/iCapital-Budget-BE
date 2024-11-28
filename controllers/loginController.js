const express = require("express");
const login = express.Router();

const {authorizeUser} = require("../middleware/authorization.js")

login.get("/",(req,res) => {
    res.status(200).json("Login Page")
})

// SIGN IN
login.post("/", authorizeUser, async (req,res) => {
const {user_id, token} = req.body
res.status(200).json({
    message: "Sign In Successful!",
    token: token,
    user_id: user_id
})
})

module.exports = login