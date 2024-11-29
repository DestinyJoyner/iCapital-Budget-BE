const db = require("../config/dbConfig.js")

// CREATE NEW USER
async function createUser (userInfo) {
    try {
        const {email, password, first_name } = userInfo
        
        const newUser = await db.one("INSERT INTO icapital_users (email, password_hash, first_name) VALUES ($1, $2, $3) RETURNING email, first_name, id ", [email,password,first_name])

        return newUser
    }catch(err) {
        return err
    }
}

module.exports = {
    createUser
}