const db = require("../config/dbConfig.js")

async function getAllCategories() {
    try{
        const allCategories = await db.any("SELECT * FROM icapital_categories")

        // format category return obj
        const formattedCategories = allCategories.reduce((acc, {category_name, id}) => {
            acc[id] = category_name;
            return acc;
        }, {});

        return formattedCategories;
        

    }catch(err) {
        return err
    }
}

async function groupCategoryTotals (userId) {
    try{
        // join command get user budget EXPENSE transactions and sum them and group by the category
        const expensesGroupedByCategory = await db.any("SELECT icapital_categories.category_name, SUM(icapital_budgets.amount) as total_amount FROM icapital_budgets JOIN icapital_categories ON icapital_budgets.category = icapital_categories.id WHERE icapital_budgets.user_id = $1 AND icapital_budgets.transaction_type='expense' GROUP BY icapital_categories.category_name", userId)
        
        return expensesGroupedByCategory
    }catch(err) {
        return err
    }
}
module.exports = {
    getAllCategories,
    groupCategoryTotals
}