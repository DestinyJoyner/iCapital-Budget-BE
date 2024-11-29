const { header } = require("express-validator");

const headerSchema = [
     // check header for auth key
  header("authorization").exists().withMessage("Authorization token required")
]

module.exports = {
    headerSchema
}