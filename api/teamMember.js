const router = require('express').Router();
const models = require('../models');

router.get('/', (req, res, next) => {
    models.TeamMember.find()
        .then(teamMembers => res.send(teamMembers))
        .catch(next);
})

router.post('/', async (req, res, next) => {

    const teamMember = new models.TeamMember({
        name: req.body.name,
        role: req.body.role,
        photoUrl: req.body.photoUrl
    });

    await teamMember.save();

    res.send(teamMember._id);
})

module.exports = router;