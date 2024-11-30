DROP DATABASE IF EXISTS icapital_budget;
CREATE DATABASE icapital_budget;

\c icapital_budget;

DROP TABLE IF EXISTS icapital_users;

CREATE TABLE icapital_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    verification_token VARCHAR(64),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS icapital_budgets;

CREATE TABLE icapital_budgets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES icapital_users(id),
    category VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    transaction_date DATE DEFAULT CURRENT_DATE,
    transaction_type VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (transaction_type IN ('income', 'expense'))

);

-- DECIMAL(10,2) -> maintains 2 decimal palces after and 10 before
