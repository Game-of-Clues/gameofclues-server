const router = require('express').Router();
const models = require('../models');
const authRouter = require('./auth');
const faqRouter = require('./faq');
const fileRouter = require('./file');
const gameRouter = require('./game');
const reservationRouter = require('./reservation');
const teamMemberRouter = require('./teamMember');
const userRouter = require('./user');
const sgMail = require("../modules/sgMail");

router.get('/', (req, res) => {
    res.send('Game of Clues Server is up and running!');
});

router.post('/contact-us', (req, res, next) => {
    const { name, email, subject, content } = req.body;

    models.Contact.create({ name, email, subject, content })
        .then(contact => {
            const msg = {
                to: 'gameofclues.pz@gmail.com',
                from: 'gameofclues.pz@gmail.com',
                subject: `${contact.subject}`,
                text: `${contact.name} send you a message with text ${contact.content}. You can contact ${contact.name} on ${contact.email}.`,
            };
            sgMail.send(msg);

            res.send(contact._id);
        })
        .catch(next);
});

router.use('/auth', authRouter);
router.use('/faq', faqRouter);
router.use('/file', fileRouter);
router.use('/game', gameRouter);
router.use('/reservation', reservationRouter);
router.use('/team-member', teamMemberRouter);
router.use('/user', userRouter);

module.exports = router;