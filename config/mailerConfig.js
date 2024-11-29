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