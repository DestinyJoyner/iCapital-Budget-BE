const db = require("../config/dbConfig.js");
const {getBudgetSummary, getBudgets} = require("./budgets.js")

// GET USER PASS if email exist
async function getUserPassword(userEmail) {
  try {
    const userPassword = await db.one(
      "SELECT password_hash, id FROM icapital_users WHERE email=$1",
      userEmail
    );

    return userPassword;
  } catch (err) {
    return null;
  }
}

// Delete user -> development purposes
async function deleteUser (userId) {
    try{
        // get email and last budget summary returned for last snapshot of budget b4 delete
        const finalBudgetSummary = await getBudgetSummary(userId)
    
        // delete from budget table first -> constraint
        await db.none("DELETE FROM icapital_budgets WHERE user_id = $1", userId)

        const email = await db.one("DELETE FROM icapital_users WHERE id= $1 RETURNING email", userId)

        return {
            email,
            finalBudgetSummary,
        }



    }catch(err){
        return err
    }
}

// get user info from mfa update
async function getUserInfo (userId) {
  try {
const userInfo = await db.one("SELECT email, id, first_name FROM icapital_users WHERE id= $1", userId)

return userInfo
  }catch(err) {
    return err
  }
}


module.exports = {
  getUserPassword,
  deleteUser,
  getUserInfo
};
