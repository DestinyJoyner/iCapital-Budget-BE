const { body } = require("express-validator");

// function for amount check DECIMAL(10,2)
function verifyAmount(amount) {
  let val = parseFloat(amount);
  const maxVal = 9999999999.99;
  if (val <= 0) {
    throw new Error("Amount must be greater than 0");
  }
  if (val > maxVal) {
    throw new Error("Amount exceeds max value");
  }
  // round 2 decimal
  val = Math.round(val * 100) / 100;
  return val;
}

// custom sanitizer (methods) => Whatever the value that they return, is the value that the field will acquire.
const budgetSchema = [
  body("category")
    .exists()
    .withMessage("Category is required")
    .trim()
    .notEmpty(),

  body("amount")
    .exists()
    .withMessage("Amount is required")
    .isDecimal()
    .withMessage("Amount must be a valid number")
    .customSanitizer(verifyAmount),

  body("transaction_type")
    .exists()
    .withMessage("Transaction type is required")
    .trim()
    .toLowerCase()
    .isIn(["income", "expense"])
    .withMessage("Transaction type must be 'income' or 'expense'"),
];

module.exports = { budgetSchema };
