const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

router.post('/store-contact', (req, res) => {
    const newDate = new Date();
    const date = `
    ${newDate.getMonth() + 1}-
    ${newDate.getDate()}-
    ${newDate.getFullYear()}::
    ${newDate.getHours()}:
    ${newDate.getMinutes()}
    `;

    let newContact = new Contact({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        message: req.body.message,
        date: date
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

router.get('/get-all-contacts', (req, res, next) => {
    Contact.getAllContacts({}, (err, contacts) => {
        if (err) throw err;
        res.json({contacts});

    })
});


module.exports = router;