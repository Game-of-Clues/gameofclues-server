const router = require('express').Router();
const models = require('../models');
const auth = require('../modules/auth');

router.get('/:id', auth(), (req, res, next) => {
    models.User.find({ _id: req.params.id })
        .then(users => res.send(users))
        .catch(next);
});

router.get('/', auth(true), (req, res, next) => {
    models.User.find()
        .then(users => res.send(users))
        .catch(next);
});

router.put('/', auth(), (req, res, next) => {
    const { email, firstName, lastName } = req.body;

    models.User
        .updateOne({ _id: req.user._id }, { email, firstName, lastName })
        .then(result => res.send(result.acknowledged))
        .catch(next);
});

router.delete('/', auth(), (req, res, next) => {
    //TODO: Delete user's reservations

    models.User.deleteOne({ _id: req.user.id })
        .then(result => res.send(result.acknowledged))
        .catch(next);
});

module.exports = router;