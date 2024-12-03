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

// store verification token in user database
async function storeVerificationToken (verificationToken, userEmail){
    try{
        const addVerificationToken = await db.one("UPDATE icapital_users SET verification_token = $1 WHERE email = $2 RETURNING id, email, verification_token", [verificationToken, userEmail])

        return addVerificationToken

    }catch(err) {
        return err
    }
} 

module.exports = {
    verifyUser,
    storeVerificationToken
}