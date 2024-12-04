const express = require("express");
const mfa = express.Router()

mfa.get("/", (req,res) => {
    res.send("MFA")
})
module.exports = mfa