
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

// Create Express app
const app = express();
const PORT = 3001;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (index.html, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail or another service
    auth: {
        user: 'pranav1952000@gmail.com',  // Replace with your Gmail address
        pass: 'mixd gchk opcy zdtc',     // Replace with your Gmail App Password (if 2FA is enabled)
    },
    tls: {
        rejectUnauthorized: false  // Allow self-signed certificates (for development only)
    }
});


app.get('/thank-you', (req, res) => {
    res.sendFile(__dirname + '/public/thank-you.html'); // Assuming your HTML is in the /public folder
});


// Handle form submission at /send-email endpoint
app.post('/send-email', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Set up the email content
    const mailOptions = {
        from: email,  // The email provided by the user in the form
        to: 'pranav1952000@gmail.com',  // Your email address to receive the message
        subject: subject || 'Contact Form Submission',  // Default subject if not provided
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,  // Email body content
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email.');
        } else {
            console.log('Email sent:', info.response);
            // res.send('Thank you for your message! We will get back to you soon.');
            res.redirect('/thank-you');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
