const router = require('express').Router();
const models = require('../models');
const auth = require('../modules/auth');

router.get('/:id', auth(true), (req, res, next) => {
    models.TeamMember
        .findById(req.params.id)
        .then(teamMember => {
            res.send(teamMember);
        })
        .catch(next);
});

router.get('/', (req, res, next) => {
    models.TeamMember.find()
        .then(teamMembers => res.send(teamMembers))
        .catch(next);
});

router.post('/', auth(true), (req, res, next) => {
    const { name, role, photoUrl, facebook, instagram } = req.body;

    models.TeamMember.create({ name, role, photoUrl, facebook, instagram })
        .then(teamMember => res.send(teamMember._id))
        .catch(next);
});

router.put('/:id', auth(true), (req, res, next) => {
    const { name, role, photoUrl, facebook, instagram } = req.body;

    models.TeamMember
        .updateOne({ _id: req.params.id }, { name, role, photoUrl, facebook, instagram })
        .then((result) => res.send(result.acknowledged))
        .catch(next);
});

router.delete('/:id', auth(true), (req, res, next) => {
    models.TeamMember
        .deleteOne({ _id: req.params.id })
        .then((result) => res.send(result.acknowledged))
        .catch(next);
});

module.exports = router;