const db = require("../config/dbConfig.js")

// check if email is being used in db for new user sign up
async function checkEmail (userEmail) {
    // Select Exist returns a boolean ALWAYS handle true/false return from querie
    try{
        const findEmail = await db.one("SELECT EXISTS(SELECT 1 FROM icapital_users WHERE email=$1)",userEmail)
        return !findEmail.exists

    } catch(err) {
        console.log("Error checking email", err)
      return {
        error: err
      }
    }
}

module.exports = {
    checkEmail
}