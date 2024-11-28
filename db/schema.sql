DROP DATABASE IF EXISTS icapital_budget;
CREATE DATABASE icapital_budget;

\c icapital_budget;

DROP TABLE IF EXISTS icapital_users;

CREATE TABLE icapital_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

