const express = require("express");
const mfa = express.Router()
const {generatePasscode} = require("../middleware/authorization.js")
const {storePasscode} = require("../queries/mfa.js")

const ejs = require("ejs");
const path = require("path");
const transporter = require("../config/mailerConfig.js");
require("dotenv").config();

mfa.get("/", async (req,res) => {
    // use user id!!
    const {userId} = req.body

    // speakeasy - generate secret, store in table for user
    const userPasscode = generatePasscode()
    const storedUserPasscode = await storePasscode(userId, userPasscode)

})
module.exports = mfa