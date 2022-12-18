const router = require('express').Router();
const models = require('../models');
const auth = require('../modules/auth');
const sgMail = require('../modules/sgMail');

router.get('/:id', auth(), (req, res, next) => {
    models.Reservation
        .findById(req.params.id)
        .then(reservation => {
            res.send(reservation);
        })
        .catch(next);
});

router.get('/', auth(true), (req, res, next) => {
    models.Reservation.find()
        .then(reservations => res.send(reservations))
        .catch(next);
});

// TODO router.get('/mine', auth(), (req, res, next) => {});

router.post('/', auth(), (req, res, next) => {
    const { duration, people, gameType, date, time, name, phoneNumber, email } = req.body;

    models.Reservation.create({ duration, people, gameType, date, time, name, phoneNumber, email })
        .then(reservation => {
            const msg = {
                to: 'gameofclues.pz@gmail.com',
                from: 'gameofclues.pz@gmail.com',
                subject: `Reservation from ${reservation.name}`,
                text: `${reservation.name} wants to reserve a ${reservation.gameType} game for ${reservation.people} people. The game lasts ${reservation.duration} minutes and takes place on ${reservation.date} at ${reservation.time}. You can contact ${reservation.name} on ${reservation.email} or ${reservation.phoneNumber}`,
            };
            sgMail.send(msg);

            res.send(reservation._id);
        })
        .catch(next);
});

module.exports = router;