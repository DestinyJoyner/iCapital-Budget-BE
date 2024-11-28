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
        const email = newUser.email;
        const token = generateJWT(email);
        newUser.token = token;
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
