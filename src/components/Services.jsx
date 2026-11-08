export default function Services() {
  const services = [
    {
      icon: 'i-layout',
      title: 'Web Design & UI/UX',
      desc: 'Clean, responsive interfaces designed around real users, real devices and your business goals.'
    },
    {
      icon: 'i-code',
      title: 'Custom Web Applications',
      desc: 'PHP, Laravel and modern JavaScript applications built to fit the way your business actually works.'
    },
    {
      icon: 'i-cart',
      title: 'E-commerce Solutions',
      desc: 'Online stores with secure checkout, smooth product journeys and inventory that scales with you.'
    },
    {
      icon: 'i-mobile',
      title: 'Mobile-Ready Products',
      desc: 'Progressive web apps and mobile-friendly experiences that feel fast, native and effortless.'
    },
    {
      icon: 'i-search',
      title: 'SEO & Digital Marketing',
      desc: 'Technical SEO, content and campaigns that help the right people find you and take action.'
    },
    {
      icon: 'i-shield',
      title: 'Support & Maintenance',
      desc: 'Monitoring, updates and fixes that keep your product healthy long after it goes live.'
    }
  ];

  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Our Services</span>
          <h2 className="reveal">Everything you need to <span className="hl">ship</span>.</h2>
          <p className="reveal" style={{'--d': '80ms'}}>From the first wireframe to long-term support, we cover the full lifecycle of a digital product.</p>
        </div>

        <div className="service-grid">
          {services.map((service, idx) => (
            <article className="service-card reveal" key={idx} style={{'--d': `${idx * 70}ms`}}>
              <span className="service-icon"><svg viewBox="0 0 24 24">
                <use href={`#${service.icon}`} />
              </svg></span>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <a className="service-link" href="#contact">
                Discuss a project <svg viewBox="0 0 24 24">
                  <use href="#i-arrow" />
                </svg>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
