const db = require("../config/dbConfig.js");

// store generated key
async function storePasscode(userId, passcode) {
    try{
        const expirationTime = new Date(Date.now() +3600000).toISOString()

       const storedPasscode = await db.one("UPDATE icapital_users SET one_time_passcode = $1 one_time_passcode_expiration = $2 WHERE id = $3 RETURNING *", [passcode, expirationTime,userId])
       
       return storedPasscode

    }catch(err) {
        return err
    }
}

async function verifyPasscode (userId, passcode) {
    try{
        const isValid = await db.oneOrNone("SELECT id FROM icapital_users WHERE id =$1 AND on_time_passcode = $2 AND one_time_passcode_expiration > CURRENT_TIMESTAMP ", [userId, passcode])
        //  return boolean for ease use !!
        return !!isValid

    }catch(err){
        return err
    }
}

module.exports = {
    storePasscode,
    verifyPasscode
}