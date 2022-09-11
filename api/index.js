const router = require('express').Router();
const models = require('../models');
const userRouter = require('./user');
const reservationRouter = require('./user');

router.post('/register', (req, res, next) => {
    const { email, firstName, lastName, password } = req.body;
    models.User.create({ email, firstName, lastName, password })
    .then(users => res.send(users))
    .catch(next);
});

router.get('/', (req, res) => {
    res.send('Hello, world!');
});

router.use('/user', userRouter);
router.use('/reservation', reservationRouter);
module.exports = router;