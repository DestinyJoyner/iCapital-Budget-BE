// DEPENDENCIES
const express = require("express")
const cors = require("cors");

// CONTROLLERS
const registrationController = require("./controllers/registrationController.js")
const loginController = require("./controllers/loginController.js")
const budgetController = require("./controllers/budgetController.js")
const userController = require("./controllers/userController.js")
const verificationController = require("./controllers/verificationController.js")
const tokenController = require("./controllers/tokenController.js")

// CONFIG
const app = express()
const transporter = require('./config/mailerConfig');
require("dotenv").config()

// MIDDLEWARE
app.use(express.json())
app.use(cors());
app.use("/auth/register", registrationController)
app.use("/auth/login", loginController)
app.use("/auth/budget", budgetController)
app.use("/auth/user", userController)
app.use("/auth/verification", verificationController)
app.use("/auth/token", tokenController)

// DATA FILES
const landingPageHTML = require("./data/landingPageStyle.js")

// ROUTES
app.get("/", (req,res) => {
    res.status(200).send(landingPageHTML)
})

// NODEMAILER EMAIL TEST ROUTE
app.get("/test-email", async (req, res) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'Test Email',
            html: '<h1>Test Email</h1><p>If you see this, email is working!</p>'
        });
        
        res.status(200).json({ message: "Test email sent!" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});


app.get("/not-found", (req, res) => {
    res.status(404).json({
        error: "Page Not Found"
    })
})

app.get("*", (req,res) => {
    res.redirect("/not-found")
})

module.exports = app