const router = require('express').Router();
const models = require('../models');
const auth = require('../modules/auth');

router.get('/:id', auth(true), (req, res, next) => {
    models.Faq
        .findById(req.params.id)
        .then(faq => {
            res.send(faq);
        })
        .catch(next);
});

router.get('/', (req, res, next) => {
    models.Faq.find()
        .then(faqs => res.send(faqs))
        .catch(next);
});

router.post('/', auth(true), (req, res, next) => {
    const { question, answer } = req.body;

    models.Faq.create({ question, answer })
        .then(faq => res.send(faq._id))
        .catch(next);
});

router.put('/:id', auth(true), (req, res, next) => {
    const { question, answer } = req.body;

    models.Faq
        .updateOne({ _id: req.params.id }, { question, answer })
        .then((result) => res.send(result.acknowledged))
        .catch(next);
});

router.delete('/:id', auth(true), (req, res, next) => {
    models.Faq
        .deleteOne({ _id: req.params.id })
        .then((result) => res.send(result.acknowledged))
        .catch(next);
});

module.exports = router;