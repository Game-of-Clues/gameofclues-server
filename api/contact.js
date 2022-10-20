const router = require('express').Router();
const models = require('../models');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/', async (req, res, next) => {

    const contact = new models.Contact({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        content: req.body.content
    });

    await contact.save();

    const msg = {
        to: 'gameofclues.pz@gmail.com', // Change to your recipient
        from: 'gameofclues.pz@gmail.com', // Change to your verified sender
        subject: `${contact.subject}`,
        text: `${contact.name} send you a message with text ${contact.content}. You can contact ${contact.name} on ${contact.email}.`,
    };

    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        });

    res.send(contact._id);
})

module.exports = router;