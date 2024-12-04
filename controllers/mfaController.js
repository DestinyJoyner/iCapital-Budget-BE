const express = require("express");
const mfa = express.Router()
const {generatePasscode, verifyPasscode, authorizeUser} = require("../middleware/authorization.js")
const {storePasscode} = require("../queries/mfa.js")

mfa.get("/", async (req,res) => {
    // verified form login in front end
    const {user_id} = req.body

    // speakeasy - generate secret, store in table for user
    const userPasscode = generatePasscode()
    const storedUserPasscode = await storePasscode(user_id, userPasscode)

})
module.exports = mfa