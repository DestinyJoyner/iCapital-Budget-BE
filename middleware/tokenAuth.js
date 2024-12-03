const JWT = require("jsonwebtoken");
require("dotenv").config();

const { isValidToken } = require("../queries/verification.js");

function verifyToken(req, res, next) {
  // headers => "authorization"
  const authHeader = req.headers["authorization"];
  // "Bearer[0] token[1]"
  const token = authHeader && authHeader.split(" ")[1];
  const secret = process.env.SECRET_TOKEN;

  if (!token) {
    return res.status(400).json({
      error: "No token provided",
    });
  }

  JWT.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(400).json({
        error: "Token authentication failed",
      });
    }

    req.body.authUser = decoded;
    next();
  });
}

// middleware for checking verfication(crypto) token

async function verifyCryptoToken(req, res, next) {
  try {
    const { verificationToken } = req.body;
    // checking for token validity returns the user email
    const validEmail = await isValidToken(verificationToken);

    if (!validEmail) {
      res.status(400).json({
        error: "Invalid or expired token.",
      });
    } else {
      req.body.email = validEmail.email;
      next();
    }
  } catch (err) {
    res.status(500).json({
      error: "Error verifying token",
    });
  }
}

module.exports = {
  verifyToken,
  verifyCryptoToken,
};
