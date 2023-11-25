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

router.post('/', (req, res, next) => {
    const { gameId, duration, players, price, date, time, name, phoneNumber, email } = req.body;

    models.Reservation.create({ gameId, duration, players, price, date, time, name, phoneNumber, email })
        .then(reservation => {
            models.Game.findById(gameId)
                .then(game => {
                    const msg = {
                        to: 'gameofclues.pz@gmail.com',
                        from: 'gameofclues.pz@gmail.com',
                        subject: `Reservation from ${reservation.name}`,
                        text: `${reservation.name} wants to reserve the game "${game.name}" for ${reservation.players} people. The game lasts ${reservation.duration} minutes and takes place on ${reservation.date} at ${reservation.time}. The price of the game is ${reservation.price} You can contact ${reservation.name} on ${reservation.email} or ${reservation.phoneNumber}.`,
                    };
                    sgMail.send(msg);

                    res.send(reservation._id);
                });

        })
        .catch(next);
});

module.exports = router;