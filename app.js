// DEPENDENCIES
const express = require("express")
require("dotenv").config()

// CONTROLLERS
const registrationController = require("./controllers/registrationController.js")
const loginController = require("./controllers/loginController.js")
const budgetController = require("./controllers/budgetController.js")
const userController = require("./controllers/userController.js")

// CONFIG
const app = express()
// const mailerConfig = require("./config/mailerConfig")
const transporter = require('./config/mailerConfig');

// mailerConfig(app)
// MIDDLEWARE
app.use(express.json())
app.use("/auth/register", registrationController)
app.use("/auth/login", loginController)
app.use("/auth/budget", budgetController)
app.use("/auth/user", userController)

// DATA FILES
const landingPageHTML = require("./data/landingPageStyle.js")

// ROUTES
app.get("/", (req,res) => {
    res.status(200).send(landingPageHTML)
})


// app.get("/test-email", async (req, res) => {
//     try {
//         app.mailer.send('emails/test', {
//             to: process.env.EMAIL_USER, // sending to yourself for testing
//             subject: 'Test Email'
//         }, (err) => {
//             if (err) {
//                 console.log(err);
//                 return res.status(500).json({ error: "Error sending email" });
//             }
//             res.status(200).json({ message: "Test email sent!" });
//         });
//     } catch (err) {
//         res.status(500).json({ error: "Server error" });
//     }
// });
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
        console.log(err);
        res.status(500).json({ error: "Error sending email" });
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