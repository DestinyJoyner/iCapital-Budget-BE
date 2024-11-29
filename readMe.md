# Budget & Investment Advisory API

## Overview
A RESTful API backend service for managing personal budgets and providing investment recommendations. Built with Node.js and Express.js.

## API Links
- Deployed API: [https://icapital-budget-be.onrender.com/](https://icapital-budget-be.onrender.com/)
- Local Development: http://localhost:3001

## Tech Stack
- Node.js
- Express.js
- JSON Web Tokens (JWT)
- bcrypt

## Authentication
All routes except registration and login require a JWT token in the Authorization header:

authorization: `<your_JWT>`

### Token Format
- Tokens are issued upon successful login
- Valid for 24 hours
- Must be included in all protected route headers

## API Endpoints
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/budget` - Add transaction
- `GET /auth/budget` - Get transactions
- `DELETE /auth/user` - Delete account

## Installation

# Clone repository
git clone https://github.com/DestinyJoyner/iCapital-Budget-BE.git

# Install dependencies
`npm install`

# Start server
`npm run dev`
## Environment Variables
PORT=3001

SECRET_TOKEN= `<hexadecimal value>`
