const express = require("express");
const registration = express.Router();
const { bodySchema } = require("../middleware/validators/userValidators.js");
const {
  validationError,
} = require("../middleware/validators/errorValidator.js");
const {
  isEmailUnique,
  hashPass,
  generateJWT,
  generateCryptoToken
} = require("../middleware/authorization.js");
const { createUser } = require("../queries/registration.js");
const {storeVerificationToken} = require("../queries/verification.js")

const ejs = require("ejs");
const path = require("path");
const transporter = require("../config/mailerConfig.js");
require("dotenv").config();

registration.get("/", (req, res) => {
  res.status(200).json("Registration Page");
});

// CREATE NEW USER
registration.post(
  "/",
  bodySchema,
  validationError,
  isEmailUnique,
  hashPass,
  async (req, res) => {
   try{
    // VERIFY EMAIL BEFORE CREATING USER IN DB
    const cryptoToken = generateCryptoToken()

    // append token to login obj in body
    req.body.login.verification_token = cryptoToken
    // boolean to track if user verifies email -> also need updated users table column for verification
    req.body.login.is_verified = false

    const newUser = await createUser(req.body.login);


// come back when front end set up!!!!!

const verification_link = `${process.env.FRONT_END_URL}/verification/${cryptoToken}`

    if (!newUser.message) {
      try {
        const { email, id } = newUser;
        // STORE TOKEN AFTER USER IS CREATED
        await storeVerificationToken(cryptoToken, email);

        const token = generateJWT(email, id);
        newUser.token = token;

        // access ejs file and send email here:
        const emailBody = await ejs.renderFile(
          path.join(__dirname, "../data/emailTemplate.ejs"),
          {
            template: "registration",
            details: {...newUser, verification_link}
          }
        );

        //   send email
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: "iCapital Budget Account Creation",
          html: emailBody,
        });

        res.status(200).json(newUser);
      } catch (jwtErr) {
        res.status(500).json({
          error: jwtErr,
        });
      }
    } else {
      res.status(500).json({
        error: newUser.message,
      });
    }
   }catch(err){
    res.status(500).json({
        message: "Error creating user account",
        error: err
      })
   }
  }
);

/* 
{"login":{
    "email":"test@email.com",
    "password":"1Password!",
    "first_name": "Test"
}
}

*/

module.exports = registration;
