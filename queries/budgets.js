const db = require("../db/dbConfig.js")

async function getBudgets (userId) {
    try{
        const allBudgets = await db.any("SELECT id, category, amount, TO_CHAR(transaction_date, 'MM/DD/YYYY') AS transaction_date, transaction_type FROM icapital_budgets WHERE user_id=$1", userId)
        return allBudgets
    }catch(err){
        return err
    }
}

module.exports = {
    getBudgets
}