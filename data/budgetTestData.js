const budgetTestData = {
    validBudget: {
        category: "Groceries",
        amount: 150.75,
        transaction_date: "2024-03-20",
        transaction_type: "expense"
    },

    validIncome: {
        category: "Salary",
        amount: 5000.00,
        transaction_date: "2024-03-15",
        transaction_type: "income"
    },

    invalidAmount: {
        category: "Shopping",
        amount: -50.00,
        transaction_date: "2024-03-20",
        transaction_type: "expense"
    },

    invalidType: {
        category: "Food",
        amount: 25.99,
        transaction_date: "2024-03-20",
        transaction_type: "spending"  // invalid type
    },

    missingFields: {
        category: "Entertainment",
        transaction_type: "expense"
        // missing amount and date
    }
};

module.exports = budgetTestData;