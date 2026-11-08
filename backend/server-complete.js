import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';
import multer from 'multer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';
import sanitizeHtml from 'sanitize-html';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// ===== SECURITY & PERFORMANCE MIDDLEWARE =====

// Helmet for security headers
app.use(helmet());

// Compression middleware
app.use(compression());

// Morgan logging
app.use(morgan('combined', {
  stream: fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' })
}));
app.use(morgan('dev'));

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Rate limiting to prevent spam/abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 requests per windowMs
  message: 'Too many submissions from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => process.env.NODE_ENV === 'development'
});

const stricterLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 requests per hour
  message: 'Too many form submissions, please try again later.',
  standardHeaders: true
});

// ===== FILE UPLOAD CONFIGURATION =====

// Create logs directory if it doesn't exist
if (!fs.existsSync(path.join(__dirname, 'logs'))) {
  fs.mkdirSync(path.join(__dirname, 'logs'));
}

// Create uploads directory if it doesn't exist
if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
  fs.mkdirSync(path.join(__dirname, 'uploads'));
}

// Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    const timestamp = Date.now();
    const uuid = uuidv4().substring(0, 8);
    cb(null, `${name}-${timestamp}-${uuid}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    const allowedExts = ['.pdf', '.doc', '.docx'];
    
    const ext = path.extname(file.originalname).toLowerCase();
    
    if (!allowedMimes.includes(file.mimetype) || !allowedExts.includes(ext)) {
      cb(new Error('Only PDF and Word documents (DOC, DOCX) are allowed'));
    } else {
      cb(null, true);
    }
  }
});

// ===== EMAIL CONFIGURATION =====

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Verify email connection
transporter.verify((error, success) => {
  if (error) {
    console.log('⚠️  Email configuration error:', error.message);
    console.log('📧 Emails will not be sent until configuration is fixed');
  } else {
    console.log('✅ Email server ready');
  }
});

// ===== VALIDATION UTILITIES =====

const validateContactForm = (data) => {
  const errors = {};

  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  if (data.name && data.name.length > 100) {
    errors.name = 'Name cannot exceed 100 characters';
  }

  // Email validation
  if (!data.email || !validator.isEmail(data.email)) {
    errors.email = 'Valid email is required';
  }

  // Message validation
  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }
  if (data.message && data.message.length > 5000) {
    errors.message = 'Message cannot exceed 5000 characters';
  }

  return errors;
};

const validateCareersForm = (data, file) => {
  const errors = {};

  // Full name validation
  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters';
  }
  if (data.fullName && data.fullName.length > 100) {
    errors.fullName = 'Full name cannot exceed 100 characters';
  }

  // Email validation
  if (!data.email || !validator.isEmail(data.email)) {
    errors.email = 'Valid email is required';
  }

  // Phone validation
  const phoneDigits = (data.phone || '').replace(/\D/g, '');
  if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    errors.phone = 'Phone must have 7-15 digits';
  }

  // Qualification validation
  if (!data.qualification || data.qualification.trim().length < 2) {
    errors.qualification = 'Qualification is required';
  }
  if (data.qualification && data.qualification.length > 500) {
    errors.qualification = 'Qualification cannot exceed 500 characters';
  }

  // Address validation
  if (!data.address || data.address.trim().length < 5) {
    errors.address = 'Valid address is required';
  }
  if (data.address && data.address.length > 1000) {
    errors.address = 'Address cannot exceed 1000 characters';
  }

  // City validation
  if (!data.city || data.city.trim().length < 2) {
    errors.city = 'City is required';
  }
  if (data.city && data.city.length > 100) {
    errors.city = 'City cannot exceed 100 characters';
  }

  // State validation
  if (!data.state || data.state.trim().length < 2) {
    errors.state = 'State is required';
  }
  if (data.state && data.state.length > 100) {
    errors.state = 'State cannot exceed 100 characters';
  }

  // Level validation
  const validLevels = ['fresher', 'junior', 'mid', 'senior', 'lead'];
  if (!data.level || !validLevels.includes(data.level)) {
    errors.level = 'Invalid position level selected';
  }

  // Message validation
  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }
  if (data.message && data.message.length > 5000) {
    errors.message = 'Message cannot exceed 5000 characters';
  }

  // File validation
  if (!file) {
    errors.resume = 'Resume file is required';
  }

  return errors;
};

// ===== SANITIZATION UTILITIES =====

const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return sanitizeHtml(input.trim(), {
    allowedTags: [],
    allowedAttributes: {}
  });
};

const sanitizeFormData = (data) => {
  const sanitized = {};
  for (const [key, value] of Object.entries(data)) {
    sanitized[key] = typeof value === 'string' ? sanitizeInput(value) : value;
  }
  return sanitized;
};

// ===== EMAIL TEMPLATE FUNCTIONS =====

const getContactConfirmationEmail = (name, message) => ({
  subject: '✅ We Received Your Message - Sun Software Solutions',
  html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Manrope', Arial, sans-serif; line-height: 1.6; color: #121b2e; }
        .container { max-width: 600px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #f9a11b, #ef6c00); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .header h2 { font-size: 24px; margin: 0; }
        .content { background: #f5f5f5; padding: 30px; }
        .message-box { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #f7941d; border-radius: 4px; }
        .footer { background: #121b2e; color: white; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; }
        a { color: #f7941d; text-decoration: none; }
        .btn { display: inline-block; padding: 10px 20px; background: #f7941d; color: white; border-radius: 4px; margin-top: 15px; }
        .timestamp { font-size: 12px; color: #999; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>💬 Message Received</h2>
        </div>
        <div class="content">
            <p>Dear <strong>${sanitizeInput(name)}</strong>,</p>
            
            <p>Thank you for reaching out to Sun Software Solutions! We have received your message and appreciate you taking the time to contact us.</p>
            
            <div class="message-box">
                <p><strong>Your Message:</strong></p>
                <p>${sanitizeInput(message)}</p>
            </div>
            
            <p>Our team will review your message and respond within <strong>24 business hours</strong>. We look forward to discussing your project with you.</p>
            
            <p>If you have any urgent matters, please contact us directly:<br>
            📞 <a href="tel:+914222230025">+91 (422) 223-0025</a><br>
            📧 <a href="mailto:hello@sunsoftware.co.in">hello@sunsoftware.co.in</a></p>
        </div>
        <div class="footer">
            <p><strong>Sun Software Solutions</strong></p>
            <p>Coimbatore & Tiruppur, Tamil Nadu, India</p>
            <p><a href="https://sunsoftware.co.in">Visit our website</a></p>
            <p class="timestamp">Message received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
        </div>
    </div>
</body>
</html>
  `
});

