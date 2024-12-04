const express = require("express");
const password = express.Router();
const { checkEmail } = require("../queries/emails.js");
const { generateCryptoToken } = require("../middleware/authorization.js");
const {
  storeVerificationToken,
  isValidToken,
} = require("../queries/verification.js");
const { verifyCryptoToken } = require("../middleware/tokenAuth.js");
const { hashPass, generateJWT } = require("../middleware/authorization.js");
const { updatePassword } = require("../queries/password.js");
const {
  passwordSchema,
} = require("../middleware/validators/passwordValidator.js");
const {
  validationError,
} = require("../middleware/validators/errorValidator.js");
const { emailTemplate, sendEmail } = require("../config/mailerConfig.js");

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

        const emailBody = await emailTemplate("password_reset", {
          verification_link,
        });

        const emailSend = await sendEmail({
          receipient: email,
          emailBody: emailBody,
          subject: "iCapital Budget Account Password Reset",
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
// auth/password/reset
// passwordSchema, validationError, verifyCryptoToken, hashPass
password.put(
  "/reset",
  passwordSchema,
  validationError,
  verifyCryptoToken,
  hashPass,
  async (req, res) => {
    try {
      const { email, password, verificationToken } = req.body;

      // returns id and email
      const updatedPassword = await updatePassword(
        email,
        password,
        verificationToken
      );

      if (!updatedPassword.message) {
        // create new JWT token
        const authToken = generateJWT(
          updatedPassword.email,
          updatedPassword.id
        );

        // send email to user for password change
        const emailSend = await sendEmail({
          receipient: updatedPassword.email,
          emailBody: "Your password has been updated.",
          subject: "Password Changed Successfully",
        });

        res.status(200).json({
          message: "Password changed ",
          token: authToken,
          email: updatedPassword.email,
        });
      } else {
        res.status(400).json({
          message: "Failed to change password",
          error: updatedPassword.message,
        });
      }
    } catch (err) {
      res.status(500).json({ error: "Error updating password" });
    }
  }
);

// password.put("/reset", (req,res) => {
//     res.status(200).json("yes it works!")
// })

module.exports = password;
