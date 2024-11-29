const styles = `
    body {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f5f5f5;
    }
    .container {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h1 {
        text-align: center;
    }
    .endpoint {
        margin: 20px 0;
        padding: 15px;
        background-color: #f8f9fa;
        border-radius: 4px;
    }
    .example {
        margin-top: 10px;
        padding: 10px;
        background-color: #f1f1f1;
        border-radius: 4px;
    }
    pre {
        background-color: #282c34;
        color: #abb2bf;
        padding: 15px;
        border-radius: 4px;
        overflow-x: auto;
    }
    .auth-header {
        color: #666;
        font-family: monospace;
        background: #f8f9fa;
        padding: 8px;
        border-radius: 4px;
        margin: 10px 0;
    }
`

const htmlStructure = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Budget & Investment Advisory API</title>
    <style>${styles}</style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Budget & Investment Advisory API</h1>
        
        <div class="authentication">
            <h2>Authentication</h2>
            <p>Protected routes require JWT token in header:</p>
            <div class="auth-header">authorization: &lt;your_JWT&gt;</div>
        </div>

        <div class="endpoints">
            <h2>Available Endpoints</h2>
            
            <div class="endpoint">
                <h3>POST /auth/register</h3>
                <p>Register new user</p>
                <div class="example">
                    <h4>Request Body:</h4>
                    <pre>
{
    "login": {
        "email": "user@example.com",
        "password": "SecurePass123!",
        "first_name": "John"
    }
}</pre>
                    <h4>Success Response (201):</h4>
                    <pre>
{
    "success": "Account created",
    "email": "user@example.com"
}</pre>
                </div>
            </div>

            <div class="endpoint">
                <h3>POST /auth/login</h3>
                <p>User login</p>
                <div class="example">
                    <h4>Request Body:</h4>
                    <pre>
{
    "login": {
        "email": "user@example.com",
        "password": "SecurePass123!"
    }
}</pre>
                    <h4>Success Response (200):</h4>
                    <pre>
{
    "token": "eyJhbGciOiJIUzI1..."
}</pre>
                </div>
            </div>

            <div class="endpoint">
                <h3>GET /auth/budget</h3>
                <p>Get all transactions and budget summary</p>
                <div class="example">
                    <h4>Success Response (200):</h4>
                    <pre>
{
    "budget_summary": {
        "total_income": 5000.00,
        "total_expenses": 225.50,
        "disposable_income": 4774.50
    },
    "transactions": [
        {
            "id": 1,
            "category": "Salary",
            "amount": 5000.00,
            "transaction_date": "03/15/2024",
            "transaction_type": "income"
        }
    ]
}</pre>
                </div>
            </div>

            <div class="endpoint">
                <h3>POST /auth/budget</h3>
                <p>Add new transaction</p>
                <div class="example">
                    <h4>Request Body:</h4>
                    <pre>
{
    "category": "Groceries",
    "amount": 150.75,
    "transaction_date": "2024-03-20",
    "transaction_type": "expense"
}</pre>
                </div>
            </div>

            <div class="endpoint">
                <h3>DELETE /auth/user</h3>
                <p>Delete account and get final summary</p>
                <div class="example">
                    <h4>Success Response (200):</h4>
                    <pre>
{
    "email": "user@example.com",
    "finalBudgetSummary": {
        "total_income": 5000.00,
        "total_expenses": 376.25,
        "disposable_income": 4623.75
    }
}</pre>
                </div>
            </div>
        </div>

        <div class="links">
            <h2>Important Links:</h2>
            <ul>
                <li><a href="https://github.com/DestinyJoyner/iCapital-Budget-BE">GitHub Repository</a></li>
            </ul>
        </div>
    </div>
</body>
</html>
`

module.exports = htmlStructure