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
    .endpoints {
        margin-top: 20px;
    }
    .endpoint {
    margin-top: 8px;
    }
`

const htmlStructure = `
 <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Budget & Investment Advisory API</title>
        <style>
            ${styles}
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Welcome to Budget & Investment Advisory API</h1>
            <p>This is the base endpoint for the Budget & Investment Advisory API. Please refer to the documentation for available endpoints and usage.</p>
            
            <div class="endpoints">
                <h2>Available Endpoints:</h2>
                <div class="endpoint">
                    <strong>POST /auth/register</strong> - Register new user
                </div>
                <div class="endpoint">
                    <strong>POST /auth/login</strong> - User login
                </div>
                <div class="endpoint">
                    <strong>POST /auth/logout</strong> - User logout
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