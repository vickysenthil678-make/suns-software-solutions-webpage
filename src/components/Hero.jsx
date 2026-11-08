export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-orbs" aria-hidden="true">
        <i></i><i></i><i></i>
      </div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">Careers at Sun Software Solutions</span>
          <h1>Career <span className="accent">Enquiry</span></h1>
          <p className="lede">We are a Coimbatore-based software team building websites, web applications and digital experiences since 2004. If you like solving real problems with clean work, we would love to meet you.</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#careers">
              Apply Now
              <svg aria-hidden="true">
                <use href="#i-arrow" />
              </svg>
            </a>
            <a className="btn btn-ghost" href="#portfolio">Explore our work</a>
          </div>
          <div className="hero-meta">
            <div className="meta">
              <svg aria-hidden="true">
                <use href="#i-location" />
              </svg>
              Coimbatore &amp; Tiruppur
            </div>
            <div className="meta">
              <svg aria-hidden="true">
                <use href="#i-spark" />
              </svg>
              Building since 2004
            </div>
            <div className="meta">
              <svg aria-hidden="true">
                <use href="#i-users" />
              </svg>
              Design · Dev · SEO
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-halo"></div>
          <div className="talent-card">
            <svg className="talent-mark" viewBox="0 0 64 64">
              <use href="#sun-mark" />
            </svg>
            <div className="talent-head">
              <span className="hiring"><i></i>We're hiring</span>
              <span className="talent-est">Est. 2004</span>
            </div>
            <h3>Good work starts with good people.</h3>
            <p>Join a team shipping websites, products and digital experiences for businesses across India.</p>
            <div className="talent-chips">
              <span>Designer</span>
              <span>Programmer</span>
              <span>SEO</span>
              <span>Team Leader</span>
            </div>
            <div className="talent-foot">
              <div className="avatars">
                <span>AK</span><span>RS</span><span>VM</span><span className="plus">+</span>
              </div>
              One team, many disciplines.
            </div>
          </div>

          <div className="float-card one">
            <span className="float-icon"><svg viewBox="0 0 24 24">
              <use href="#i-location" />
            </svg></span>
            <div>
              <strong>Coimbatore &amp; Tiruppur</strong>
              <span>Two offices, one team</span>
            </div>
          </div>

          <div className="float-card two">
            <span className="float-icon"><svg viewBox="0 0 24 24">
              <use href="#i-spark" />
            </svg></span>
            <div>
              <strong>6 disciplines</strong>
              <span>Design · Dev · SEO</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
