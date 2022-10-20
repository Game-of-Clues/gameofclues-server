const router = require('express').Router();
const models = require('../models');

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