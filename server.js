const app = require("./app.js")

// CONFIG
require("dotenv").config()

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT} `)
})