const express = require("express");
const login = express.Router();
const {verifyPasscode} = require("../queries/mfa.js")
const {generateJWT} = require("../middleware/authorization.js")
const {getUserInfo} = require("../queries/users.js")

// login.get("/",(req,res) => {
//     res.status(200).json("Login Page")
// })

// SIGN IN
login.post("/",  async (req,res) => {
try{
    const {user_id, passcode} = req.body

// verify passcode
const isValid = await verifyPasscode(user_id, passcode)

if(isValid){
    const userInfo = await getUserInfo(user_id)
    const {email, id} = userInfo
    // generate authToken
    const token = generateJWT(email, id )
    res.status(200).json({
        message: "login success",
        token: token,
        email: email,
        user_id: id
    })

}else {
    res.status(400).json({
        error: "Invalid passcode"
    })
}
}catch(err) {
    res.status(500).json({
        message: "Passcode Verification Failed",
        error: err
    })
}

})

module.exports = login