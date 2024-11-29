const express = require("express");
const user = express.Router();
const { verifyToken } = require("../middleware/tokenAuth.js");
const {headerSchema} = require("../middleware/validators/headerValidator.js")
const {validationError} = require("../middleware/validators/errorValidator.js")
const {deleteUser} = require("../queries/users.js")

user.delete("/", headerSchema, validationError, verifyToken, async (req, res) => {
    const { id } = req.body.authUser
    const finalUserBudgetBreakdown = await deleteUser(id)

    if(!finalUserBudgetBreakdown.message){
        res.status(200).json(finalUserBudgetBreakdown)
    }
    else {
        res.status(500).json({error:finalUserBudgetBreakdown.message})
    }
} )

module.exports = user