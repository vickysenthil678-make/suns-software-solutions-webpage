import './styles.css';
import Header from './components/Header';
import SocialRail from './components/SocialRail';
import Hero from './components/Hero';
import TechBand from './components/TechBand';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Careers from './components/Careers';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <div className="scroll-progress" aria-hidden="true"><i></i></div>
      <a className="skip-link" href="#careers">Skip to career enquiry</a>
      <SVGSprite />
      <Header />
      <SocialRail />
      <main>
        <Hero />
        <TechBand />
        <About />
        <Services />
        <Portfolio />
        <Careers />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function SVGSprite() {
  return (
    <svg className="sprite" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
      <symbol id="sun-mark" viewBox="0 0 64 64">
        <defs>
          <linearGradient id="sunGrad" x1="8" y1="6" x2="56" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffcb52" />
            <stop offset=".52" stopColor="#f7941d" />
            <stop offset="1" stopColor="#e25704" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="url(#sunGrad)" />
        <circle cx="32" cy="32" r="30" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1" />
        <g stroke="#fff" strokeWidth="2.3" strokeLinecap="round" opacity=".92">
          <line x1="32" y1="8.5" x2="32" y2="14.5" />
          <line x1="48.6" y1="15.4" x2="44.4" y2="19.6" />
          <line x1="55.5" y1="32" x2="49.5" y2="32" />
          <line x1="15.4" y1="15.4" x2="19.6" y2="19.6" />
          <line x1="8.5" y1="32" x2="14.5" y2="32" />
        </g>
        <path d="M17 38a15 15 0 0 1 30 0Z" fill="#fff" />
        <path d="M13 42c4-2.4 8-2.4 12 0s8 2.4 12 0 8-2.4 12 0" fill="none" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" opacity=".95" />
        <path d="M17.5 47.5c4-2.4 8-2.4 12 0s8 2.4 12 0" fill="none" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" opacity=".55" />
      </symbol>

      <symbol id="i-arrow" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 12h15" />
          <path d="m13.5 6 6 6-6 6" />
        </g>
      </symbol>
      <symbol id="i-check" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="m5 12.5 4.2 4.2L19 7" />
        </g>
      </symbol>
      <symbol id="i-location" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
          <circle cx="12" cy="10" r="2.6" />
        </g>
      </symbol>
      <symbol id="i-mail" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5.2" width="18" height="13.6" rx="2.6" />
          <path d="m4.5 7.4 7.5 5.6 7.5-5.6" />
        </g>
      </symbol>
      <symbol id="i-phone" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.5 16.9v2.6a2 2 0 0 1-2.2 2 19.6 19.6 0 0 1-8.5-3 19.3 19.3 0 0 1-6-6A19.6 19.6 0 0 1 1.8 4a2 2 0 0 1 2-2.2h2.6a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L7.5 9.6a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2.2Z" />
        </g>
      </symbol>
      <symbol id="i-upload" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 16V4" />
          <path d="m7 9 5-5 5 5" />
          <path d="M4.5 15v3.5A2.5 2.5 0 0 0 7 21h10a2.5 2.5 0 0 0 2.5-2.5V15" />
        </g>
      </symbol>
      <symbol id="i-layout" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="16" rx="2.6" />
          <path d="M3 10h18M9 10v10" />
        </g>
      </symbol>
      <symbol id="i-code" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="m8 7-5 5 5 5" />
          <path d="m16 7 5 5-5 5" />
        </g>
      </symbol>
      <symbol id="i-cart" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9.2" cy="20" r="1.4" />
          <circle cx="18" cy="20" r="1.4" />
          <path d="M2.5 3.5h2.3l2.3 11a2 2 0 0 0 2 1.6h8.3a2 2 0 0 0 2-1.6L21 7.5H6" />
        </g>
      </symbol>
      <symbol id="i-mobile" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="7" y="2.5" width="10" height="19" rx="2.6" />
          <path d="M11 18.6h2" />
        </g>
      </symbol>
      <symbol id="i-search" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="6.6" />
          <path d="m16 16 4.7 4.7" />
        </g>
      </symbol>
      <symbol id="i-shield" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3 5 5.8v5.4c0 4.4 3 8.3 7 9.8 4-1.5 7-5.4 7-9.8V5.8L12 3Z" />
          <path d="m9 12 2.1 2.1L15.2 10" />
        </g>
      </symbol>
      <symbol id="i-users" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9.2" cy="8" r="3.3" />
          <path d="M3.4 20a5.8 5.8 0 0 1 11.6 0" />
          <path d="M15.8 5.2a3.3 3.3 0 0 1 0 5.9" />
          <path d="M17.4 14.6a5.8 5.8 0 0 1 3.2 5.4" />
        </g>
      </symbol>
      <symbol id="i-spark" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.8v4M12 17.2v4M2.8 12h4M17.2 12h4" />
          <path d="m5.5 5.5 2.8 2.8M15.7 15.7l2.8 2.8M18.5 5.5l-2.8 2.8M8.3 15.7l-2.8 2.8" />
        </g>
      </symbol>
      <symbol id="i-briefcase" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="7" width="18" height="13" rx="2.6" />
          <path d="M9 7V5.6A2.6 2.6 0 0 1 11.6 3h.8A2.6 2.6 0 0 1 15 5.6V7" />
          <path d="M3 12.2h18" />
        </g>
      </symbol>
      <symbol id="i-clock" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="8.6" />
          <path d="M12 7.4V12l3.1 1.9" />
        </g>
      </symbol>

      <symbol id="s-fb" viewBox="0 0 24 24">
        <path fill="currentColor" d="M13.4 21v-7.4h2.5l.4-2.9h-2.9V8.9c0-.8.2-1.4 1.4-1.4h1.6V4.9c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.1H8v2.9h2.5V21h2.9Z" />
      </symbol>
      <symbol id="s-x" viewBox="0 0 24 24">
        <path fill="currentColor" d="M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.3L5.3 21H2.2l7.3-8.3L2.5 3h6.3l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z" />
      </symbol>
      <symbol id="s-google" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
      </symbol>
      <symbol id="s-linkedin" viewBox="0 0 24 24">
        <path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.1 9.2h3.8V21H3.1V9.2Zm6.1 0h3.6v1.6h.1c.5-.9 1.7-1.9 3.5-1.9 3.8 0 4.5 2.5 4.5 5.7V21h-3.8v-5.7c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3V21H9.2V9.2Z" />
      </symbol>
      <symbol id="s-youtube" viewBox="0 0 24 24">
        <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2A31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z" />
      </symbol>
    </svg>
  );
}

export default App;
