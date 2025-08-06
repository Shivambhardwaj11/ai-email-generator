const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { generateEmail } = require('../services/geminiService');

// Generate Email via Gemini
router.post('/generate-email', async (req, res) => {
  const { prompt } = req.body;

  try {
    const emailContent = await generateEmail(prompt);
    res.json({ email: emailContent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Send Email via Nodemailer
router.post('/send-email', async (req, res) => {
  const { recipients, subject, body } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD, // app password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: recipients,
    subject: subject || "AI-Generated Email",
    html: body,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    console.error("Email sending error:", err.message);
    res.status(500).json({ error: "Failed to send email" });
  }
});

module.exports = router;
