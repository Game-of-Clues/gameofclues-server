const router = require('express').Router();
const models = require('../models');
const auth = require('../modules/auth');

router.get('/:id', (req, res, next) => {
    models.Game
        .findById(req.params.id)
        .then(game => {
            res.send(game);
        })
        .catch(next);
});

router.get('/', (req, res, next) => {
    models.Game.find()
        .then(games => res.send(games))
        .catch(next);
});

router.post('/', auth(true), (req, res, next) => {
    const { name, imageUrl, description } = req.body;

    models.Game.create({ name, imageUrl, description })
        .then(game => res.send(game._id))
        .catch(next);
});

router.put('/:id', auth(true), (req, res, next) => {
    const { name, photoUrl, description } = req.body;

    models.Game
        .updateOne({ _id: req.params.id }, { name, photoUrl, description })
        .then((result) => res.send(result.acknowledged))
        .catch(next);
});

router.delete('/:id', auth(true), (req, res, next) => {
    models.Game
        .deleteOne({ _id: req.params.id })
        .then((result) => res.send(result.acknowledged))
        .catch(next);
});

module.exports = router;