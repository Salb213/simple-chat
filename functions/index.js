const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// Configure the email transport using the default SMTP transport and a GMail account.
const mailTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'YOUR_GMAIL_ACCOUNT@gmail.com',
    pass: 'YOUR_GMAIL_PASSWORD',
  },
});

// Your company name to include in the emails
const APP_NAME = 'Simple Chat';

exports.sendEmail = functions.https.onCall((data, context) => {
  const email = data.email;
  return sendWelcomeEmail(email);
});

async function sendWelcomeEmail(email) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: 'aria.evercrest@gmail.com',
  };

  // The email subject and body text.
  mailOptions.subject = `New Login to ${APP_NAME}`;
  mailOptions.text = `A new user has logged in: ${email}`;
  await mailTransport.sendMail(mailOptions);
  console.log('New login email sent to:', email);
  return { success: true };
}
