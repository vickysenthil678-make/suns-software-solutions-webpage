export default function SocialRail() {
  return (
    <aside className="social-rail" aria-label="Social media">
      <a href="https://facebook.com" aria-label="Facebook" title="Facebook" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <use href="#s-fb" />
        </svg>
      </a>
      <a href="https://x.com" aria-label="X" title="X" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <use href="#s-x" />
        </svg>
      </a>
      <a href="https://google.com" aria-label="Google" title="Google" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <use href="#s-google" />
        </svg>
      </a>
      <a href="https://linkedin.com" aria-label="LinkedIn" title="LinkedIn" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <use href="#s-linkedin" />
        </svg>
      </a>
      <a href="https://youtube.com" aria-label="YouTube" title="YouTube" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <use href="#s-youtube" />
        </svg>
      </a>
    </aside>
  );
}
