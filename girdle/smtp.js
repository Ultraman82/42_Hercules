require('dotenv').config();
var nodemailer = require('nodemailer');
const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

var transporter = nodemailer.createTransport({
  host: "smtp.elasticemail.com",
  port: 2525,
  secure: false,
  auth: {    
    user: process.env.USER,
    pass: process.env.PASS
  }  
})

rl.question('To : ', (To) => {
  rl.question('Subject : ', (Subject) => {
    rl.question('Text : ', (Text) => {
      transporter.sendMail({
        from: "exelcior99@gmail.com",
          to: To,
          subject: Subject,
          text: Text,
          html: `<b>${Text}</b><br/>
          <img src="https://media.giphy.com/media/ASzK5wWjMtc6A/giphy.gif" alt="Italian Trulli">`     
        })
        .catch((err) => console.log(err));
    rl.close();
    });
  });
});
