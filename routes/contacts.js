const express   = require('express');
const router    = express.Router();
const nodemailer = require('nodemailer');


router
    .post('/send-mail', (req , res)=>{
        let clientObject = {
            name : req.body.name , 
            email : req.body.email , 
            message: req.body.message
        }
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'michmosh1@gmail.com', // generated ethereal user
                pass: 'firewire' // generated ethereal password
            }
        });
    
        // setup email data with unicode symbols
        let mailOptions = {
            from: `${clientObject.name} <${clientObject.email}>`, // sender address
            to: 'michmosh1@gmail.com, michmosh1@gmail.com', // list of receivers
            subject: 'LAREN`A ✔', // Subject line
            text: `${clientObject.message}` // html body
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            res.send('mail sent');
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    })

module.exports = router;