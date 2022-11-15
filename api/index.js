const router = require('express').Router();
const models = require('../models');
const jwt = require('../modules/jwt');
const userRouter = require('./user');
const faqRouter = require('./faq');
const contactRouter = require('./contact');
const teamMemberRouter = require('./teamMember');
const reservationRouter = require('./reservation');

router.get('/', (req, res) => {
    res.send('Hello, world');
});

router.post('/register', (req, res, next) => {
    const { email, firstName, lastName, password, isAdmin } = req.body;
    models.User.create({ email, firstName, lastName, password, isAdmin: isAdmin || false })
        .then((user) => res.send(user))
        .catch(next);
});

router.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    models.User.findOne({ email }).then(user => {
        if (!user) { res.send({ error: '[NOT_FOUND]' }); return; }
        return Promise.all([user, jwt.create({ id: user._id })]);
    }).then(([user, token]) => {
        res.cookie('auth_cookie', token, { httpOnly: true });
        res.send({ user });
    }).catch(next);
});

router.use('/user', userRouter);
router.use('/faq', faqRouter);
router.use('/contact', contactRouter);
router.use('/team-member', teamMemberRouter);
router.use('/reservation', reservationRouter);
module.exports = router;