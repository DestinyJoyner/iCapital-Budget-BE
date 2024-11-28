// DEPENDENCIES
const express = require("express")

// CONTROLLERS
const registrationController = require("./controllers/registrationController.js")
const loginController = require("./controllers/loginController.js")

// CONFIG
const app = express()

// MIDDLEWARE
app.use(express.json())
app.use("/auth/register", registrationController)
app.use("/auth/login", loginController)

// DATA FILES
const landingPageHTML = require("./data/landingPageStyle.js")

// ROUTES
app.get("/", (req,res) => {
    res.status(200).send(landingPageHTML)
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