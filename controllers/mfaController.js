const express = require("express");
const mfa = express.Router()
const {generatePasscode, verifyPasscode, authorizeUser} = require("../middleware/authorization.js")
const {storePasscode} = require("../queries/mfa.js")
const {sendEmail, emailTemplate} = require("../config/mailerConfig.js")

// /auth/mfa/login
mfa.post("/login", authorizeUser, async (req,res) => {
   try {
     // from authorize user
     const {user_id} = req.body
     const {email} = req.body.login
    

     // speakeasy - generate secret, store in table for user
     const userPasscode = generatePasscode()
     const storedUserPasscode = await storePasscode(user_id, userPasscode)
 
     // send email
     const emailBody = await emailTemplate("passcode", {passcode:userPasscode})
 
     const emailSend = await sendEmail ({receipient: email, emailBody: emailBody, subject:"iCapital Login Passcode"})
 
     res.status(200).json({
         message: "Passcode email sent",
     })
 
   }catch(err){
    res.status(500).json({
        message: "error sending passcode",
        error: err
    })
   }


})
module.exports = mfa