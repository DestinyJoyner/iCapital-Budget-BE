const db = require("../db/dbConfig.js");

// GET USER PASS if email exist
async function getUserPassword(userEmail) {
  try {
    const userPassword = await db.one(
      "SELECT password_hash, id FROM icapital_users WHERE email=$1",
      userEmail
    );

    return userPassword;
  } catch (err) {
    return err;
  }
}


module.exports = {
  getUserPassword,
};
