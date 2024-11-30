const express = require("express");
const tokenVerification = express.Router();
const {authenticateToken} = require("../middleware/authorization.js")


tokenVerification.get("/", authenticateToken, async (req, res) => {
    const {email} = req.user
    if(email){
        res.status(200).json(email)
    }
    else {
        res.status(400).json({
            error: "Token authentication Failed"
        })
    }
})

module.exports = tokenVerification