const db = require("../config/dbConfig.js");

async function verifyUser (email, verificationToken) {
    // oneornone -> null if no row found
    try {
        const user = await db.oneOrNone("UPDATE icapital_users SET is_verified = TRUE WHERE verification_token = $1 AND email = $2 AND verification_token_expiration > CURRENT_TIMESTAMP RETURNING id, email, is_verified", [verificationToken, email])

        return user

    }catch(err){
        return err
    }
}

// store verification token in user database
async function storeVerificationToken (verificationToken, userEmail){
    try{
        // set time for token expiration -> 1hr
        const expirationTime = new Date(Date.now() +3600000).toISOString()

        const addVerificationToken = await db.one("UPDATE icapital_users SET verification_token = $1, verification_token_expiration = $2 WHERE email = $3 RETURNING id, email, verification_token", [verificationToken, expirationTime, userEmail])

        return addVerificationToken

    }catch(err) {
        return err
    }
} 

module.exports = {
    verifyUser,
    storeVerificationToken
}