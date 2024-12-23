\c icapital_budget;

INSERT INTO icapital_users (email, password_hash, first_name) VALUES('destinybudget@test.com', '$2b$10$BRgT9p/9ixSJFxdOeMVVcOJSqMWQfz8IdLqHk/mgZu8aX7wjR2B.i', 'Destiny');


INSERT INTO icapital_categories (category_name) VALUES 
    ('Salary'),
    ('Freelance'),
    ('Investments'),
    ('Side Hustle'),
    ('Gifts Received'),
    ('Tax Return'),
    ('Other Income'),
    ('Rent/Mortgage'),
    ('Utilities'),
    ('Groceries'),
    ('Transportation'),
    ('Healthcare'),
    ('Personal Care'),
    ('Clothing'),
    ('Dining Out'),
    ('Entertainment'),
    ('Shopping'),
    ('Hobbies'),
    ('Phone/Internet'),
    ('Streaming Services'),
    ('Insurance'),
    ('Savings'),
    ('Investments'),
    ('Debt Payment'),
    ('Education'),
    ('Gifts'),
    ('Travel'),
    ('Other Expense');

INSERT INTO icapital_budgets (user_id, category, amount, transaction_date, transaction_type) 
VALUES 
    (1, 1, 5000.00, '2024-03-15', 'income'),
    (1, 10, 150.75, '2024-04-16', 'expense'),
    (1, 11, 75.50, '2024-08-17', 'expense');