import { useState } from 'react';

export default function Careers() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    qualification: '',
    address: '',
    city: '',
    state: '',
    level: '',
    resume: null,
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (formData.fullName.trim().length < 2) newErrors.fullName = 'Please enter your full name.';
    if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email address.';
    const digits = formData.phone.replace(/\D/g, '');
    if (digits.length < 7 || digits.length > 15) newErrors.phone = 'Please enter a valid contact number.';
    if (!formData.qualification.trim()) newErrors.qualification = 'Please tell us your qualification.';
    if (!formData.address.trim()) newErrors.address = 'Please enter your address.';
    if (!formData.city.trim()) newErrors.city = 'Please enter your city.';
    if (!formData.state.trim()) newErrors.state = 'Please enter your state.';
    if (!formData.level) newErrors.level = 'Please select a level.';
    
    if (!formData.resume) {
      newErrors.resume = 'Please attach your resume.';
    } else if (formData.resume.size > 5 * 1024 * 1024) {
      newErrors.resume = 'Please upload a file under 5 MB.';
    } else if (!/\.(pdf|doc|docx)$/i.test(formData.resume.name)) {
      newErrors.resume = 'Please upload a PDF or Word document.';
    }

    if (formData.message.trim().length < 10) newErrors.message = 'Please write a short message (at least 10 characters).';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitted(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('qualification', formData.qualification);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('state', formData.state);
      formDataToSend.append('level', formData.level);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('resume', formData.resume);

      const response = await fetch('http://localhost:5000/api/careers', {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          qualification: '',
          address: '',
          city: '',
          state: '',
          level: '',
          resume: null,
          message: ''
        });
        setErrors({});
      } else {
        setErrors({ submit: data.error || 'Error submitting application' });
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please try again.' });
      console.error('Error:', error);
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <section className="section careers" id="careers">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Join Us</span>
          <h2 className="reveal">Career Enquiry</h2>
          <p className="reveal" style={{'--d': '80ms'}}>Tell us about yourself and we'll get back to you soon.</p>
        </div>

        <form className="career-form" id="careerForm" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
              {errors.fullName && <span className="err">{errors.fullName}</span>}
            </div>

            <div className="field">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
              {errors.email && <span className="err">{errors.email}</span>}
            </div>

            <div className="field">
              <label htmlFor="phone">Phone *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                required
              />
              {errors.phone && <span className="err">{errors.phone}</span>}
            </div>

            <div className="field">
              <label htmlFor="qualification">Qualification *</label>
              <input
                type="text"
                id="qualification"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                placeholder="Your qualification"
                required
              />
              {errors.qualification && <span className="err">{errors.qualification}</span>}
            </div>

            <div className="field">
              <label htmlFor="address">Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street address"
                required
              />
              {errors.address && <span className="err">{errors.address}</span>}
            </div>

            <div className="field">
              <label htmlFor="city">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Your city"
                required
              />
              {errors.city && <span className="err">{errors.city}</span>}
            </div>

            <div className="field">
              <label htmlFor="state">State *</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Your state"
                required
              />
              {errors.state && <span className="err">{errors.state}</span>}
            </div>

            <div className="field">
              <label htmlFor="level">Level *</label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                required
              >
                <option value="">Select a position level</option>
                <option value="fresher">Fresher</option>
                <option value="junior">Junior</option>
                <option value="mid">Mid-level</option>
                <option value="senior">Senior</option>
                <option value="lead">Lead</option>
              </select>
              {errors.level && <span className="err">{errors.level}</span>}
            </div>

            <div className="field">
              <label htmlFor="resume">Resume *</label>
              <input
                type="file"
                id="resume"
                name="resume"
                onChange={handleChange}
                accept=".pdf,.doc,.docx"
                required
              />
              {errors.resume && <span className="err">{errors.resume}</span>}
            </div>

            <div className="field full">
              <label htmlFor="message">Tell us about yourself *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Share your experience, skills, and why you'd like to join us..."
                rows="5"
                required
              ></textarea>
              {errors.message && <span className="err">{errors.message}</span>}
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={submitted}>
            <span className="btn-label">{submitted ? 'Sending...' : 'Submit Application'}</span>
          </button>

          {submitted && (
            <div className="success-message">
              <p>Thanks, {formData.fullName}. Your enquiry has been received — our team will review it and get back to you within two business days.</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
