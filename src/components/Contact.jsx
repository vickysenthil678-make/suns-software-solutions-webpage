import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (formData.name.trim().length < 2) newErrors.name = 'Please enter your name.';
    if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email address.';
    if (formData.message.trim().length < 10) newErrors.message = 'Please add a short message (at least 10 characters).';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitted(true);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
        setTimeout(() => setSubmitted(false), 2000);
      } else {
        setErrors({ submit: data.error || 'Error sending message' });
        setSubmitted(false);
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please try again.' });
      setSubmitted(false);
      console.error('Error:', error);
    }
  };

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Get in Touch</span>
          <h2 className="reveal">Let's work together</h2>
          <p className="reveal" style={{'--d': '80ms'}}>Have a project in mind? Drop us a line and let's explore how we can help.</p>
        </div>

        <div className="contact-grid">
          <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="contactName">Your Name *</label>
              <input
                type="text"
                id="contactName"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
              {errors.name && <span className="err">{errors.name}</span>}
            </div>

            <div className="field">
              <label htmlFor="contactEmail">Email *</label>
              <input
                type="email"
                id="contactEmail"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
              {errors.email && <span className="err">{errors.email}</span>}
            </div>

            <div className="field full">
              <label htmlFor="contactMessage">Message *</label>
              <textarea
                id="contactMessage"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                rows="6"
                required
              ></textarea>
              {errors.message && <span className="err">{errors.message}</span>}
            </div>

            <button type="submit" className="btn btn-primary" disabled={submitted}>
              <span className="btn-label">{submitted ? 'Sending...' : 'Send Message'}</span>
            </button>

            {errors.submit && <div style={{color: '#dc2626', padding: '10px', background: 'rgba(220, 38, 38, .1)', borderRadius: '8px'}}>{errors.submit}</div>}

            {submitted && (
              <div className="success-message">
                <p>Thanks for reaching out! We'll get back to you soon.</p>
              </div>
            )}
          </form>

          <div className="contact-info">
            <div className="info-card reveal" style={{'--d': '80ms'}}>
              <span className="info-icon"><svg viewBox="0 0 24 24">
                <use href="#i-location" />
              </svg></span>
              <div>
                <strong>Our Offices</strong>
                <p>Coimbatore &amp; Tiruppur<br />Tamil Nadu, India</p>
              </div>
            </div>

            <div className="info-card reveal" style={{'--d': '140ms'}}>
              <span className="info-icon"><svg viewBox="0 0 24 24">
                <use href="#i-mail" />
              </svg></span>
              <div>
                <strong>Email</strong>
                <a href="mailto:hello@sunsoftware.co.in">hello@sunsoftware.co.in</a>
              </div>
            </div>

            <div className="info-card reveal" style={{'--d': '200ms'}}>
              <span className="info-icon"><svg viewBox="0 0 24 24">
                <use href="#i-phone" />
              </svg></span>
              <div>
                <strong>Phone</strong>
                <a href="tel:+914222230025">+91 (422) 223-0025</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
