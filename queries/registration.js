const db = require("../config/dbConfig.js")

// CREATE NEW USER
async function createUser (userInfo) {
    try {
        const {email, password, first_name, verification_token, is_verified } = userInfo
        
        const newUser = await db.one("INSERT INTO icapital_users (email, password_hash, first_name, verification_token, is_verified) VALUES ($1, $2, $3, $4, $5) RETURNING email, first_name, id, verification_token, is_verified ", [email,password,first_name,verification_token, is_verified])

        return newUser
    }catch(err) {
        return err
    }
}

module.exports = {
    createUser
}