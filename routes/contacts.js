const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

router.post('/store-contact', (req, res) => {
    let newContact = new Contact({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        message: req.body.message
    });

    console.log(newContact);

    Contact.storeContact(newContact, (err, results) => {
        if(err) {
            res.json({
                success: false,
                error: err
            });
        } else {
            res.json({
                success: true,
                contact: results
            });
        }
    });
});


module.exports = router;