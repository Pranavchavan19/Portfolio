const nodemailer = require('nodemailer');

// Create a Nodemailer transporter (Gmail example)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pranav1952000@gmail.com',  // Your Gmail address
        pass: 'mixd gchk opcy zdtc',     // Your Gmail App Password (ensure it's correct)
    },
    tls: {
        rejectUnauthorized: false,  // Allow self-signed certificates (for dev only)
    }
});

// Define the serverless function
module.exports = async (req, res) => {
    if (req.method === 'POST') {
        // Extract the form data
        const { name, email, subject, message } = req.body;

        // Setup email details
        const mailOptions = {
            from: email,
            to: 'pranav1952000@gmail.com',  // Where the email is sent
            subject: subject || 'Contact Form Submission',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };

        try {
            // Send the email
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent:', info.response);

            // Redirect to thank you page
            res.redirect(302, '/thank-you');
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email.');
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
};
