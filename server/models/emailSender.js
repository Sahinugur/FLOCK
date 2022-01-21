const nodemailer = require('nodemailer');
require('dotenv').config()

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

function sendEmail(name, email, message, cb) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.OWNER_EMAIL,
        subject: 'Message using your website from ' + name,
        text: 'Name: ' + name + '\n\n' + message + '\n\n' + 'Email: ' + email
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            cb(false ,err);
        } else {
            cb(true, info);
        }
    })
}

function confirmEmail(userEmail, name, id) {
    function isConfirmed () {
        console.log('clicked');
    }
    return new Promise((resolve, reject) => {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: 'Confirm your email',
            html: `<h1>Welcome to your Web Universe!</h1>,${name}!</h1>
            <p >Please click on the link below to confirm your email address.</p>
            <a  onClick=${isConfirmed} href="${process.env.WEB_HOST}/confirm/${id}">Confirm email</a>`
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                reject(err);
            } else {
                resolve(info);
                console.log('info', info);
            }
        });
    })
}

module.exports = {sendEmail, confirmEmail}