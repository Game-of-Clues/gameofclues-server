const router = require('express').Router();
const models = require('../models');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get('/', (req, res, next) => {
    models.Faq.find()
        .then(faqs => res.send(faqs))
        .catch(next);
})

router.post('/', async (req, res, next) => {

    const faq = new models.Faq({
        questions: req.body.questions,
        answer: req.body.answer
    });

    await faq.save();

    res.send(faq._id);
})

module.exports = router;