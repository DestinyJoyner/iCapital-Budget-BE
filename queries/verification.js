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
        // cleanup expired tokens
        await removeExpiredTokens()
        // set time for token expiration -> 1hr
        const expirationTime = new Date(Date.now() +3600000).toISOString()

        const addVerificationToken = await db.one("UPDATE icapital_users SET verification_token = $1, verification_token_expiration = $2 WHERE email = $3 RETURNING id, email, verification_token", [verificationToken, expirationTime, userEmail])

        return addVerificationToken

    }catch(err) {
        return err
    }
} 

// verification token cleanup -> run check if expiration timestamp has past (< Current time)
async function removeExpiredTokens() {
    try {
        // no response needed just do it db.none()
        await db.none("UPDATE icapital_users SET verification_token = NULL, verification_token_expiration = NULL WHERE verification_token_expiration < CURRENT_TIMESTAMP");

    } catch(err) {
        return err;
    }
}

// query for checking verification token validity
async function isValidToken (verificationToken) {
    try{
        // return email of corresponding email account
        const validTokenEmail = await db.oneOrNone("SELECT email FROM icapital_users WHERE verification_token = $1 AND verification_token_expiration > CURRENT_TIMESTAMP", verificationToken)

        return validTokenEmail

    }catch(err) {
        return err
    }
}

module.exports = {
    verifyUser,
    storeVerificationToken,
    isValidToken
}