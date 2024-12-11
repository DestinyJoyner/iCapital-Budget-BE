const express = require("express");
const verification = express.Router();
const { verifyUser } = require("../queries/verification.js");
const { generateJWT } = require("../middleware/authorization.js");
const { generateCryptoToken } = require("../middleware/authorization.js");
const {
  verificationSchema,
} = require("../middleware/validators/verificationValidator.js");
const {
  validationError,
} = require("../middleware/validators/errorValidator.js");
const { checkEmail } = require("../queries/emails.js");
const { storeVerificationToken } = require("../queries/verification.js");
const { emailTemplate, sendEmail } = require("../config/mailerConfig.js");

// route for frontend to ping from verification email to wait for response for verification
verification.post(
  "/",
  verificationSchema,
  validationError,
  async (req, res) => {
    const { email, verification_token } = req.body;
    // console.log(req.body, "verification from fe")
    try {
      const user = await verifyUser(email, verification_token);
      // console.log(user, "verifyd")
      if (!user) {
        res.status(400).json({
          error: "Invalid verification token or email",
        });
      } else {
        const { email, id, is_verified } = user;

        const token = generateJWT(email, id);

        res.status(200).json({
          message: "Email verified",
          is_verified: is_verified,
          token: token,
          user: {
            email: email,
            id: id,
          },
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "Error verifying email",
        error: err,
      });
    }
  }
);

// add route for resending new verification for registering user errors
verification.post("/resend-token", async (req, res) => {
  const { email } = req.body;
  try {
    const emailExist = await checkEmail(email);
    if (!emailExist) {
      res.status(400).json({
        error: "Email not found",
      });
    } else {
      // generate new crypto verification token
      const newToken = generateCryptoToken();
      await storeVerificationToken(newToken,email);
      // create link with endpoint of token to send in email link
      const verification_link = `${process.env.FRONT_END_URL}/verification/${newToken}`;

      try {
        const emailBody = await emailTemplate("resend_verification", {
          verification_link,
        });
        sendEmail({
          receipient: email,
          emailBody: emailBody,
          subject: "iCapital Budget - Verify Your Email",
        });

        res
          .status(200)
          .json({ message: "Verification email sent successfully" });
      } catch (err) {
        console.log("Error sending email", err);
        res.status(400).json({
          error: "Error sending verification email",
        });
      }
    }
  } catch (err) {
    console.log("Resending verification token error", err);
    res.status(500).json({
      error: "Error verifying email",
    });
  }
});

module.exports = verification;
