const db = require("../config/dbConfig.js");

// function to update password for user

async function updatePassword (userEmail, newPassword, verificationToken) {
    try {
        const updatedPassword = await db.one(" UPDATE icapital_users SET password_hash =$1, verification_token = NULL, verification_token_expiration =NULL WHERE email= $2 AND verification_token = $3 RETURNING id, email, first_name",[newPassword, userEmail, verificationToken])

        return updatedPassword

    }catch(err) {
        return err
    }
}

module.exports = {
    updatePassword
}