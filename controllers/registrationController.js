const express = require("express");
const registration = express.Router();
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
registration.post("/", isEmailUnique, hashPass, async (req, res) => {
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
});

module.exports = registration;
