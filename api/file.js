const router = require('express').Router();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

router.post('/upload', (req, res, next) => {
    let {image} = req.body;

    cloudinary.uploader
        .upload(image)
        .then(result => {
            res.send(result);
        })
        .catch(next);
});

module.exports = router;