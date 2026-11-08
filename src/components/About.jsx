export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container about-grid">
        <div className="about-copy">
          <span className="eyebrow">About Company</span>
          <h2 className="reveal">A sun-powered software studio in <span className="hl">Coimbatore</span>.</h2>
          <p className="reveal" style={{'--d': '70ms'}}>Founded in 2004, Sun Software Solutions has grown from a small engineering team into a full-service software company. We plan, design, build and support digital products for businesses that value dependable technology.</p>
          <p className="reveal" style={{'--d': '120ms'}}>From our offices in Coimbatore and Tiruppur, our designers, developers and SEO specialists work as one team — close to the client, focused on what actually ships.</p>
          <div className="about-points">
            <div className="point reveal" style={{'--d': '160ms'}}>
              <span className="point-icon"><svg viewBox="0 0 24 24">
                <use href="#i-spark" />
              </svg></span>
              <div><strong>Custom, not cookie-cutter</strong><span>Every project starts with your workflow, not a template.</span></div>
            </div>
            <div className="point reveal" style={{'--d': '210ms'}}>
              <span className="point-icon"><svg viewBox="0 0 24 24">
                <use href="#i-users" />
              </svg></span>
              <div><strong>One team, every discipline</strong><span>Design, development, SEO and delivery under one roof.</span></div>
            </div>
            <div className="point reveal" style={{'--d': '260ms'}}>
              <span className="point-icon"><svg viewBox="0 0 24 24">
                <use href="#i-shield" />
              </svg></span>
              <div><strong>Here for the long run</strong><span>Support and maintenance long after launch.</span></div>
            </div>
          </div>
        </div>

        <div className="about-visual reveal" style={{'--d': '120ms'}}>
          <div className="arch">
            <svg viewBox="0 0 480 560" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Sunrise illustration">
              <defs>
                <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#22345a" />
                  <stop offset=".62" stopColor="#16233f" />
                  <stop offset="1" stopColor="#0c1628" />
                </linearGradient>
                <linearGradient id="discGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#ffd97a" />
                  <stop offset="1" stopColor="#f7941d" />
                </linearGradient>
              </defs>
              <rect width="480" height="560" fill="url(#skyGrad)" />
              <g opacity=".45" stroke="#ffc247" strokeWidth="1.6" strokeLinecap="round">
                <line x1="240" y1="55" x2="240" y2="125" />
                <line x1="130" y1="90" x2="163" y2="148" />
                <line x1="350" y1="90" x2="317" y2="148" />
                <line x1="60" y1="180" x2="125" y2="205" />
                <line x1="420" y1="180" x2="355" y2="205" />
                <line x1="40" y1="290" x2="105" y2="300" />
                <line x1="440" y1="290" x2="375" y2="300" />
              </g>
              <g fill="#fff" opacity=".55">
                <circle cx="76" cy="86" r="2.2" />
                <circle cx="392" cy="120" r="1.8" />
                <circle cx="418" cy="64" r="2.4" />
                <circle cx="150" cy="52" r="1.6" />
                <circle cx="318" cy="44" r="2" />
              </g>
              <circle cx="240" cy="330" r="118" fill="url(#discGrad)" />
              <circle cx="240" cy="330" r="118" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1.5" />
              <path d="M0 390 Q120 350 240 390 T480 390 V560 H0Z" fill="#0d1729" />
              <path d="M0 440 Q120 400 240 440 T480 440 V560 H0Z" fill="#111e34" opacity=".96" />
              <path d="M0 495 Q120 460 240 495 T480 495 V560 H0Z" fill="#f7941d" opacity=".88" />
              <path d="M0 522 Q120 494 240 522 T480 522 V560 H0Z" fill="#ffc247" opacity=".92" />
            </svg>
          </div>
          <div className="about-chip chip-a">
            <span className="float-icon"><svg viewBox="0 0 24 24">
              <use href="#i-spark" />
            </svg></span>
            <div><strong>Est. 2004</strong><span>Building since day one</span></div>
          </div>
          <div className="about-chip chip-b">
            <span className="float-icon"><svg viewBox="0 0 24 24">
              <use href="#i-location" />
            </svg></span>
            <div><strong>Two offices</strong><span>Coimbatore &amp; Tiruppur</span></div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="milestones reveal" style={{'--d': '140ms'}}>
          <div className="milestone">
            <strong data-count="22" data-suffix="+">22+</strong>
            <span>Years building</span>
          </div>
          <div className="milestone">
            <strong data-count="2">2</strong>
            <span>Offices in Tamil Nadu</span>
          </div>
          <div className="milestone">
            <strong data-count="6">6</strong>
            <span>Disciplines under one roof</span>
          </div>
          <div className="milestone">
            <strong data-count="1">1</strong>
            <span>Team from brief to launch</span>
          </div>
        </div>
      </div>
    </section>
  );
}
