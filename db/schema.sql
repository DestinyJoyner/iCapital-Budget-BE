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
    verification_token_expiration TIMESTAMP,
    is_verified BOOLEAN DEFAULT FALSE,
    one_time_passcode VARCHAR(6),
    one_time_passcode_expiration TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS icapital_categories;

CREATE TABLE icapital_categories (
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);

DROP TABLE IF EXISTS icapital_budgets;

CREATE TABLE icapital_budgets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES icapital_users(id),
    category INTEGER REFERENCES icapital_categories(id),
    amount DECIMAL(10,2) NOT NULL,
    transaction_date DATE DEFAULT CURRENT_DATE,
    transaction_type VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (transaction_type IN ('income', 'expense'))

);

-- no need only if want to use speakeasy with third party authenticator app
-- DROP TABLE IF EXISTS icapital_mfa;

-- CREATE TABLE icapital_mfa (
--     user_id INTEGER PRIMARY KEY REFERENCES icapital_users(id),
--     secret_key TEXT NOT NULL,
--     is_active BOOLEAN DEFAULT FALSE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- DECIMAL(10,2) -> maintains 2 decimal palces after and 10 before