const getContactAdminEmail = (name, email, message) => ({
  subject: `💬 New Contact Enquiry from ${sanitizeInput(name)}`,
  html: `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        td { padding: 10px; border: 1px solid #ddd; }
        .label { font-weight: bold; background: #f0f0f0; width: 150px; }
        .timestamp { font-size: 12px; color: #999; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <h2>New Contact Enquiry</h2>
        
        <table>
            <tr>
                <td class="label">Name:</td>
                <td>${sanitizeInput(name)}</td>
            </tr>
            <tr>
                <td class="label">Email:</td>
                <td><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
                <td class="label">Message:</td>
                <td>${sanitizeInput(message).replace(/\n/g, '<br>')}</td>
            </tr>
            <tr>
                <td class="label">Received:</td>
                <td>${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>
            </tr>
        </table>
        
        <p><strong>Action Required:</strong> Reply to ${email}</p>
    </div>
</body>
</html>
  `
});

const getCareersConfirmationEmail = (name, position, city, state) => ({
  subject: '✅ Career Application Received - Sun Software Solutions',
  html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Manrope', Arial, sans-serif; line-height: 1.6; color: #121b2e; }
        .container { max-width: 600px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #f9a11b, #ef6c00); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .header h2 { font-size: 24px; margin: 0; }
        .content { background: #f5f5f5; padding: 30px; }
        .detail-box { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #f7941d; border-radius: 4px; }
        .footer { background: #121b2e; color: white; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; }
        .timestamp { font-size: 12px; color: #999; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>📋 Application Received</h2>
        </div>
        <div class="content">
            <p>Dear <strong>${sanitizeInput(name)}</strong>,</p>
            
            <p>Thank you for your interest in Sun Software Solutions! We have received your career application and appreciate your enthusiasm to join our team.</p>
            
            <div class="detail-box">
                <p><strong>Position Level:</strong> ${sanitizeInput(position)}</p>
                <p><strong>Location:</strong> ${sanitizeInput(city)}, ${sanitizeInput(state)}</p>
                <p><strong>Application Status:</strong> Under Review</p>
            </div>
            
            <p>Our recruitment team will carefully review your application and resume. We typically complete our review process within <strong>2-3 business days</strong>.</p>
            
            <p>If your profile matches our requirements, we will reach out to you for an interview. We appreciate your patience and the opportunity to consider you for our team.</p>
            
            <p>Best regards,<br>
            <strong>Sun Software Solutions</strong><br>
            HR & Recruitment Team</p>
        </div>
        <div class="footer">
            <p><strong>Sun Software Solutions</strong></p>
            <p>Coimbatore & Tiruppur, Tamil Nadu, India</p>
            <p>📞 <a href="tel:+914222230025" style="color: #ffc247;">+91 (422) 223-0025</a></p>
            <p class="timestamp">Application received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
        </div>
    </div>
</body>
</html>
  `
});

const getCareersAdminEmail = (fullName, email, phone, qualification, address, city, state, level, message, resumeFilename) => ({
  subject: `🎯 New Career Application from ${sanitizeInput(fullName)}`,
  html: `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background: #f9f9f9; }
        .container { max-width: 700px; margin: 0 auto; padding: 20px; background: white; border-radius: 8px; }
        h2 { color: #f7941d; border-bottom: 2px solid #f7941d; padding-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        td { padding: 12px; border: 1px solid #e0e0e0; }
        .label { font-weight: bold; background: #f5f5f5; width: 200px; }
        .message-section { background: #f0f8ff; padding: 15px; border-radius: 4px; margin: 15px 0; }
        .action-box { background: #fff8dc; padding: 15px; border-left: 4px solid #f7941d; margin-top: 20px; border-radius: 4px; }
        .timestamp { font-size: 12px; color: #999; margin-top: 20px; }
        a { color: #f7941d; text-decoration: none; }
    </style>
</head>
<body>
    <div class="container">
        <h2>🎯 New Career Application</h2>
        
        <table>
            <tr>
                <td class="label">Applicant Name:</td>
                <td><strong>${sanitizeInput(fullName)}</strong></td>
            </tr>
            <tr>
                <td class="label">Email:</td>
                <td><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
                <td class="label">Phone:</td>
                <td><a href="tel:${phone}">${phone}</a></td>
            </tr>
            <tr>
                <td class="label">Qualification:</td>
                <td>${sanitizeInput(qualification)}</td>
            </tr>
            <tr>
                <td class="label">Position Level:</td>
                <td><strong>${sanitizeInput(level).toUpperCase()}</strong></td>
            </tr>
            <tr>
                <td class="label">Location:</td>
                <td>${sanitizeInput(city)}, ${sanitizeInput(state)}</td>
            </tr>
            <tr>
                <td class="label">Address:</td>
                <td>${sanitizeInput(address)}</td>
            </tr>
            <tr>
                <td class="label">Resume:</td>
                <td>${resumeFilename}</td>
            </tr>
        </table>
        
        <div class="message-section">
            <strong>About the Applicant:</strong>
            <p>${sanitizeInput(message).replace(/\n/g, '<br>')}</p>
        </div>
        
        <div class="action-box">
            <strong>Next Steps:</strong>
            <p>1. Review the attached resume</p>
            <p>2. Check application details above</p>
            <p>3. Contact applicant at ${email} or ${phone}</p>
            <p>4. Schedule interview if interested</p>
        </div>
        
        <p class="timestamp">Application received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
    </div>
</body>
</html>
  `
});

// ===== API ROUTES =====

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: '✅ Server is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Contact form endpoint
app.post('/api/contact', limiter, async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const clientIp = req.ip;
    const requestId = uuidv4();

    // Sanitize inputs
    const sanitized = sanitizeFormData({ name, email, message });

    // Validate
    const errors = validateContactForm(sanitized);
    if (Object.keys(errors).length > 0) {
      console.warn(`⚠️  Contact form validation error (${requestId}):`, errors);
      return res.status(400).json({ success: false, errors });
    }

    console.log(`📨 Processing contact form (${requestId}) from ${clientIp}`);

    // Send emails
    try {
      const userEmailConfig = getContactConfirmationEmail(sanitized.name, sanitized.message);
      await transporter.sendMail({
        from: `Sun Software Solutions <${process.env.EMAIL_USER}>`,
        to: sanitized.email,
        subject: userEmailConfig.subject,
        html: userEmailConfig.html
      });

      const adminEmailConfig = getContactAdminEmail(sanitized.name, sanitized.email, sanitized.message);
      await transporter.sendMail({
        from: `Sun Software Solutions <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: adminEmailConfig.subject,
        html: adminEmailConfig.html
      });

      console.log(`✅ Contact form processed successfully (${requestId})`);

      res.json({
        success: true,
        message: `Thanks for reaching out! We'll get back to you soon at ${sanitized.email}.`,
        requestId
      });

    } catch (emailError) {
      console.error(`❌ Email sending error (${requestId}):`, emailError.message);
      
      // Still return success to user but log the email error
      res.json({
        success: true,
        message: 'Your message has been received. Emails could not be sent, but our team will follow up.',
        requestId,
        warning: 'Email notification failed'
      });
    }

  } catch (error) {
    console.error('❌ Contact endpoint error:', error.message);
    res.status(500).json({
      success: false,
      error: 'An error occurred processing your request. Please try again.'
    });
  }
});

// Careers application endpoint
app.post('/api/careers', stricterLimiter, upload.single('resume'), async (req, res) => {
  let uploadedFile = null;
  
  try {
    const { fullName, email, phone, qualification, address, city, state, level, message } = req.body;
    const clientIp = req.ip;
    const requestId = uuidv4();

    // Store file reference
    uploadedFile = req.file;

    // Sanitize inputs
    const sanitized = sanitizeFormData({ fullName, email, phone, qualification, address, city, state, level, message });

    // Validate
    const errors = validateCareersForm(sanitized, req.file);
    if (Object.keys(errors).length > 0) {
      // Clean up uploaded file if validation fails
      if (uploadedFile) {
        fs.unlink(uploadedFile.path, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      }
      console.warn(`⚠️  Careers form validation error (${requestId}):`, errors);
      return res.status(400).json({ success: false, errors });
    }

    console.log(`📨 Processing careers application (${requestId}) from ${clientIp}`);

    // Send emails
    try {
      const userEmailConfig = getCareersConfirmationEmail(sanitized.fullName, sanitized.level, sanitized.city, sanitized.state);
      await transporter.sendMail({
        from: `Sun Software Solutions <${process.env.EMAIL_USER}>`,
        to: sanitized.email,
        subject: userEmailConfig.subject,
        html: userEmailConfig.html
      });

      const adminEmailConfig = getCareersAdminEmail(
        sanitized.fullName, sanitized.email, sanitized.phone, sanitized.qualification,
        sanitized.address, sanitized.city, sanitized.state, sanitized.level, sanitized.message,
        uploadedFile ? uploadedFile.originalname : 'N/A'
      );

      await transporter.sendMail({
        from: `Sun Software Solutions <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: adminEmailConfig.subject,
        html: adminEmailConfig.html,
        attachments: uploadedFile ? [{
          filename: uploadedFile.originalname,
          path: uploadedFile.path,
          contentType: uploadedFile.mimetype
        }] : []
      });

      console.log(`✅ Careers application processed successfully (${requestId})`);

      res.json({
        success: true,
        message: `Thanks, ${sanitized.fullName}. Your application has been received — our team will review it and get back to you within 2-3 business days.`,
        requestId
      });

    } catch (emailError) {
      console.error(`❌ Email sending error (${requestId}):`, emailError.message);
      
      res.json({
        success: true,
        message: `Application received successfully, ${sanitized.fullName}. Confirmation emails could not be sent, but our team will follow up.`,
        requestId,
        warning: 'Email notification failed'
      });
    }

  } catch (error) {
    console.error('❌ Careers endpoint error:', error.message);
    
    // Clean up file on error
    if (uploadedFile) {
      fs.unlink(uploadedFile.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }

    res.status(500).json({
      success: false,
      error: 'An error occurred processing your application. Please try again.'
    });
  }
});

// ===== ADMINISTRATIVE ROUTES =====

// Get submission statistics (admin endpoint)
app.get('/api/admin/stats', (req, res) => {
  // In production, add authentication here
  const uploadsDir = path.join(__dirname, 'uploads');
  const logsDir = path.join(__dirname, 'logs');

  let resumeCount = 0;
  let logFiles = 0;

  if (fs.existsSync(uploadsDir)) {
    resumeCount = fs.readdirSync(uploadsDir).length;
  }
  if (fs.existsSync(logsDir)) {
    logFiles = fs.readdirSync(logsDir).length;
  }

  res.json({
    success: true,
    stats: {
      resumesStored: resumeCount,
      logFiles,
      serverUptime: process.uptime(),
      timestamp: new Date().toISOString()
    }
  });
});

// ===== ERROR HANDLING MIDDLEWARE =====

app.use((err, req, res, next) => {
  console.error('❌ Global error handler:', err.message);
  
  if (err instanceof multer.MulterError) {
    if (err.code === 'FILE_TOO_LARGE') {
      return res.status(400).json({
        success: false,
        error: 'File size exceeds 5MB limit'
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        error: 'Only one file is allowed'
      });
    }
  }

  if (err.message.includes('Only PDF and Word documents')) {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'An unexpected error occurred'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.path,
    method: req.method
  });
});

// ===== SERVER START =====

app.listen(port, () => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🚀 SUN SOFTWARE SOLUTIONS - BACKEND SERVER`);
  console.log(`${'='.repeat(60)}`);
  console.log(`📍 Server: http://localhost:${port}`);
  console.log(`🌍 Frontend: ${process.env.FRONTEND_URL}`);
  console.log(`📧 Email Service: ${process.env.EMAIL_SERVICE}`);
  console.log(`👨‍💼 Admin Email: ${process.env.ADMIN_EMAIL}`);
  console.log(`🔐 Environment: ${process.env.NODE_ENV}`);
  console.log(`${'='.repeat(60)}`);
  console.log(`\n✅ API ENDPOINTS:`);
  console.log(`   GET  /api/health              - Health check`);
  console.log(`   POST /api/contact             - Submit contact form`);
  console.log(`   POST /api/careers             - Submit career application`);
  console.log(`   GET  /api/admin/stats         - Admin statistics`);
  console.log(`\n✅ FEATURES:`);
  console.log(`   ✓ Email notifications`);
  console.log(`   ✓ File upload handling`);
  console.log(`   ✓ Rate limiting (spam prevention)`);
  console.log(`   ✓ Input sanitization (XSS prevention)`);
  console.log(`   ✓ Security headers (Helmet)`);
  console.log(`   ✓ Request logging`);
  console.log(`   ✓ CORS configured`);
  console.log(`   ✓ Compression enabled`);
  console.log(`\n${'='.repeat(60)}\n`);
});

export default app;
