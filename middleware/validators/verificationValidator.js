const { body } = require("express-validator");

const verificationSchema = [
  body("verification_token")
    .notEmpty()
    .withMessage("Verification token required")
    .isString()
    .withMessage("Verification token must be a string")
    .isLength({ min: 64, max: 64 })
    .withMessage("Invalid verification token format"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email format"),
];

module.exports = { verificationSchema };
