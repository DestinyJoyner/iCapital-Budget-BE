const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { checkEmail } = require("../queries/emails.js");
const { getUserPassword } = require("../queries/users.js");

// email verification
const crypto = require("crypto");

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

function generateJWT(userEmail, userId) {
  const token = JWT.sign(
    { email: userEmail, id: userId },
    process.env.SECRET_TOKEN,
    {
      expiresIn: "24h",
    }
  );

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

// AUTHORIZE USER SIGN IN
async function authorizeUser(req, res, next) {
  const { email, password } = req.body.login;
  try {
    const isStoredEmail = await checkEmail(email);
    // if false, email is in db so check pass against hashpass
    if (!isStoredEmail) {
      const hashedPass = await getUserPassword(email);
      // compare sent password w/ hashed value
      const isPassValid = await bcrypt.compare(
        password,
        hashedPass.password_hash
      );
      if (isPassValid) {
        const token = generateJWT(email, hashedPass.id);
        // append token and user id to req.body
        req.body.token = token;
        req.body.user_id = hashedPass.id;
        next();
      } else {
        res.status(500).json({ error: "Invalid Credentials" });
      }
    } else {
      res.status(500).json({ error: "Invalid Credentials" });
    }
  } catch (emailErr) {
    res.status(500).json({ error: "Server error during authentication" });
  }
}


// Email verification using CRYPTO
function generateCryptoToken () {
    return crypto.randomBytes(32).toString('hex')
}

// authenticate authToken sent from front end

// Add this to your existing authorization.js
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        // "Bearer[0] token[1]"
        const token = authHeader && authHeader.split(" ")[1]; 

        if (!token) {
            return res.status(400).json({ error: "No token provided" });
        }

        // Verify token
        JWT.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(400).json({ error: "Invalid token" });
            }

            // decoded = { email, id }
            req.user = decoded; 
            next();
        });
    } catch (error) {
        res.status(400).json({ error: "Authentication failed" });
    }
};

module.exports = {
  isEmailUnique,
  hashPass,
  generateJWT,
  authorizeUser,
  generateCryptoToken,
  authenticateToken
};
