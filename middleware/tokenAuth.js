const JWT = require("jsonwebtoken");
require("dotenv").config();

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

module.exports = { verifyToken };
