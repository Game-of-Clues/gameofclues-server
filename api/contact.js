const router = require('express').Router();
const models = require('../models');
const auth = require('../modules/auth');

router.get('/:id', auth(true), (req, res, next) => {
    models.Contact
        .findById(req.params.id)
        .then(contact => {
            res.send(contact);
        })
        .catch(next);
});

router.get('/', (req, res, next) => {
    models.Contact.find()
        .then(contacts => res.send(contacts))
        .catch(next);
});


router.delete('/:id', auth(true), (req, res, next) => {
    models.Contact
        .deleteOne({ _id: req.params.id })
        .then((result) => res.send(result.acknowledged))
        .catch(next);
});

module.exports = router;