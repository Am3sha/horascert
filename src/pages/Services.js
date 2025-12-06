import React from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard/ServiceCard';
import './Services.css';

const Services = () => {
  const services = [
    {
      id: 'iso-9001',
      name: 'ISO 9001:2015',
      tagline: 'Quality Management',
      icon: 'https://via.placeholder.com/100x100/2c5aa0/ffffff?text=ISO+9001'
    },
    {
      id: 'iso-14001',
      name: 'ISO 14001:2015',
      tagline: 'Environmental Management',
      icon: 'https://via.placeholder.com/100x100/2c5aa0/ffffff?text=ISO+14001'
    },
    {
      id: 'iso-45001',
      name: 'ISO 45001:2018',
      tagline: 'Occupational Health & Safety',
      icon: 'https://via.placeholder.com/100x100/2c5aa0/ffffff?text=ISO+45001'
    },
    {
      id: 'iso-22000',
      name: 'ISO 22000:2018',
      tagline: 'Food Safety Management',
      icon: 'https://via.placeholder.com/100x100/2c5aa0/ffffff?text=ISO+22000'
    },
    {
      id: 'haccp',
      name: 'HACCP',
      tagline: 'Food Safety System',
      icon: 'https://via.placeholder.com/100x100/2c5aa0/ffffff?text=HACCP'
    },
    {
      id: 'gmp',
      name: 'GMP',
      tagline: 'Good Manufacturing Practice',
      icon: 'https://via.placeholder.com/100x100/2c5aa0/ffffff?text=GMP'
    }
  ];

  return (
    <div className="services-page">
      <div className="page-header">
        <div className="container">
          <h1>Our Certification Services</h1>
          <p>Comprehensive ISO certification services to help your organization achieve international standards</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="services-grid">
            {services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section section" style={{ backgroundColor: 'var(--light-gray)' }}>
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Certified?</h2>
            <p>Contact us today for a free consultation and quote</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">Get Free Quote</Link>
              <Link to="/application" className="btn btn-secondary">Apply Now</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;

