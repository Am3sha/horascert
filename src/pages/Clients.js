import React from 'react';
import './Clients.css';

const Clients = () => {
  const clientLogos = [
    { id: 1, name: 'Client 1', logo: 'https://via.placeholder.com/200x100/2c5aa0/ffffff?text=Client+1' },
    { id: 2, name: 'Client 2', logo: 'https://via.placeholder.com/200x100/2c5aa0/ffffff?text=Client+2' },
    { id: 3, name: 'Client 3', logo: 'https://via.placeholder.com/200x100/2c5aa0/ffffff?text=Client+3' },
    { id: 4, name: 'Client 4', logo: 'https://via.placeholder.com/200x100/2c5aa0/ffffff?text=Client+4' },
    { id: 5, name: 'Client 5', logo: 'https://via.placeholder.com/200x100/2c5aa0/ffffff?text=Client+5' },
    { id: 6, name: 'Client 6', logo: 'https://via.placeholder.com/200x100/2c5aa0/ffffff?text=Client+6' },
    { id: 7, name: 'Client 7', logo: 'https://via.placeholder.com/200x100/2c5aa0/ffffff?text=Client+7' },
    { id: 8, name: 'Client 8', logo: 'https://via.placeholder.com/200x100/2c5aa0/ffffff?text=Client+8' },
    { id: 9, name: 'Client 9', logo: 'https://via.placeholder.com/200x100/2c5aa0/ffffff?text=Client+9' },
    { id: 10, name: 'Client 10', logo: 'https://via.placeholder.com/200x100/2c5aa0/ffffff?text=Client+10' },
    { id: 11, name: 'Client 11', logo: 'https://via.placeholder.com/200x100/2c5aa0/ffffff?text=Client+11' },
    { id: 12, name: 'Client 12', logo: 'https://via.placeholder.com/200x100/2c5aa0/ffffff?text=Client+12' }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Ahmed Mohamed',
      position: 'CEO, Manufacturing Company',
      quote: 'QualityCert provided excellent service throughout our ISO 9001 certification process. Their team was professional, knowledgeable, and supportive.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80'
    },
    {
      id: 2,
      name: 'Sara Ali',
      position: 'Quality Manager, Food Company',
      quote: 'The certification process was smooth and well-organized. QualityCert helped us improve our quality management system significantly.',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80'
    },
    {
      id: 3,
      name: 'Mohamed Hassan',
      position: 'Operations Director, Construction Firm',
      quote: 'We are very satisfied with QualityCert\'s services. Their auditors were thorough and provided valuable insights for improvement.',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80'
    }
  ];

  return (
    <div className="clients-page">
      <div className="page-header">
        <div className="container">
          <h1>Our Clients</h1>
          <p>Trusted by 500+ organizations across various industries</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Certified Organizations</h2>
          <p className="section-subtitle">
            We are proud to have certified hundreds of organizations across multiple sectors
          </p>
          <div className="clients-grid">
            {clientLogos.map(client => (
              <div key={client.id} className="client-logo-card">
                <img src={client.logo} alt={client.name} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--light-gray)' }}>
        <div className="container">
          <h2 className="section-title">Client Testimonials</h2>
          <p className="section-subtitle">
            Hear what our clients have to say about working with us
          </p>
          <div className="testimonials-grid">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="quote-icon">"</div>
                <p className="testimonial-quote">{testimonial.quote}</p>
                <div className="testimonial-author">
                  <img src={testimonial.photo} alt={testimonial.name} />
                  <div>
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="stats-section">
            <div className="stat-card">
              <h3>500+</h3>
              <p>Certified Organizations</p>
            </div>
            <div className="stat-card">
              <h3>15+</h3>
              <p>Years of Experience</p>
            </div>
            <div className="stat-card">
              <h3>20+</h3>
              <p>Industries Served</p>
            </div>
            <div className="stat-card">
              <h3>98%</h3>
              <p>Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Clients;

