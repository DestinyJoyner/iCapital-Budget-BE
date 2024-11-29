const express = require("express");
const budget = express.Router();
const { verifyToken } = require("../middleware/budgetAuth.js");
const {headerSchema} = require("../middleware/validators/headerValidator.js")
const{budgetSchema} = require("../middleware/validators/budgetValidators.js")
const {validationError} = require("../middleware/validators/errorValidator.js")
const { getBudgets, createBudget } = require("../queries/budgets.js");

budget.get("/", headerSchema, validationError, verifyToken, async (req, res) => {
  const { id } = req.body.authUser;
  const allBudgets = await getBudgets(id);

  if (!allBudgets.message) {
    res.status(200).json(allBudgets);
  } else {
    res.status(500).json(allBudgets.message);
  }
});

budget.post("/", headerSchema, budgetSchema, validationError, verifyToken, async (req, res) => {
    const {id} = req.body.authUser
    const body = req.body

    const addedBudget = await createBudget(body, id)

    if (!addedBudget.message) {
        res.status(200).json(addedBudget);
      } else {
        res.status(500).json(addedBudget.message);
      }

})

module.exports = budget;
