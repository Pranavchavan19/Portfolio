const nodemailer = require('nodemailer');

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pranav1952000@gmail.com', // Your Gmail address
        pass: 'mixd gchk opcy zdtc',     // Your Gmail App Password (ensure it's correct)
    },
    tls: {
        rejectUnauthorized: false, // Allow self-signed certificates (for dev only)
    }
});

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { name, email, subject, message } = req.body;

        // Set up email details
        const mailOptions = {
            from: email,  // Email provided by the user
            to: 'pranav1952000@gmail.com', // Email to receive the message
            subject: subject || 'Contact Form Submission',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // Email body
        };

        try {
            // Send the email
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent:', info.response);

            // Redirect to thank-you page
            res.redirect(302, '/thank-you.html'); // Redirect to thank-you.html
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email.');
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
};
