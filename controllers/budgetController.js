const express = require("express");
const budget = express.Router();
const {verifyToken} = require("../middleware/budgetAuth.js")


budget.get("/", verifyToken, async (req,res) => {
    const {email, id} = req.body.authUser 
    res.status(200).json("Budgets")
})
module.exports = budget