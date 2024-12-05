# Budget & Investment Advisory API

## Description
A budgeting application that allows users to track their income and expenses. Features secure user authentication with email verification and multi-factor authentication. 

## Features

### User Authentication
- **Registration with Email Verification**
  - Secure account creation
  - Email verification using crypto tokens
  - Token expiration for enhanced security

- **Multi-Factor Authentication (MFA)**
  - Email-based passcode verification
  - Time-sensitive one-time passcodes
  - Secure login process

- **Password Security**
  - Password hashing using bcrypt
  - Password validation requirements
  - Secure password reset functionality

### Email System
- **Nodemailer Integration**
  - Configured with Gmail SMTP
  - EJS templating for email content
  - HTML formatted emails

- **Email Templates**
  - Registration verification
  - Login passcode delivery
  - Password reset instructions

### Security Features
- **JWT Authentication**
  - Secure token generation
  - Protected route middleware
  - Token-based session management

- **Database Security**
  - Prepared statements
  - Input validation
  - SQL injection prevention

- **Validation & Middleware**
  - Request body validation
  - Authentication checks
  - Error handling middleware

  ### Authentication Flow
1. **Registration**
   - User submits registration form
   - Password is hashed
   - Verification token generated
   - Verification email sent

2. **Email Verification**
   - User clicks verification link
   - Token validated
   - Account marked as verified

3. **Login Process**
   - User submits credentials
   - Credentials verified
   - Passcode generated and emailed
   - Passcode verified
   - JWT token issued

## API Links
- Deployed API: [https://icapital-budget-be.onrender.com/](https://icapital-budget-be.onrender.com/)
- Local Development: http://localhost:3001

## Tech Stack
### Backend Framework
- **Express.js**: Web application framework for Node.js
- **Node.js**: JavaScript runtime environment

### Database
- **PostgreSQL**: Primary database
- **pg-promise**: PostgreSQL interface for Node.js

### Authentication & Security
- **JSON Web Tokens (JWT)**: Secure authentication tokens
- **bcrypt**: Password hashing and security
- **dotenv**: Environment variable management

### Email Services
- **Nodemailer**: Email sending functionality
- **EJS**: Email template rendering

### Development Tools
- **Git**: Version control
- **npm**: Package management
- **Postman**: API testing

### Deployment
- **Render**: Cloud hosting platform


### Token Format
- Tokens are issued upon successful login
- Valid for 24 hours
- Must be included in all protected route headers

### API Endpoints

#### Authentication Routes
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/budget` - Add transaction
- `GET /auth/budget` - Get transactions
- `DELETE /auth/user` - Delete account
- `POST /auth/mfa/verify` - Passcode verification
- `POST /auth/reset` - Password reset

## Installation

# Clone repository
git clone https://github.com/DestinyJoyner/iCapital-Budget-BE.git

# Install dependencies
`npm install`

# Start server
`npm run dev`

# Run tests
`npm test`

## Environment Variables
PORT=3001

PG_HOST=localhost

PG_PORT=5432

PG_DATABASE=icapital_dev

PG_USER=postgres

EMAIL_USER=your.email@gmail.com

EMAIL_PASS=your-app-specific-password

JWT_SECRET=your-jwt-secret

SECRET_TOKEN= hexadecimal value

## Error Handling
- Custom error messages
- Appropriate HTTP status codes
- Consistent error response format
