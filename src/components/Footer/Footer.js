import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const services = [
    { id: 'iso-9001', name: 'ISO 9001:2015 - Quality Management' },
    { id: 'iso-14001', name: 'ISO 14001:2015 - Environmental Management' },
    { id: 'iso-45001', name: 'ISO 45001:2018 - Occupational Health & Safety' },
    { id: 'iso-22000', name: 'ISO 22000:2018 - Food Safety Management' },
    { id: 'haccp', name: 'HACCP - Food Safety System' },
    { id: 'gmp', name: 'GMP - Good Manufacturing Practice' }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-accreditation-section">
          <h3>Audit and Certification Services</h3>
          <p className="footer-description">
            Enables you to identify and mitigate key risks in your operations, supply chains and business processes.
          </p>
          <div className="accreditation-logos-grid">
            <div className="accreditation-logo-item">
              <div className="logo-placeholder">CAPO</div>
              <span>CAPO</span>
            </div>
            <div className="accreditation-logo-item">
              <div className="logo-placeholder">EGAC</div>
              <span>EGAC</span>
            </div>
            <div className="accreditation-logo-item">
              <div className="logo-placeholder">IAF</div>
              <span>IAF</span>
            </div>
            <div className="accreditation-logo-item">
              <div className="logo-placeholder">EOS</div>
              <span>EOS</span>
            </div>
          </div>
        </div>

        <div className="footer-content">
          <div className="footer-column">
            <h3>About HORAS-Cert</h3>
            <p>
              Accredited certification body recognized by EGAC and internationally recognized through IAF.
              Your partner in quality excellence.
            </p>
          </div>

          <div className="footer-column">
            <h3>Our Services</h3>
            <ul>
              {services.map(service => (
                <li key={service.id}>
                  <Link to={`/services/${service.id}`}>{service.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h3>Gallery</h3>
            <div className="gallery-grid">
              <div className="gallery-item">ISO 9001</div>
              <div className="gallery-item">ISO 14001</div>
              <div className="gallery-item">ISO 45001</div>
              <div className="gallery-item">ISO 22000</div>
            </div>
          </div>

          <div className="footer-column">
            <h3>Useful Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/clients">Our Clients</Link></li>
              <li><Link to="/certificate-validation">Certificate Validation</Link></li>
              <li><Link to="/application">Application</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="footer-contact">
              <span>📞 +20 123 456 7890 | +20 123 456 7891</span>
              <span>✉️ info@yourcompany.com</span>
              <span>📍 [Your Address], Cairo, Egypt</span>
            </div>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">Facebook</a>
              <a href="#" aria-label="LinkedIn">LinkedIn</a>
              <a href="#" aria-label="Twitter">Twitter</a>
            </div>
            <div className="footer-copyright">
              <p>&copy; {new Date().getFullYear()} HORAS-Cert. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

