export default function Portfolio() {
  const portfolioItems = [
    {
      color: 'teal',
      icon: 'i-layout',
      title: 'E-Commerce Platform',
      tags: ['PHP', 'Laravel', 'MySQL', 'UI Design']
    },
    {
      color: 'orange',
      icon: 'i-code',
      title: 'Digital Marketing Suite',
      tags: ['React', 'Node.js', 'Analytics']
    },
    {
      color: 'blue',
      icon: 'i-mobile',
      title: 'Mobile App Development',
      tags: ['React Native', 'Backend', 'Design']
    },
    {
      color: 'violet',
      icon: 'i-briefcase',
      title: 'CMS Solution',
      tags: ['Laravel', 'Custom', 'Scalable']
    }
  ];

  return (
    <section className="section portfolio" id="portfolio">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Our Work</span>
          <h2 className="reveal">Projects we've shipped.</h2>
          <p className="reveal" style={{'--d': '80ms'}}>From concept to live, we've built digital experiences for businesses across industries.</p>
        </div>

        <div className="work-grid">
          {portfolioItems.map((item, idx) => (
            <div className="work-card reveal" key={idx} style={{'--d': `${idx * 70}ms`}}>
              <div className={`work-art art-${item.color}`}>
                <svg className="art-glyph" viewBox="0 0 24 24">
                  <use href={`#${item.icon}`} />
                </svg>
                <div className="art-panel">
                  <div className="art-bar">
                    <i></i><i></i><i></i>
                  </div>
                  <div className="art-line lg"></div>
                  <div className="art-line"></div>
                  <div className="art-line short"></div>
                  <div className="art-tags">
                    {item.tags.map((tag, i) => (
                      <span key={i}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="work-body">
                <span className="work-tag">Completed Project</span>
                <h3>{item.title}</h3>
                <p>Custom built solution tailored to client needs with scalability and performance in mind.</p>
                <a className="work-link" href="#contact">
                  Learn more <svg viewBox="0 0 24 24">
                    <use href="#i-arrow" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
