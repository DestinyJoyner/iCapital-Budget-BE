const db = require("../config/dbConfig.js");

async function getBudgets(userId) {
  try {
    const allBudgets = await db.any(
      "SELECT id, category, amount, TO_CHAR(transaction_date, 'MM/DD/YYYY') AS transaction_date, transaction_type FROM icapital_budgets WHERE user_id=$1",
      userId
    );

    const budgetSummary = await getBudgetSummary(userId)

    return {
        budget_summary: budgetSummary,
        transactions : allBudgets
        
    }
  } catch (err) {
    return err;
  }
}

async function getBudgetSummary(userId) {
  // Case When => Only sum amounts where type is <income || expense> => when expense -amount
  try {
    const budgetSummary = await db.one("SELECT SUM(CASE WHEN transaction_type = 'income' THEN amount END) as total_income, SUM(CASE WHEN transaction_type = 'expense' THEN amount END) as total_expenses, SUM(CASE WHEN transaction_type = 'income' THEN amount WHEN transaction_type = 'expense' THEN -amount END) as disposable_income FROM icapital_budgets WHERE user_id = $1",userId
    );

    return budgetSummary
  } catch (err) {
    return err
  }
}

async function createBudget(body, userId) {
  const { category, amount, transaction_date, transaction_type } = body;
  try {
    const newBudget = await db.one(
      "INSERT INTO icapital_budgets (user_id, category, amount, transaction_date, transaction_type) VALUES ($1, $2, $3, $4, $5) RETURNING id, category, amount, TO_CHAR(transaction_date, 'MM/DD/YYYY') AS transaction_date, transaction_type",
      [userId, category, amount, transaction_date, transaction_type]
    );
    return newBudget;
  } catch (err) {
    return err;
  }
}

module.exports = {
  getBudgets,
  createBudget,
  getBudgetSummary
};
