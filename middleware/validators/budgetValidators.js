const { body } = require("express-validator");

// function for amount check DECIMAL(10,2)
function verifyAmount(amount) {
  let val = parseFloat(amount);
  const maxVal = 9999999999.99;
  return val > 0 && val <= maxVal;
  
}

function convertAmount (amount) {
     // round 2 decimal
  return  Math.round(amount * 100) / 100;
 
}

// custom sanitizer (methods) => Whatever the value that they return, is the value that the field will acquire.
const budgetSchema = [
  body("category")
    .exists()
    .withMessage("Category is required").isInt({ min: 1, max: 28 }).withMessage("Invalid category ID"),

  body("amount")
    .exists()
    .withMessage("Amount is required")
    .isDecimal()
    .withMessage("Amount must be a valid number").custom(verifyAmount)
    .customSanitizer(convertAmount),

  body("transaction_type")
    .exists()
    .withMessage("Transaction type is required")
    .trim()
    .toLowerCase()
    .isIn(["income", "expense"])
    .withMessage("Transaction type must be 'income' or 'expense'"),
];

module.exports = { budgetSchema };
