const router = require('express').Router();
const models = require('../models');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get('/', (req, res, next) => {
    models.Reservation.find()
        .then(reservations => res.send(reservations))
        .catch(next);
})

router.post('/', async (req, res, next) => {

    const reservation = new models.Reservation({
        duration: +req.body.duration,
        people: +req.body.people,
        gameType: req.body.gameType,
        date: req.body.date,
        time: req.body.time,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email
    });

    await reservation.save();

    const msg = {
        to: 'gameofclues.pz@gmail.com', // Change to your recipient
        from: 'gameofclues.pz@gmail.com', // Change to your verified sender
        subject: `Reservation from ${reservation.name}`,
        text: `${reservation.name} wants to reserve a ${reservation.gameType} game for ${reservation.people} people. The game lasts ${reservation.duration} minutes and takes place on ${reservation.date} at ${reservation.time}. You can contact ${reservation.name} on ${reservation.email} or ${reservation.phoneNumber}`,
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