export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-col">
          <div className="brand">
            <span className="brand-mark">
              <svg viewBox="0 0 64 64" aria-hidden="true">
                <use href="#sun-mark" />
              </svg>
            </span>
            <span className="brand-text">
              <span className="brand-name">Sun Software</span>
              <span className="brand-sub">Solutions</span>
            </span>
          </div>
          <p>A sun-powered software studio in Coimbatore, building digital experiences since 2004.</p>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#careers">Careers</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Connect</h4>
          <ul>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://x.com" target="_blank" rel="noopener noreferrer">X</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Get in Touch</h4>
          <p><strong>Email:</strong><br /><a href="mailto:hello@sunsoftware.co.in">hello@sunsoftware.co.in</a></p>
          <p><strong>Phone:</strong><br /><a href="tel:+914222230025">+91 (422) 223-0025</a></p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; <span id="year">{currentYear}</span> Sun Software Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
