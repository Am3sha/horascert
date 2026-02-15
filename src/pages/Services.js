import React from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard/ServiceCard';
import PageHero from '../components/PageHero/PageHero';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Services.css';

const Services = () => {
  useScrollReveal();
  const breadcrumb = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services', isCurrent: true }
  ];
  const services = [
    {
      id: 'iso-9001',
      name: 'ISO 9001:2015',
      tagline: 'Quality Management System',
      icon: '/imges/ISO_9001-2015-1003x1024.jpg',
      description: 'International standard for quality management systems that helps organizations demonstrate their ability to consistently provide products and services that meet customer and regulatory requirements.'
    },
    {
      id: 'iso-14001',
      name: 'ISO 14001:2015',
      tagline: 'Environmental Management System',
      icon: '/imges/iso14001-1024x1024.png',
      description: 'Framework for an effective environmental management system, helping organizations improve their environmental performance through more efficient use of resources and reduction of waste.'
    },
    {
      id: 'iso-45001',
      name: 'ISO 45001:2018',
      tagline: 'Occupational Health & Safety',
      icon: '/imges/iso-45001.png',
      description: 'International standard for occupational health and safety management systems, providing a framework to improve employee safety, reduce workplace risks, and create better working conditions.'
    },
    {
      id: 'iso-22000',
      name: 'ISO 22000:2018',
      tagline: 'Food Safety Management System',
      icon: '/imges/ISO-22000-2018.jpg',
      description: 'Specifies requirements for a food safety management system to ensure food is safe at the time of human consumption, covering the entire food chain from farm to fork.'
    },
    {
      id: 'haccp',
      name: 'HACCP',
      tagline: 'Food Safety System',
      icon: '/imges/HACCP-Certification-Logo-for-News-webpage-1024x750.jpg',
      description: 'Systematic preventive approach to food safety that addresses physical, chemical, and biological hazards as a means of prevention rather than finished product inspection.'
    },
    {
      id: 'gmp',
      name: 'GMP',
      tagline: 'Good Manufacturing Practice',
      icon: '/imges/gmp-good-manufacturing-practice-certified-round-stamp-on-white-background-vector-e1731932642480.jpg',
      description: 'System for ensuring that products are consistently produced and controlled according to quality standards, minimizing risks in pharmaceutical, food, or cosmetic production.'
    }
  ];

  return (
    <div className="services-page">
      <PageHero
        title="Our Certification Services"
        subtitle="Comprehensive ISO certification services to help your organization achieve international standards"
        breadcrumb={breadcrumb}
      />

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

