const db = require("../config/dbConfig.js");

// store generated key
async function storePasscode(userId, passcode) {
    try{
        const expirationTime = new Date(Date.now() +3600000).toISOString()

       const storedPasscode = await db.one("UPDATE icapital_users SET one_time_passcode = $1 one_time_passcode_expiration = $2 WHERE user_id = $3 RETURNING *", [passcode, expirationTime,userId])
       
       return storedPasscode

    }catch(err) {
        return err
    }
}

module.exports = {
    storePasscode
}