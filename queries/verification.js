const db = require("../config/dbConfig.js");

async function verifyUser (email, verificationToken) {
    // oneornone -> null if no row found
    try {
        const user = await db.oneOrNone("UPDATE icapital_users SET is_verified = TRUE WHERE verification_token = $1 AND email = $2 RETURNING id, email, is_verified", [verificationToken, email])

        return user

    }catch(err){
        return err
    }
}

module.exports = {
    verifyUser
}