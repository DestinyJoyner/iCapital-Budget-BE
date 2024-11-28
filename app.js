// DEPENDENCIES
const express = require("express")

// CONTROLLERS
const registrationController = require("./controllers/registrationController.js")

const app = express()

// MIDDLEWARE
app.use(express.json())
app.use("/auth/register", registrationController)

// ROUTES
app.get("/", (req,res) => {
    res.status(200).send("iCapital Budget Server")
})

app.get("/not-found", (req, res) => {
    res.status(404).json({
        error: "Page Not Found"
    })
})

app.get("*", (req,res) => {
    res.redirect("/not-found")
})

module.exports = app