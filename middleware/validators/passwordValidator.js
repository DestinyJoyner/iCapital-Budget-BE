const { body } = require("express-validator");

const passwordSchema = [
    body("password")
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
    )
]

module.exports = {
    passwordSchema
}