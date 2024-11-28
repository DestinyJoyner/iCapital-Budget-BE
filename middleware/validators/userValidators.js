const { body } = require("express-validator");

const bodySchema = [
  body("login.first_name")
    .exists({ checkFalsy: true })
    .withMessage("First name is required")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ max: 50 })
    .withMessage("First name should be less than 50 characters"),
  body("login.email")
    .exists({ checkFalsy: true })
    .withMessage("A valid email is required")
    .isEmail()
    .withMessage("A valid email is required").normalizeEmail().toLowerCase(),
  body("login.password")
    .exists({ checkFalsy: true })
    .withMessage("A password is required")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
      minNumbers: 1,
    })
    .withMessage(
      "Password must be at least 8 characters long and include: 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
    ),
];

// individual email & password check if necessary
const emailSchema = [
  body("login.email").exists({ checkFalsy: true })
  .withMessage("A valid email is required")
  .isEmail()
  .withMessage("A valid email is required").normalizeEmail().toLowerCase()
];

const passwordSchema = [
  body("login.password").exists({ checkFalsy: true }).isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
    minNumbers: 1,
  }),
];

module.exports = {
  bodySchema,
};
