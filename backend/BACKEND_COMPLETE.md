# Sun Software Solutions - Complete Production Backend

## 📋 Table of Contents
1. [Features](#-features)
2. [Setup](#-setup)
3. [API Documentation](#-api-documentation)
4. [File Structure](#-file-structure)
5. [Security](#-security)
6. [Deployment](#-deployment)
7. [Troubleshooting](#-troubleshooting)

---

## ✨ Features

### Core Features
✅ **Two Form Endpoints** - Contact form + Career application  
✅ **File Upload** - Resume attachment (PDF, DOC, DOCX)  
✅ **Email Notifications** - User confirmation + Admin notification  
✅ **Input Validation** - Server-side validation of all inputs  
✅ **Input Sanitization** - XSS prevention via sanitize-html  

### Security Features
✅ **Rate Limiting** - Prevent spam/abuse (10 req/15min, 3 req/1hr)  
✅ **Helmet Security** - Security headers (XSS, CSRF, clickjacking)  
✅ **CORS** - Restricted to frontend URL only  
✅ **File Validation** - MIME type + extension + size checking  
✅ **Email Validation** - RFC 5322 compliant email validation  

### Performance Features
✅ **Compression** - Gzip compression for responses  
✅ **File Storage** - Resumes stored on disk for archival  
✅ **Logging** - Morgan logging to both console and file  
✅ **Error Handling** - Comprehensive error responses  
✅ **Request IDs** - Unique request tracking for debugging  

### Admin Features
✅ **Statistics Endpoint** - /api/admin/stats for monitoring  
✅ **File Organization** - Resumes organized in /uploads  
✅ **Access Logs** - Stored in /logs/access.log  
✅ **Request Tracking** - Each request has unique ID  
✅ **Health Check** - /api/health endpoint  

---

## 🚀 Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Edit `backend/.env`:

```env
PORT=5000
NODE_ENV=development
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=admin@sunsoftware.co.in
FRONTEND_URL=http://localhost:5173
```

### 3. Gmail Setup (Critical)

**For Gmail:**
1. Enable 2-Step Verification at [myaccount.google.com/security](https://myaccount.google.com/security)
2. Go to "App passwords"
3. Select Mail & Windows Computer
4. Copy 16-character password
5. Paste as `EMAIL_PASSWORD` in `.env`

**For Other Providers:**
- Outlook: Use app-specific password
- SendGrid: Use API key
- Custom SMTP: Update EMAIL_SERVICE, EMAIL_HOST, EMAIL_PORT

### 4. Start Backend

```bash
npm run dev
```

Expected output:
```
🚀 SUN SOFTWARE SOLUTIONS - BACKEND SERVER
📍 Server: http://localhost:5000
✅ Email server ready
```

---

## 📡 API Documentation

### Health Check
```
GET /api/health

Response:
{
  "status": "✅ Server is running",
  "environment": "development",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 123.45
}
```

### Contact Form
```
POST /api/contact

Request:
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I have a project inquiry..."
}

Response (Success):
{
  "success": true,
  "message": "Thanks for reaching out! We'll get back to you soon at john@example.com.",
  "requestId": "550e8400-e29b-41d4-a716-446655440000"
}

Response (Error):
{
  "success": false,
  "errors": {
    "name": "Name must be at least 2 characters",
    "email": "Valid email is required"
  }
}
```

### Career Application
```
POST /api/careers

Request (multipart/form-data):
{
  "fullName": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+91 9876543210",
  "qualification": "B.Tech CSE",
  "address": "123 Main Street",
  "city": "Coimbatore",
  "state": "Tamil Nadu",
  "level": "junior",
  "message": "I am interested in the junior developer position...",
  "resume": <binary file - PDF/DOC/DOCX>
}

Response (Success):
{
  "success": true,
  "message": "Thanks, Jane Smith. Your application has been received — our team will review it and get back to you within 2-3 business days.",
  "requestId": "550e8400-e29b-41d4-a716-446655440000"
}

Response (Error):
{
  "success": false,
  "errors": {
    "level": "Invalid position level selected",
    "resume": "Resume file is required"
  }
}
```

### Admin Statistics
```
GET /api/admin/stats

Response:
{
  "success": true,
  "stats": {
    "resumesStored": 42,
    "logFiles": 1,
    "serverUptime": 3600.45,
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

---

## 📁 File Structure

```
backend/
├── server.js                    # Main Express server
├── server-complete.js           # Enhanced version (backup)
├── package.json                 # Dependencies
├── .env                         # Configuration (SECRET - don't commit)
├── .env.example                 # Example config
│
├── uploads/                     # Resume storage
│   ├── resume1-timestamp-uuid.pdf
│   ├── resume2-timestamp-uuid.docx
│   └── ...
│
├── logs/                        # Access logs
│   └── access.log
│
└── README.md                    # Documentation

```

### Directory Creation
Directories are created automatically on startup:
- `uploads/` - Stores submitted resume files
- `logs/` - Stores access logs

---

## 🔒 Security

### Input Validation

**Contact Form:**
- Name: 2-100 characters
- Email: Valid RFC 5322 format
- Message: 10-5000 characters

**Career Form:**
- Full Name: 2-100 characters
- Email: Valid RFC 5322 format
- Phone: 7-15 digits
- Qualification: 2-500 characters
- Address: 5-1000 characters
- City: 2-100 characters
- State: 2-100 characters
- Level: One of ['fresher', 'junior', 'mid', 'senior', 'lead']
- Message: 10-5000 characters
- Resume: PDF/DOC/DOCX, max 5MB

### Input Sanitization

All text inputs are sanitized using `sanitize-html`:
- Removes any HTML tags
- Prevents XSS attacks
- Escapes special characters

### File Upload Security

Resume files are validated:
- **MIME Type Check** - Must be PDF, DOC, or DOCX
- **Extension Check** - Must be .pdf, .doc, or .docx
- **Size Check** - Maximum 5MB
- **Storage** - Stored with UUID to prevent overwrites

### Rate Limiting

- Contact Form: 10 requests per 15 minutes
- Career Form: 3 requests per hour
- Helps prevent spam and abuse

### CORS

Only requests from `FRONTEND_URL` are allowed:
- Default: http://localhost:5173
- Change in `.env` as needed
- Only specific methods: GET, POST, OPTIONS

### Request Logging

All requests are logged with:
- Method & endpoint
- Response status
- Request duration
- Client IP

---

## 📧 Email Workflow

### Contact Form Email Flow

1. **User Submission**
   - Form sent to `/api/contact`

2. **Validation**
   - Server validates all inputs
   - Sanitizes HTML/XSS

3. **Confirmation Email to User**
   - Subject: "✅ We Received Your Message"
   - Shows their message
   - 24hr response time
   - Contact info included

4. **Admin Notification**
   - Subject: "💬 New Contact Enquiry"
   - All details visible
   - Timestamp included
   - Action items listed

### Career Application Email Flow

1. **User Submission**
   - Form sent to `/api/careers` with resume
   - Resume stored in /uploads/

2. **Validation**
   - All fields validated
   - Resume checked (mime, ext, size)
   - File sanitized

3. **Confirmation Email to Applicant**
   - Subject: "✅ Career Application Received"
   - Application details
   - 2-3 business day review time
   - Company contact info

4. **Admin Notification**
   - Subject: "🎯 New Career Application"
   - All applicant details
   - Resume attached
   - Direct reply link

---

## 🚀 Deployment

### Local Development
```bash
npm run dev
# Runs on http://localhost:5000
# Auto-restarts on file changes
```

### Production Build
```bash
npm start
# Runs on configured PORT
# No auto-restart
```

### Heroku Deployment

1. **Create Heroku app**
```bash
heroku create your-app-name
```

2. **Set environment variables**
```bash
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASSWORD=your-app-password
heroku config:set ADMIN_EMAIL=admin@sunsoftware.co.in
heroku config:set FRONTEND_URL=https://your-frontend.com
```

3. **Deploy**
```bash
git push heroku main
```

### Railway Deployment

1. **Connect GitHub repo**
2. **Railway auto-detects Node.js**
3. **Set environment variables** in Railway dashboard
4. **Auto-deploys** on git push

### AWS/Azure/GCP

Deploy as standard Node.js application:
- Set environment variables
- Ensure PORT is exposed
- Use process manager (PM2)
- Enable HTTPS (recommended)

---

## 🐛 Troubleshooting

### Email Not Sending

**Problem:** "Email configuration error"

**Solution:**
1. Check `.env` file
2. Verify Gmail app password (16 chars)
3. Enable 2-Step Verification
4. Check firewall allows SMTP (port 587)
5. Restart backend after changes

### File Upload Fails

**Problem:** "Resume file is required" or "File size exceeds 5MB"

**Solutions:**
- Ensure file is PDF, DOC, or DOCX
- Check file size < 5MB
- Try different browser
- Clear browser cache

### Rate Limited

**Problem:** "Too many submissions from this IP"

**Solutions:**
- Wait 15 minutes (contact) or 1 hour (careers)
- Or disable rate limiting in development:
  ```javascript
  skip: (req) => process.env.NODE_ENV === 'development'
  ```

### CORS Error

**Problem:** "Cross-Origin Request Blocked"

**Solutions:**
1. Verify backend is running on port 5000
2. Check FRONTEND_URL in `.env`
3. Ensure frontend is on http://localhost:5173
4. Restart backend after changes

### Server Won't Start

**Problem:** "Port 5000 already in use"

**Solutions:**
```bash
# Change port in .env
PORT=5001

# Or kill process using port 5000
lsof -ti:5000 | xargs kill -9
```

---

## 📊 Monitoring

### Check Server Health
```bash
curl http://localhost:5000/api/health
```

### View Statistics
```bash
curl http://localhost:5000/api/admin/stats
```

### Monitor Logs
```bash
# Real-time console logs (when running with npm run dev)

# Or view file logs
tail -f logs/access.log
```

### Check Uploaded Resumes
```bash
ls -la uploads/
```

---

## 🔄 Request Flow Diagram

```
FRONTEND (React)
       ↓
   fetch() POST
       ↓
BACKEND (Express)
   ├─ CORS Check
   ├─ Rate Limiter
   ├─ Body Parser
   ├─ Validation
   ├─ Sanitization
   ├─ File Upload (if careers)
   ├─ Send Emails
   └─ Response JSON
       ↓
   Nodemailer
   ├─ User Email
   ├─ Admin Email
   └─ Email Attachments (resume)

File Storage:
└─ /uploads/filename-uuid.ext

Logging:
└─ /logs/access.log
```

---

## 📈 Performance Tips

1. **Use compression** - Already enabled
2. **Cache headers** - Set in production
3. **Database indexing** - If adding MongoDB
4. **Email queue** - Use Bull for large volumes
5. **CDN for files** - Store resumes on S3/Cloud Storage
6. **Load balancer** - For multiple instances

---

## 🔐 Production Checklist

Before deploying to production:

- [ ] Set `NODE_ENV=production`
- [ ] Update `FRONTEND_URL` to production domain
- [ ] Use strong email password
- [ ] Enable HTTPS
- [ ] Set up firewall rules
- [ ] Configure backups
- [ ] Set up monitoring
- [ ] Test email delivery
- [ ] Test file uploads
- [ ] Load test endpoints
- [ ] Set up error tracking (Sentry)
- [ ] Document API for team

---

## 📞 Support

For issues:
1. Check logs: `logs/access.log`
2. Check console output
3. Test endpoints with curl
4. Review BACKEND_COMPLETE.md
5. Check environment variables

---

**Backend is production-ready!** 🎉
