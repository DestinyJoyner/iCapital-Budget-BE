const express = require("express");
const verification = express.Router();
const {verifyUser} = require("../queries/verification.js")
const {generateJWT} = require("../middleware/authorization.js")


// route for frontend to ping from verification email to wait for response for verification
verification.post("/", async (req, res) => {
    const {email, verification_token} = req.body
    try {
        const user = await verifyUser(email, verification_token)
        if(!user){
            res.status(400).json({
                error: "Invalid verification token or email"
            })
        }else {
            const {email, id, is_verified} = user

            const token = generateJWT(email, id)

            res.status(200).json({
                message: "Email verified",
                is_verified: is_verified,
                token: token,
                user : {
                    email: email,
                    id: id
                }
            })
        }
    } catch(err) {
        res.status(500).json({
            message:"Error verifying email",
            error: err
        })
    }
    
    res.status(200).json("verify")
})


module.exports = verification