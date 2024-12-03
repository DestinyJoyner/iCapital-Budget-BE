const express = require("express");
const password = express.Router();
const { checkEmail } = require("../queries/emails.js");
const { generateCryptoToken } = require("../middleware/authorization.js");
const {
  storeVerificationToken,
  isValidToken,
} = require("../queries/verification.js");
const ejs = require("ejs");
const path = require("path");
const transporter = require("../config/mailerConfig.js");
require("dotenv").config();

// route to verify validity of the token AFTER initializing password reset process => then FE form submission of new password route to PUT route

password.get("/verify-token/:verificationToken", async (req, res) => {
  try {
    const { verificationToken } = req.params;
    const validTokenEmail = await isValidToken(verificationToken);

    if (!validTokenEmail || validTokenEmail.message) {
      res.status(400).json({
        error: "Invalid or expired reset link. Request a new one.",
        msg: validTokenEmail?.message,
      });
    } else {
      res.status(200).json({
        message: "Valid Token",
        email: validTokenEmail.email,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "Error verifying reset token",
    });
  }
});

// post route to initiate password reset -> receives email in body, used for verification if in DB
password.post("/", async (req, res) => {
  const { email } = req.body;
  const isValidEmail = await checkEmail(email);

  // if email in db, generate verification token and send to email
  if (isValidEmail) {
    try {
      const verificationToken = generateCryptoToken();
      const userVerifiedObj = await storeVerificationToken(
        verificationToken,
        email
      );
      if (!userVerifiedObj.message) {
        const { id, email, verification_token } = userVerifiedObj;

        const verification_link = `${process.env.FRONT_END_URL}/password-reset/${verification_token}`;

        const emailBody = await ejs.renderFile(
          path.join(__dirname, "../data/emailTemplate.ejs"),
          {
            template: "password_reset",
            details: { verification_link },
          }
        );

        //   send email
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: "iCapital Budget Account Password Reset",
          html: emailBody,
        });

        res.status(200).json({
          message: "Password reset link has been sent",
        });
      } else {
        res
          .status(500)
          .json({ error: "Server Error", msg: userVerifiedObj.message });
      }
    } catch (err) {
      res.status(500).json({
        error: "Error verifying email",
      });
    }
  } else {
    res.status(500).json({
      error: "Email not linked to any account",
      message: isValidEmail.message,
    });
  }
});


// PUT/UPDATE ROUTE FOR ACCEPTING  new changed passwrod from FE

module.exports = password;
