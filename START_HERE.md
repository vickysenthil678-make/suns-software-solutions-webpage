# 🚀 START HERE - Sun Software Solutions React App

A complete, production-ready React + Node.js website with email notifications.

---

## ⚡ Quick Start (2 minutes)

### Just Want to See It Run?

```bash
npm install
npm run dev
```

Open **http://localhost:5173** → Done! ✅

*(Forms won't send emails without backend, but everything else works)*

---

## 🔗 Want Forms & Email Notifications?

### Terminal 1: Frontend
```bash
npm install
npm run dev
```

### Terminal 2: Backend
```bash
cd backend
npm install
npm run dev
```

That's it! Forms now send emails. 📧

---

## 🎯 What's Inside?

### Frontend (React)
- ✅ Hero section with CTA
- ✅ About company
- ✅ Services showcase
- ✅ Portfolio projects
- ✅ Career application form
- ✅ Contact form
- ✅ Responsive design (mobile-optimized)
- ✅ Smooth animations
- ✅ SEO optimized

### Backend (Node.js/Express)
- ✅ API endpoints for forms
- ✅ Email notifications
- ✅ File upload handling (resumes)
- ✅ Server-side validation
- ✅ Error handling
- ✅ CORS configured

---

## 📁 Key Files to Edit

| File | What to Change |
|------|---|
| `src/components/Hero.jsx` | Main hero content |
| `src/components/About.jsx` | Company info |
| `src/components/Services.jsx` | Service offerings |
| `src/components/Portfolio.jsx` | Project showcase |
| `src/styles.css` | Colors, fonts, layout |
| `backend/.env` | Email configuration |

---

## 🛠️ Setup with Email (5 minutes)

### Step 1: Gmail Setup
1. Go to [Gmail](https://mail.google.com)
2. Click your profile → **Manage your Google Account**
3. Go to **Security** tab
4. Enable **2-Step Verification**
5. Go back to Security → **App passwords** (at bottom)
6. Select **Mail** and **Windows Computer**
7. Copy the **16-character password**

### Step 2: Update Backend Config
```bash
cd backend
# Edit .env file
# EMAIL_USER = your-gmail@gmail.com
# EMAIL_PASSWORD = paste-16-char-password-here
# ADMIN_EMAIL = admin@sunsoftware.co.in
```

### Step 3: Start Both Services
```bash
# Terminal 1
npm run dev

# Terminal 2
cd backend && npm run dev
```

### Step 4: Test!
1. Go to http://localhost:5173
2. Fill the contact form
3. Click Submit
4. Check your email inbox! 📧

---

## 📚 Documentation

Read these in order:

1. **START_HERE.md** ← You are here
2. **QUICK_START.md** - Quick reference
3. **SETUP_GUIDE.md** - Detailed walkthrough
4. **README_REACT.md** - React component info
5. **BACKEND_SETUP.md** - Email & backend details

---

## 🎨 Customization

### Change Colors
Edit `src/styles.css` (top of file):
```css
:root {
    --sun: #f7941d;        /* Main color */
    --gold: #ffc247;       /* Accent */
    --ink: #121b2e;        /* Text */
}
```

### Update Company Info
Edit `src/components/Footer.jsx`:
```jsx
<a href="mailto:hello@sunsoftware.co.in">your-email@example.com</a>
<a href="tel:+914222230025">your-phone</a>
```

### Change Service List
Edit `src/components/Services.jsx` - Update the `services` array

### Update Portfolio
Edit `src/components/Portfolio.jsx` - Update the `portfolioItems` array

---

## 🚀 Deployment (Choose One)

### Option 1: Netlify (Easiest)
```bash
npm run build
# Drag dist/ folder to Netlify.com
```

### Option 2: Vercel
```bash
npm install -g vercel
vercel
# Follow prompts
```

### Option 3: GitHub Pages
```bash
npm run build
# Push dist/ to gh-pages branch
```

**Don't forget:** Update backend URL in forms after deploying!

---

## 🐛 Common Issues

### "Forms not sending"
→ Make sure backend is running on Terminal 2  
→ Check that backend shows "✅ Email server ready"

### "Email not arriving"
→ Gmail: Check spam folder  
→ Verify app password is exactly 16 characters  
→ Check 2-Step Verification is enabled

### "Port 5000 already in use"
→ Edit `backend/.env`: `PORT=5001`

### "npm install fails"
→ Delete `node_modules` folder  
→ Delete `package-lock.json`  
→ Run `npm install` again

---

## ✅ Checklist

- [ ] Run `npm install` in root
- [ ] Run `npm run dev` in Terminal 1
- [ ] See app at `http://localhost:5173`
- [ ] (Optional) Setup Gmail credentials
- [ ] (Optional) Run `cd backend && npm run dev` in Terminal 2
- [ ] (Optional) Test forms by submitting them

---

## 📞 What's Running?

| Service | URL | Port | What It Does |
|---------|-----|------|---|
| Frontend | http://localhost:5173 | 5173 | React app |
| Backend | http://localhost:5000 | 5000 | API & emails |

---

## 🎯 Next Steps

### For Development
1. Edit components in `src/components/`
2. See changes instantly (hot reload)
3. Check browser console for errors

### For Customization
1. Update company info in components
2. Change colors in `src/styles.css`
3. Modify email templates in `backend/server.js`

### For Deployment
1. Build with `npm run build`
2. Deploy frontend to Netlify/Vercel
3. Deploy backend to Heroku/Railway
4. Update API URL in React components

---

## 🆘 Need Help?

1. **Forms not working?** → Read BACKEND_SETUP.md
2. **Questions about React?** → Check README_REACT.md
3. **Deployment issues?** → See SETUP_GUIDE.md
4. **Email problems?** → See BACKEND_SETUP.md #Troubleshooting

---

## 💡 Pro Tips

- Use browser DevTools (F12) to debug
- Check backend console for request logs
- Use `npm run build` to test production
- Keep `.env` files in `.gitignore` (don't commit secrets!)
- Deploy backend before frontend for better testing

---

## 🎉 You're All Set!

```bash
npm run dev
```

Then navigate to: **http://localhost:5173**

**Questions?** Check the documentation files or read the code comments!

---

**Built with React + Vite + Express.js** ⚡
