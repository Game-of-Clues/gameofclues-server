const express = require('express');
const apiRouter = require('./api');
const app = express();
const cors = require('cors');
const sgMail = require('@sendgrid/mail');

// sgMail.setApiKey(process.env.sgApiKey);

const msg = {
  to: 'nikistoyanov2005@gmail.com', // Change to your recipient
  from: 'gameofclues.pz@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}

// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })

app.use(express.json());
app.use(apiRouter);

app.set('json replacer', (key, value) => {
    if (key === 'password') { return undefined; }
    return value;
})

app.use((err, req, res) => {
    console.error(err);
})
    
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server: Listening on ${process.env.PORT || 3000}`);
});