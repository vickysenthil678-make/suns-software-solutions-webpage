# Sun Software Solutions - React Application

A completely converted React version of the Sun Software Solutions website, originally built with vanilla HTML, CSS, and JavaScript. This is now a modern, component-based React application using Vite.

## ✨ What's New

This project has been completely rewritten as a React application with:

- **React Components**: All sections are now modular React components
- **Vite Build Tool**: Fast development and optimized production builds
- **Modern State Management**: React hooks (useState) for form handling
- **Component Architecture**:
  - `Header.jsx` - Navigation and branding
  - `Hero.jsx` - Hero section with call-to-actions
  - `TechBand.jsx` - Scrolling tech stack banner
  - `About.jsx` - Company information and milestones
  - `Services.jsx` - Service offerings
  - `Portfolio.jsx` - Project showcase
  - `Careers.jsx` - Career enquiry form
  - `Contact.jsx` - Contact information and form
  - `Footer.jsx` - Footer with links and info
  - `SocialRail.jsx` - Floating social media links

## 🎯 Features

✅ **Fully Responsive** - Mobile-first design  
✅ **Form Validation** - Client-side validation for careers and contact forms  
✅ **Smooth Animations** - CSS animations and transitions  
✅ **SEO Optimized** - Meta tags and semantic HTML  
✅ **Accessibility** - ARIA labels and proper semantic structure  
✅ **Performance** - Optimized with Vite  
✅ **No External Dependencies** - Only React and ReactDOM  

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── TechBand.jsx
│   ├── About.jsx
│   ├── Services.jsx
│   ├── Portfolio.jsx
│   ├── Careers.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   └── SocialRail.jsx
├── App.jsx (Main app component with SVG sprite)
├── main.jsx (React entry point)
├── styles.css (All styling)
└── index.css

public/
└── (Static assets)

dist/
└── (Built production files)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173/` to see the app in development mode.

### Building for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint (configured but not enforcing)

## 🎨 Styling

All styles are contained in `src/styles.css`:

- **CSS Variables** for consistent theming (colors, fonts, spacing)
- **Mobile-First Responsive Design** with breakpoints at 1024px and 640px
- **Tailored Animations** (pulse, float, marquee, etc.)
- **Dark Mode** elements in talent card and tech band

## 📝 Form Handling

### Career Enquiry Form
- Full validation (name, email, phone, qualification, address, city, state, level, resume, message)
- File upload for resumes (PDF, DOC, DOCX up to 5MB)
- Real-time error clearing

### Contact Form
- Name, email, and message validation
- Email validation with regex pattern
- Message length requirement (minimum 10 characters)

## 🔄 State Management

The app uses React hooks for local state management:

- `useState` for form data
- `useState` for form errors
- `useState` for submission state
- `useEffect` in Header for scroll tracking and active navigation

## 📱 Responsive Breakpoints

- Desktop: 1024px and above
- Tablet: 641px to 1024px
- Mobile: 640px and below

Major layout changes:
- Hide main nav on mobile (show hamburger menu)
- Stack portfoli and form grids
- Single column services grid on mobile
- Hidden social rail on smaller screens

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔗 SVG Sprites

All SVG icons are defined in a sprite element in `App.jsx`:
- Icons for UI (arrow, check, location, mail, phone, upload, etc.)
- Social media icons (Facebook, X, Google, LinkedIn, YouTube)
- Company logo (sun mark)

Reference icons with: `<use href="#icon-id" />`

## 🚀 Deployment

The built project can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

Just upload the contents of the `dist/` folder.

### Example Netlify Deploy

```bash
npm run build
# Connect repo to Netlify and set build command to: npm run build
# Set publish directory to: dist
```

## 📦 Dependencies

- **react** - UI library
- **react-dom** - React rendering
- **vite** - Build tool and dev server

No additional dependencies needed!

## 🎓 Learning Resources

This project demonstrates:
- React component composition
- React hooks (useState, useEffect)
- Form handling and validation
- CSS-in-JS alternatives
- Responsive design patterns
- SVG sprite usage
- SEO best practices

## 📄 License

This project is a modernization of Sun Software Solutions' website.

## 🤝 Contributing

Modifications to enhance the React implementation are welcome!

## 📞 Contact

For inquiries about Sun Software Solutions:
- Email: hello@sunsoftware.co.in
- Phone: +91 (422) 223-0025
- Offices: Coimbatore & Tiruppur, Tamil Nadu, India

---

**Original HTML/CSS/JS** → **React Component Architecture** ✨
