# Backend Setup Guide

Complete setup for the Node.js/Express backend to handle forms and emails.

## 🚀 Quick Setup (5 minutes)

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

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

### 3. Get Gmail App Password

1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Go to **App Passwords**
4. Select **Mail** and **Windows PC**
5. Copy the **16-character password**
6. Paste in `.env` as `EMAIL_PASSWORD`

### 4. Start Backend Server

```bash
npm run dev
```

You should see:
```
🚀 Server running at http://localhost:5000
✅ Email server ready
```

---

## 📁 Backend Structure

```
backend/
├── server.js           # Main Express server
├── package.json        # Dependencies
├── .env               # Environment variables (SECRET!)
├── .env.example       # Example config (safe to commit)
└── README.md          # This file
```

---

## 🔌 API Endpoints

### Health Check
```
GET /api/health
```
**Response:**
```json
{
  "status": "✅ Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Career Application
```
POST /api/careers
```
**Request (FormData):**
- `fullName` - Full name
- `email` - Email address
- `phone` - Phone number
- `qualification` - Education/qualification
- `address` - Street address
- `city` - City
- `state` - State
- `level` - Position level (fresher/junior/mid/senior/lead)
- `message` - Cover message
- `resume` - File upload (PDF/DOC/DOCX, max 5MB)

**Response:**
```json
{
  "success": true,
  "message": "Thanks, John. Your enquiry has been received..."
}
```

### Contact Form
```
POST /api/contact
```
**Request (JSON):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I want to discuss a project..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thanks for reaching out! We will get back to you soon."
}
```

---

## ⚙️ Configuration

### Email Providers

#### Gmail (Recommended)
1. Enable 2-Step Verification
2. Generate App Password
3. Use 16-char password in `.env`

#### Outlook/Office 365
```env
EMAIL_SERVICE=office365
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
```

#### Custom SMTP
```env
EMAIL_SERVICE=custom
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your-email
EMAIL_PASSWORD=your-password
```

---

## 📧 Email Workflows

### Career Application Flow
1. Applicant submits form with resume
2. System sends confirmation email to applicant
3. System sends admin notification with resume attachment
4. Admin reviews and responds

### Contact Form Flow
1. User submits contact form
2. System sends confirmation email to user
3. System sends notification to admin
4. Admin follows up

---

## 🔒 Security Features

✅ **CORS** - Restricted to frontend URL  
✅ **File Validation** - Only PDF/DOC/DOCX allowed  
✅ **File Size Limit** - 5MB maximum  
✅ **Field Validation** - Server-side validation  
✅ **Email Rate Limiting** - Built-in delays  
✅ **Environment Secrets** - `.env` not committed  

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| **express** | Web framework |
| **cors** | Cross-origin support |
| **nodemailer** | Email sending |
| **multer** | File upload handling |
| **dotenv** | Environment config |
| **morgan** | Request logging |

Development:
- **nodemon** - Auto-restart on file changes

---

## 🐛 Troubleshooting

### Email Not Sending

**Problem:** "Email configuration error"

**Solution:**
1. Check Gmail credentials in `.env`
2. Verify 2-Step Verification is enabled
3. Generate new App Password
4. Ensure App Password is exactly 16 characters
5. Check firewall/antivirus isn't blocking SMTP

### CORS Errors

**Problem:** "Cross-Origin Request Blocked"

**Solution:**
1. Ensure backend is running on `http://localhost:5000`
2. Frontend should be on `http://localhost:5173`
3. Check `FRONTEND_URL` in `.env`
4. Restart backend after changing `.env`

### File Upload Fails

**Problem:** "Only PDF and Word documents are allowed"

**Solution:**
1. Ensure file is actually PDF/DOC/DOCX
2. Check file size < 5MB
3. Some files might have wrong extension - rename to correct one

### Port Already in Use

**Problem:** "Port 5000 is already in use"

**Solution:**
```bash
# Change port in .env
PORT=5001

# Or kill the process using port 5000
lsof -ti:5000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :5000   # Windows
```

---

## 🚀 Running Both Services

### Terminal 1 (React Frontend)
```bash
npm run dev
# http://localhost:5173
```

### Terminal 2 (Backend)
```bash
cd backend
npm run dev
# http://localhost:5000
```

Both services must be running for forms to work!

---

## 📝 Environment Variables Reference

```env
# Server
PORT=5000                              # Backend port
NODE_ENV=development                   # production/development

# Email
EMAIL_SERVICE=gmail                    # Service provider
EMAIL_USER=your-email@gmail.com        # Sender email
EMAIL_PASSWORD=app-password            # App password (16 chars)

# Emails
ADMIN_EMAIL=admin@sunsoftware.co.in    # Receives notifications
FRONTEND_URL=http://localhost:5173     # CORS whitelist
```

---

## ✅ Testing Backend

### Test Health Endpoint
```bash
curl http://localhost:5000/api/health
```

### Test Contact Form
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "This is a test message"
  }'
```

### Test Career Form (requires file)
```bash
curl -X POST http://localhost:5000/api/careers \
  -F "fullName=John Doe" \
  -F "email=john@example.com" \
  -F "phone=9876543210" \
  -F "qualification=B.Tech" \
  -F "address=123 Main St" \
  -F "city=Coimbatore" \
  -F "state=Tamil Nadu" \
  -F "level=junior" \
  -F "message=I am interested in this position" \
  -F "resume=@path/to/resume.pdf"
```

---

## 🔗 Integration with Frontend

Forms automatically send to backend. No additional configuration needed!

**React Components Connected:**
- `src/components/Contact.jsx` → `POST /api/contact`
- `src/components/Careers.jsx` → `POST /api/careers`

---

## 📱 Deployment

### Heroku
```bash
# Add to Procfile
web: node backend/server.js

# Set environment variables in Heroku dashboard
# Deploy with git push heroku main
```

### Railway
```bash
# Connect GitHub repo
# Railway auto-detects Node.js
# Set environment variables in dashboard
```

### AWS/Azure/GCP
```bash
# Use their Node.js deployment options
# Set environment variables in console
# Ensure port exposed to internet
```

---

## 📚 Additional Resources

- [Express.js Docs](https://expressjs.com)
- [Nodemailer Docs](https://nodemailer.com)
- [Multer Docs](https://github.com/expressjs/multer)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)

---

**Backend Ready!** 🎉 Your forms are now connected to email notifications.
