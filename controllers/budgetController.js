const express = require("express");
const budget = express.Router();
const {verifyToken} = require("../middleware/budgetAuth.js")
const {getBudgets} = require("../queries/budgets.js")


budget.get("/", verifyToken, async (req,res) => {
    const {id} = req.body.authUser 
    const allBudgets = await getBudgets(id)

    if(!allBudgets.message){
        res.status(200).json(allBudgets)
    }
    else {
        res.status(500).json(allBudgets.message)
    }

})
module.exports = budget