const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');


router.post('/send-contact-mail', (req, res) => {
    const output = `
        <p>You have a new contact message</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
            <li>Message ${req.body.message}</li>
        </ul>
    `;
    // res.send(output);
    console.log(output);
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,// true for 587, false for other ports
        auth: {
            user: 'membership@aaoaus.com', // generated ethereal user
            pass: 'M@tt1010' // generated ethereal password
        },
        // Dev environment
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Membership Team" <membership@aaoaus.com>', // sender address
        to: 'membership@aaoaus.com', // list of receivers
        subject: 'Contact Message', // Subject line
        text: '', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('sendMail error: ', error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.json({
            success: true,
            msg: 'email sent'
        });
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});

// SEPERATOR ==========================================================================

router.post('/send-nominate-mail', (req, res) => {
    const output = `
        <p>You have a new nomination message</p>
        <h3>Nominee Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
            <li>Message: ${req.body.message}</li>
        </ul>
    `;
    console.log(output);
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,// true for 587, false for other ports
        auth: {
            user: 'membership@aaoaus.com', // generated ethereal user
            pass: 'M@tt1010' // generated ethereal password
        },
        // Dev environment
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Membership Team" <membership@aaoaus.com>', // sender address
        to: 'membership@aaoaus.com', // list of receivers
        subject: 'Nomination Message', // Subject line
        text: '', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('sendMail error: ', error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.json({
            success: true,
            msg: 'email sent'
        });
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});



module.exports = router;
