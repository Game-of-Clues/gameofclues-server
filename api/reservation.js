const router = require('express').Router();
const models = require('../models');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.sgApiKey);

router.get('/', (req, res, next) => {
    models.Reservation.find()
        .then(reservations => res.send(reservations))
        .catch(next);
})

router.post('/', (req, res, next) => {

    const reservation = new models.Reservation({
        duration: req.body.duration,
        people: req.body.people,
        gameType: req.body.gameType,
        date: req.body.date,
        time: req.body.time,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email
    });

    reservation.save();

    const msg = {
        to: 'nikistoyanov2005@gmail.com', // Change to your recipient
        from: 'gameofclues.pz@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      };

      sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })

})

module.exports = router;