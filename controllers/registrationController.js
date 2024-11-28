const express = require("express")
const registration = express.Router()


registration.get("/", (req,res) => {
    res.status(200).json(
        "Registration Page"
    )
})


module.exports = registration