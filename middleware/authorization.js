const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { checkEmail } = require("../queries/emails.js");

/* 
    req shape = req {
    body: {
        login: {
            email: "",
            password:""
        }
    }
    }
*/
// genSalt will generate the default number for the salting rounds
// bcrypt.hash will take the inputted password by the user and salt and hash it

async function hashPass(req, res, next) {
  try {
    const password = req.body.login.password;

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(password, salt);
    req.body.login.password = hashedPass;
    next();
  } catch (err) {
    res.status(404).json({
      error: err,
    });
  }
}

// generate JWT
//  1-24 hours after developemtn for expiresIn val

function generateJWT(userEmail) {
  const token = JWT.sign({ email: userEmail }, process.env.SECRET_TOKEN, {
    expiresIn: "240h",
  });

  return token;
}

// function for validating email

async function isEmailUnique(req, res, next) {
  try {
    const user_email = req.body.login.email;
    const isUnique = await checkEmail(user_email);

    if (isUnique.error) {
      res.status(500).json({ error: "Database error checking email" });
    }

    if (!isUnique) {
      res
        .status(400)
        .json({ error: `${user_email} is linked to another account` });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({
      error: "Error checking email",
    });
  }
}

module.exports = {
    isEmailUnique,
    hashPass,
    generateJWT
}
