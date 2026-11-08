# Quick Start Guide - Sun Software Solutions React App

## ⚡ 5-Minute Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Make Changes
- Edit files in `src/` folder
- Changes auto-reload in browser
- Start with modifying `src/components/Hero.jsx` to see it work

### 4. Build for Production
```bash
npm run build
```
Creates optimized build in `dist/` folder.

---

## 📂 File Guide

### Main App
- `src/App.jsx` - Main component that imports all sections
- `src/main.jsx` - React entry point
- `src/styles.css` - All CSS styling

### Components (in `src/components/`)
| File | Purpose |
|------|---------|
| `Header.jsx` | Navigation bar with logo |
| `Hero.jsx` | Main hero section |
| `TechBand.jsx` | Scrolling tech skills |
| `About.jsx` | Company info & milestones |
| `Services.jsx` | Service cards (grid layout) |
| `Portfolio.jsx` | Project showcase cards |
| `Careers.jsx` | Career application form |
| `Contact.jsx` | Contact form & info |
| `Footer.jsx` | Footer with links |
| `SocialRail.jsx` | Social media icons |

---

## 🎨 Customization

### Change Colors
Edit CSS variables in `src/styles.css` (top of file):
```css
:root {
    --sun: #f7941d;        /* Primary color */
    --gold: #ffc247;       /* Accent color */
    --ink: #121b2e;        /* Dark text */
    --cream: #fff8ef;      /* Background */
}
```

### Update Content
1. **Hero Section** → Edit `src/components/Hero.jsx`
2. **Services** → Edit `src/components/Services.jsx` (array data)
3. **Portfolio** → Edit `src/components/Portfolio.jsx` (array data)
4. **Company Info** → Edit `src/components/About.jsx` or `src/components/Footer.jsx`

### Modify Forms
- **Career Form** → `src/components/Careers.jsx`
- **Contact Form** → `src/components/Contact.jsx`
- Validation logic is in each component with `useState`

---

## ✅ Form Validation

Both forms have built-in validation:

**Career Form Requires:**
- Full name (min 2 chars)
- Valid email
- Phone (7-15 digits)
- Qualification
- Address, City, State
- Position level
- Resume file (PDF/DOC/DOCX, max 5MB)
- Message (min 10 chars)

**Contact Form Requires:**
- Name (min 2 chars)
- Valid email
- Message (min 10 chars)

Errors display inline and clear on edit.

---

## 🚀 Deployment

### Netlify (Recommended)
```bash
npm run build
# Then drag 'dist' folder to Netlify
# Or connect GitHub repo to Netlify
```

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts
```

### GitHub Pages
```bash
# Update vite.config.js to add base
# Then push 'dist' to gh-pages branch
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 5173 already in use | `npm run dev -- --port 3000` |
| Build errors | Delete `node_modules` and `npm install` again |
| Styles not applying | Check CSS import in `App.jsx` |
| Forms not working | Ensure browser console is error-free |

---

## 📱 Testing Responsiveness

Open browser DevTools (F12) and use Device Toolbar:
- Desktop: 1024px+
- Tablet: 768px-1024px
- Mobile: < 768px

---

## 🔗 Important Files Summary

```
✅ src/App.jsx              - Main component
✅ src/components/*.jsx     - Section components  
✅ src/styles.css           - All styling
✅ index.html               - HTML entry point
✅ vite.config.js           - Build configuration
✅ package.json             - Dependencies & scripts
```

---

## 💡 Development Tips

1. **Use React DevTools** - Chrome/Firefox extension for debugging
2. **Check Console** - F12 → Console for errors
3. **Hot Reload** - Changes save automatically during `npm run dev`
4. **Mobile Testing** - Use `npm run dev -- --host` to test on phone
5. **Production Check** - Run `npm run build` before deploying

---

## 📚 Further Learning

- React Docs: [react.dev](https://react.dev)
- Vite Docs: [vitejs.dev](https://vitejs.dev)
- CSS Reference: [developer.mozilla.org](https://developer.mozilla.org)

---

**Ready to go!** 🚀 Start with `npm install` then `npm run dev`
