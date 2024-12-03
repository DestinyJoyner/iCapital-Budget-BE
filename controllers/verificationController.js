const express = require("express");
const verification = express.Router();
const {verifyUser} = require("../queries/verification.js")
const {generateJWT} = require("../middleware/authorization.js")
const {verificationSchema} = require("../middleware/validators/verificationValidator.js")
const {validationError} = require("../middleware/validators/errorValidator.js")


// route for frontend to ping from verification email to wait for response for verification
verification.post("/", verificationSchema, validationError, async (req, res) => {
    const {email, verification_token} = req.body
    console.log(req.body, "verification from fe")
    try {
        const user = await verifyUser(email, verification_token)
        console.log(user, "verifyd")
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
})


module.exports = verification