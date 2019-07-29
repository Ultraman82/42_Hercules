require('dotenv').config();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

console.log('created');
transporter.sendMail({
from: 'exelcior99@gmail.com',
  to: 'bauhause@hanmail.net',
  subject: 'hello world!',
  text: 'hello world!',
  html:
  '<p><b>Hello</b> to myself <img src="./nyan.gif"/></p>'  
});