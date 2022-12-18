const router = require('express').Router();
const models = require('../models');
const jwt = require('../modules/jwt');
const bcrypt = require("bcrypt");

router.post('/register', (req, res, next) => {
    const { email, firstName, lastName, password, isAdmin } = req.body;

    bcrypt.hash(password, 10)
        .then(password => {
            models.User.create({ email, firstName, lastName, password, isAdmin: isAdmin || false })
                .then((user) => res.send(user))
                .catch(next);
        })
        .catch(err => {
            console.log(err)
        });
});

router.post('/login', (req, res, next) => {
    const { email, password } = req.body;

    models.User.findOne({ email })
        .then(user => {
            if (!user)
            {
                res.send({ error: 'No such user in the database!' });
                return;
            }
            bcrypt.compare(password, user.get('password'))
                .then(result => {
                    if (!result) {
                        res.send({ error:'Passwords did not match'})
                    }
                    jwt
                        .create({ id: user._id })
                        .then(token => {
                            res.cookie('auth_cookie', token, { httpOnly: true });
                            res.send({ token });
                        });
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(next);
});

module.exports = router;