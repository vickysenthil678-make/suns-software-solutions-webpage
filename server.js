import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import multer from 'multer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and Word documents are allowed'));
    }
  }
});

// Email configuration
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Test email connection
transporter.verify((error, success) => {
  if (error) {
    console.log('Email configuration error:', error);
  } else {
    console.log('✓ Email server ready');
  }
});

// Career Enquiry Endpoint
app.post('/api/careers', upload.single('resume'), async (req, res) => {
  try {
    const { fullName, email, phone, qualification, address, city, state, level, message } = req.body;

    // Validation
    if (!fullName || !email || !phone || !qualification || !address || !city || !state || !level || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Resume file is required' });
    }

    // Send confirmation email to applicant
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Career Application Received - Sun Software Solutions',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #f7941d;">Application Received</h2>
          <p>Dear ${fullName},</p>
          <p>Thank you for your interest in Sun Software Solutions. We have received your career enquiry with the following details:</p>
          
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Qualification:</strong> ${qualification}</p>
            <p><strong>Location:</strong> ${city}, ${state}</p>
            <p><strong>Position Level:</strong> ${level}</p>
          </div>
          
          <p>Our team will review your application and get back to you within 2 business days.</p>
          
          <p>Best regards,<br>
          <strong>Sun Software Solutions</strong><br>
          Coimbatore & Tiruppur, Tamil Nadu</p>
        </div>
      `
    };

    // Send notification email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Career Application - ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Career Application</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Qualification:</strong> ${qualification}</p>
          <p><strong>Address:</strong> ${address}</p>
          <p><strong>City:</strong> ${city}</p>
          <p><strong>State:</strong> ${state}</p>
          <p><strong>Position Level:</strong> ${level}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <p><strong>Resume:</strong> ${req.file.originalname} (attached)</p>
        </div>
      `,
      attachments: [{
        filename: req.file.originalname,
        content: req.file.buffer
      }]
    };

    // Send both emails
    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);

    res.json({ 
      success: true, 
      message: `Thanks ${fullName}. Your enquiry has been received — our team will review it and get back to you within two business days.` 
    });

  } catch (error) {
    console.error('Career endpoint error:', error);
    res.status(500).json({ error: 'Error processing your application. Please try again.' });
  }
});

// Contact Enquiry Endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (name.trim().length < 2) {
      return res.status(400).json({ error: 'Name must be at least 2 characters' });
    }

    if (message.trim().length < 10) {
      return res.status(400).json({ error: 'Message must be at least 10 characters' });
    }

    // Send confirmation email to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'We Received Your Message - Sun Software Solutions',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #f7941d;">Message Received</h2>
          <p>Dear ${name},</p>
          <p>Thank you for reaching out to Sun Software Solutions. We have received your message and will get back to you as soon as possible.</p>
          
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Your Message:</strong></p>
            <p>${message}</p>
          </div>
          
          <p>Best regards,<br>
          <strong>Sun Software Solutions</strong><br>
          Coimbatore & Tiruppur, Tamil Nadu</p>
        </div>
      `
    };

    // Send notification email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Enquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Contact Enquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `
    };

    // Send both emails
    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);

    res.json({ 
      success: true, 
      message: 'Thanks for reaching out! We will get back to you soon.' 
    });

  } catch (error) {
    console.error('Contact endpoint error:', error);
    res.status(500).json({ error: 'Error sending your message. Please try again.' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`📧 Email notifications enabled`);
});
