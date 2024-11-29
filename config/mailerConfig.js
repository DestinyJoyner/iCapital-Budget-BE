// const mailer = require('express-mailer');
// require("dotenv").config()
 
// const { EMAIL_USER, EMAIL_APP_PASSWORD} = process.env

// https://www.npmjs.com/package/express-mailer
/* function mailerConfig (app){
    mailer.extend(app, {
        from: EMAIL_USER,
        host: 'smtp.gmail.com', // hostname
        secureConnection: true, // use SSL
        port: 465, // port for secure SMTP
        transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_APP_PASSWORD
        }
      })
} 

module.exports = mailerConfig */

const nodemailer = require('nodemailer');
require("dotenv").config();
const { EMAIL_USER, EMAIL_APP_PASSWORD} = process.env

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    }
});

module.exports = transporter;