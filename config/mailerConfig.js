const nodemailer = require('nodemailer');
const ejs = require("ejs");
const path = require("path");
require("dotenv").config();

const { EMAIL_USER, EMAIL_APP_PASSWORD} = process.env

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    }
});

// dynamic email to send emails
async function sendEmail (emailObj) {
        /* obj = {emailBody, receipient, subject} */
try{
const {receipient, emailBody, subject} = emailObj
//   send email
await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: receipient,
  subject: subject,
  html: emailBody,
});
} catch(err) {
    console.log("error sending email", err)
}
}

async function emailTemplate (template, detailsObj) {
   try {
    const emailBody = await ejs.renderFile(
        path.join(__dirname, "../data/emailTemplate.ejs"),
        {
          template: template,
          details: detailsObj
        }
      );
      return emailBody
   }catch(err) {
    console.log("err retrieving email template", err)
   }
}

module.exports = {
    transporter,
    sendEmail,
    emailTemplate
}