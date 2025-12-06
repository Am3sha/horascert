import React from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/Hero/HeroSlider';
import ServiceCard from '../components/ServiceCard/ServiceCard';
import TeamMember from '../components/TeamMember/TeamMember';
import ContactForm from '../components/ContactForm/ContactForm';
import './Home.css';

const Home = () => {
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

  const teamMembers = [
    {
      id: 1,
      name: 'Eng. Ahmed Mohamed',
      position: 'Chief Executive Officer',
      bio: 'Over 20 years of experience in quality management and certification services.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80'
    },
    {
      id: 2,
      name: 'Eng. Sara Ali',
      position: 'Quality Manager',
      bio: 'Expert in ISO standards implementation and quality assurance systems.',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80'
    },
    {
      id: 3,
      name: 'Eng. Mohamed Hassan',
      position: 'Technical Director',
      bio: 'Specialized in environmental and safety management systems.',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80'
    },
    {
      id: 4,
      name: 'Eng. Fatima Ibrahim',
      position: 'Lead Auditor',
      bio: 'Certified lead auditor with extensive experience in food safety standards.',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80'
    }
  ];

  return (
    <div className="home-page">
      <HeroSlider />

      {/* About Section */}
      <section className="about-section section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="section-title">About Our Company</h2>
              <p>
                HORAS-Cert  Organization for Quality Systems and Certifications is the accredited accreditation body of the National Accreditation Council for the following standards. </p>

              <p>1- Quality Management System ISO 9001: 2015 </p>

              <p>2- Environmental Management System ISO 14001: 2015 </p>

              <p>3- Occupational Health and Safety Management System ISO 45001:2018 </p>

              <p>4- Food Safety Management Systems ISO 22000: 2018</p>


              <Link to="/about" className="btn btn-secondary">
                Read More About Us
              </Link>
            </div>
            <div className="about-image">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80"
                alt="Professional team meeting"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="vision-section section">
        <div className="container">
          <div className="vision-card-full">
            <div className="card-icon-large">👁️</div>
            <h2 className="section-title">Our Vision</h2>
            <p className="vision-text">
              To be the leading certification body in the region, recognized for excellence, integrity, and innovation
              in quality management systems certification. We aim to help organizations achieve sustainable growth and
              international recognition through world-class certification services.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="mission-section section" style={{ backgroundColor: 'var(--light-gray)' }}>
        <div className="container">
          <div className="mission-card-full">
            <div className="card-icon-large">🎯</div>
            <h2 className="section-title">Our Mission</h2>
            <p className="mission-text">
              To provide reliable, impartial, and value-added certification services that enable organizations to
              demonstrate their commitment to quality, environmental responsibility, and occupational health and safety.
              We strive to build long-term partnerships with our clients based on trust and mutual success.
            </p>
          </div>
        </div>
      </section>

      {/* Standards Section */}
      <section className="standards-section section">
        <div className="container">
          <h2 className="section-title">Horas Accredited Standards and Scopes from EGAC</h2>
          <p className="section-subtitle">
            Comprehensive ISO certification services to help your organization achieve international standards
          </p>
          <div className="services-grid">
            {services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Geographical Coverage Section */}
      <section id="geographical-coverage" className="geographical-section section" style={{ backgroundColor: 'var(--light-gray)' }}>
        <div className="container">
          <h2 className="section-title">Geographical Areas in which the CB Operates</h2>
          <div className="geographical-content">
            <div className="current-operating">
              <h3>Currently Operating in 3 Countries:</h3>
              <div className="countries-badges">
                <span className="country-badge-primary">🇪🇬 Egypt</span>
                <span className="country-badge-primary">🇸🇦 Saudi Arabia</span>
                <span className="country-badge-primary">🇦🇪 United Arab Emirates</span>
              </div>
            </div>
            <div className="expanding-soon">
              <h3>Expanding Soon to:</h3>
              <div className="countries-badges-expanding">
                <span className="country-badge-secondary">Sudan</span>
                <span className="country-badge-secondary">Jordan</span>
                <span className="country-badge-secondary">Libya</span>
                <span className="country-badge-secondary">Iraq</span>
                <span className="country-badge-secondary">Kuwait</span>
                <span className="country-badge-secondary">Oman</span>
                <span className="country-badge-secondary">Tunisia</span>
                <span className="country-badge-secondary">Algeria</span>
                <span className="country-badge-secondary">Morocco</span>
                <span className="country-badge-secondary">Kenya</span>
                <span className="country-badge-secondary">Tanzania</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Process Section */}
      <section id="certification-process" className="certification-process-section section">
        <div className="container">
          <h2 className="section-title">Certification Process</h2>
          <p className="section-subtitle">
            A clear, structured approach to help you achieve certification efficiently and effectively
          </p>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Application</h3>
              <p>Submit your application form with required documents</p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Document Review</h3>
              <p>Our experts review your documentation and management system</p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>On-site Audit</h3>
              <p>Comprehensive audit of your facilities and processes</p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Certification Decision</h3>
              <p>Review and approval by certification committee</p>
            </div>
            <div className="process-step">
              <div className="step-number">5</div>
              <h3>Surveillance Audits</h3>
              <p>Regular audits to maintain certification compliance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section section" style={{ backgroundColor: 'var(--light-gray)' }}>
        <div className="container">
          <h2 className="section-title">Meet Our Experts</h2>
          <p className="section-subtitle">
            Our experienced team of auditors and quality professionals dedicated to your success
          </p>
          <div className="team-grid">
            {teamMembers.map(member => (
              <TeamMember key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-section">
        <div className="container">
          <h2 className="section-title">Contact Us Today and Get a Free Quote</h2>
          <p className="section-subtitle">
            Fill out the form below and our team will get back to you within 24 hours
          </p>
          <ContactForm />
        </div>
      </section>
    </div>
  );
};

export default Home;

