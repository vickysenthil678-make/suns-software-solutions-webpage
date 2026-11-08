# Sun Software Solutions - Complete Setup Guide

A complete React + Node.js application for Sun Software Solutions website with form handling and email notifications.

## 📋 Table of Contents

1. [Quick Start](#-quick-start)
2. [Architecture](#-architecture)
3. [Full Setup](#-full-setup)
4. [Running the App](#-running-the-app)
5. [Forms & Backend](#-forms--backend)
6. [Deployment](#-deployment)
7. [Troubleshooting](#-troubleshooting)

---

## ⚡ Quick Start

### For Frontend Only (No Emails)

```bash
npm install
npm run dev
# Open http://localhost:5173
```

### Full Stack (With Email Notifications)

```bash
# Terminal 1: Frontend
npm install
npm run dev

# Terminal 2: Backend
cd backend
npm install
npm run dev
```

**Backend will be at:** `http://localhost:5000`  
**Frontend will be at:** `http://localhost:5173`

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│  React Frontend (src/)                                  │
│  - Components, Styling, Forms                           │
│  Port: 5173                                             │
└──────────────────┬──────────────────────────────────────┘
                   │ HTTP Requests (fetch)
                   ↓
┌─────────────────────────────────────────────────────────┐
│  Express Backend (backend/)                             │
│  - API Endpoints, Email Service                         │
│  Port: 5000                                             │
└──────────────────┬──────────────────────────────────────┘
                   │ SMTP/Email
                   ↓
            ┌──────────────┐
            │  Gmail/Email │
            │   Service    │
            └──────────────┘
```

---

## 🛠️ Full Setup

### Step 1: Frontend Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

### Step 2: Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Configure email
# Edit .env file with your Gmail credentials
```

### Step 3: Gmail Configuration

1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Create **App Password** (Mail → Windows PC)
4. Copy 16-character password
5. Paste in `backend/.env` as `EMAIL_PASSWORD`

### Step 4: Start Backend

```bash
npm run dev
```

---

## 🚀 Running the App

### Development Mode

**Terminal 1 (Frontend):**
```bash
npm run dev
# Runs at http://localhost:5173
# Auto-reloads on file changes
```

**Terminal 2 (Backend):**
```bash
cd backend
npm run dev
# Runs at http://localhost:5000
# Auto-reloads on file changes
```

### Production Build

```bash
# Build frontend
npm run build
# Creates optimized build in dist/

# Backend is ready to deploy as-is
```

---

## 📧 Forms & Backend

### How Forms Work

1. User fills form in React component
2. Form validates client-side (React)
3. If valid, sends to backend API
4. Backend validates again (security)
5. Backend sends confirmation emails
6. Response shows success/error to user

### API Endpoints

**Health Check:**
```
GET http://localhost:5000/api/health
```

**Contact Form:**
```
POST http://localhost:5000/api/contact
Headers: Content-Type: application/json
Body: { name, email, message }
```

**Career Application:**
```
POST http://localhost:5000/api/careers
Headers: Content-Type: multipart/form-data
Body: { fullName, email, phone, qualification, address, city, state, level, message, resume }
```

### Email Flow

**Career Application:**
1. Applicant submits form + resume
2. Confirmation email → Applicant's inbox
3. Notification email + resume → Admin's inbox

**Contact Form:**
1. User submits form
2. Confirmation email → User's inbox
3. Notification email → Admin's inbox

---

## 📁 Project Structure

```
sun-software-web-application/
├── src/
│   ├── components/           # React components
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Portfolio.jsx
│   │   ├── Careers.jsx      # Career form (connects to backend)
│   │   ├── Contact.jsx      # Contact form (connects to backend)
│   │   ├── Footer.jsx
│   │   ├── TechBand.jsx
│   │   └── SocialRail.jsx
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # React entry point
│   ├── styles.css           # All styling
│   └── index.css
│
├── backend/
│   ├── server.js            # Express server + API routes
│   ├── package.json         # Backend dependencies
│   ├── .env                 # Environment variables (SECRET)
│   └── .env.example         # Example config
│
├── dist/                    # Production build (generated)
├── public/                  # Static assets
│
├── index.html               # HTML entry point
├── vite.config.js           # Vite configuration
├── package.json             # Frontend dependencies
│
├── README.md                # General README
├── README_REACT.md          # React-specific info
├── QUICK_START.md           # Quick start guide
├── BACKEND_SETUP.md         # Backend setup guide
├── SETUP_GUIDE.md           # This file
└── .gitignore               # Git ignore rules
```

---

## 🌐 Environment Variables

### Frontend (`/.env` - not needed, hardcoded to localhost:5000)

### Backend (`/backend/.env`)

```env
# Server
PORT=5000
NODE_ENV=development

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Notifications
ADMIN_EMAIL=admin@sunsoftware.co.in
FRONTEND_URL=http://localhost:5173
```

**Never commit `.env`** - it contains secrets!

---

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)

```bash
npm run build
# Deploy the 'dist' folder
```

Platforms:
- **Netlify:** Drag & drop `dist` folder
- **Vercel:** Connect GitHub repo
- **GitHub Pages:** Follow their docs

### Backend Deployment

Platforms:
- **Heroku:** Connect GitHub, set env vars
- **Railway:** Auto-detects Node.js
- **AWS/Azure/GCP:** Use their Node.js options

**Important:** Update frontend API URL after deploying backend!

In `src/components/Careers.jsx` and `src/components/Contact.jsx`, change:
```javascript
fetch('http://localhost:5000/api/...')
// to
fetch('https://your-backend-url.com/api/...')
```

---

## ✅ Testing

### Frontend Tests

```bash
# Run in browser
npm run dev
# Test at http://localhost:5173

# Production build test
npm run build
npm run preview
```

### Backend Tests

```bash
# Health check
curl http://localhost:5000/api/health

# Contact form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
```

### Form Testing

1. Fill career form with valid data
2. Should see "Application submitted" message
3. Check your email for confirmation
4. Check admin email for notification + resume

---

## 🐛 Troubleshooting

### Forms Not Submitting

**Check:**
1. Backend is running (`http://localhost:5000`)
2. No CORS errors in browser console
3. Email configuration is correct
4. Network tab shows API request

### Emails Not Arriving

**Check:**
1. Gmail app password is exactly 16 characters
2. 2-Step Verification is enabled in Gmail
3. Check spam/junk folder
4. Admin email in `.env` is correct
5. Backend console shows "✅ Email server ready"

### Port Already in Use

```bash
# macOS/Linux: Find and kill process
lsof -ti:5000 | xargs kill -9

# Windows: Use Task Manager or netstat
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📚 Documentation Files

- **README.md** - General project overview
- **README_REACT.md** - React-specific information
- **QUICK_START.md** - Quick start guide
- **BACKEND_SETUP.md** - Detailed backend setup
- **SETUP_GUIDE.md** - This comprehensive guide

---

## 🔗 External Links

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Express.js](https://expressjs.com)
- [Nodemailer](https://nodemailer.com)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)

---

## 📞 Support

**For issues with:**
- Frontend code: Check React components in `src/components/`
- Backend code: Check `backend/server.js`
- Email setup: See BACKEND_SETUP.md
- Deployment: Check platform documentation

---

## ✨ Key Features

✅ Full React component architecture  
✅ Responsive design (mobile-first)  
✅ Form validation (client & server)  
✅ Email notifications with attachments  
✅ File upload handling  
✅ Error handling & user feedback  
✅ Production-ready build  
✅ CORS & security  
✅ Environment configuration  
✅ Easy deployment  

---

## 📄 License

This project is a modernized version of Sun Software Solutions' website.

---

**Happy developing!** 🎉

Start with:
```bash
npm run dev           # Terminal 1
cd backend && npm run dev  # Terminal 2
```

Both terminals running = Full working app with emails!
