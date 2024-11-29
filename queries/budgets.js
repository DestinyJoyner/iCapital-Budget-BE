const db = require("../db/dbConfig.js")

async function getBudgets (userId) {
    try{
        const allBudgets = await db.any("SELECT id, category, amount, TO_CHAR(transaction_date, 'MM/DD/YYYY') AS transaction_date, transaction_type FROM icapital_budgets WHERE user_id=$1", userId)
        return allBudgets
    }catch(err){
        return err
    }
}

async function createBudget(body,userId) {
    const {category, amount, transaction_date, transaction_type} = body
    try{
        const newBudget = await db.one("INSERT INTO icapital_budgets (user_id, category, amount, transaction_date, transaction_type) VALUES ($1, $2, $3, $4, $5) RETURNING *",[
            userId,
            category, 
            amount, 
            transaction_date, 
            transaction_type
        ])
        return newBudget
    }catch(err){
        return err
    }
}

module.exports = {
    getBudgets,
    createBudget
}