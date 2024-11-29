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
} = require("../middleware/authorization.js");
const { createUser } = require("../queries/registration.js");

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
    const newUser = await createUser(req.body.login);

    if (!newUser.message) {
      try {
        const { email, id } = newUser;

        const token = generateJWT(email, id);
        newUser.token = token;

        // access ejs file and send email here:
        const emailBody = await ejs.renderFile(
          path.join(__dirname, "../data/emailTemplate.ejs"),
          {
            template: "registration",
            details: newUser,
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
