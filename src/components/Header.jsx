import { useState, useEffect } from 'react';

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Update active nav
      const sections = ['home', 'about', 'services', 'portfolio', 'careers', 'contact'];
      for (let id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveNav(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e) => {
    setNavOpen(false);
    const href = e.currentTarget.getAttribute('href');
    if (href) {
      setActiveNav(href.slice(1));
    }
  };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`} id="siteHeader">
      <div className="container header-inner">
        <a className="brand" href="#home" aria-label="Sun Software Solutions — home">
          <span className="brand-mark">
            <svg viewBox="0 0 64 64" aria-hidden="true">
              <use href="#sun-mark" />
            </svg>
          </span>
          <span className="brand-text">
            <span className="brand-name">Sun Software</span>
            <span className="brand-sub">Solutions</span>
          </span>
        </a>

        <nav className="main-nav" id="mainNav" aria-label="Primary">
          <a href="#home" className={activeNav === 'home' ? 'active' : ''} onClick={handleNavClick}>Home</a>
          <a href="#about" className={activeNav === 'about' ? 'active' : ''} onClick={handleNavClick}>About Company</a>
          <a href="#services" className={activeNav === 'services' ? 'active' : ''} onClick={handleNavClick}>Our Services</a>
          <a href="#portfolio" className={activeNav === 'portfolio' ? 'active' : ''} onClick={handleNavClick}>Portfolio</a>
          <a href="#careers" className={activeNav === 'careers' ? 'active' : ''} onClick={handleNavClick}>Careers</a>
          <a href="#contact" className={activeNav === 'contact' ? 'active' : ''} onClick={handleNavClick}>Contact Us</a>
        </nav>

        <a className="btn btn-primary header-cta" href="#careers">Apply Now</a>

        <button
          className="nav-toggle"
          type="button"
          aria-label={navOpen ? "Close menu" : "Open menu"}
          aria-expanded={navOpen}
          aria-controls="mainNav"
          onClick={() => setNavOpen(!navOpen)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
