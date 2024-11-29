const express = require("express");
const user = express.Router();
const { verifyToken } = require("../middleware/tokenAuth.js");
const { headerSchema } = require("../middleware/validators/headerValidator.js");
const {
  validationError,
} = require("../middleware/validators/errorValidator.js");
const { deleteUser } = require("../queries/users.js");

/* email, ejs, path (built in Node =>path is just to not have to hardcode and be more dynamic for file paths ) */
const ejs = require("ejs");
const path = require("path");
const transporter = require("../config/mailerConfig.js");
require("dotenv").config();

user.delete(
  "/",
  headerSchema,
  validationError,
  verifyToken,
  async (req, res) => {
    const { id } = req.body.authUser;
    const finalUserBudgetBreakdown = await deleteUser(id);

    if (!finalUserBudgetBreakdown.message) {
      // render ejs file, access delete template , __dirname is current directory
      const emailBody = await ejs.renderFile(
        path.join(__dirname, "../data/emailTemplate.ejs"),
        {
          template: "delete",
          details: finalUserBudgetBreakdown,
        }
      );
      // send email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: finalUserBudgetBreakdown.email.email,
        subject: "iCapital Budget Account Deletion Confirmation",
        html: emailBody,
      });
      res.status(200).json({
        message: "Account deleted successfully",
      });
    } else {
      res.status(500).json({ error: finalUserBudgetBreakdown.message });
    }
  }
);

/* 
    {
            email,
            finalBudgetSummary,
            finalTransactions
        }
    */

module.exports = user;
