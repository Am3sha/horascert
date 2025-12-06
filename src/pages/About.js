import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="page-header">
        <div className="container">
          <img
            src="/horas-logo.png"
            alt="HORAS Cert Logo"
            className="company-logo"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <h1>WHO WE ARE</h1>
        </div>
      </div>

      <section className="section about-section">
        <div className="container">
          <p className="about-description">
            <strong>HORAS-Cert</strong> Organization for Quality Systems and Certifications is the accredited certification body recognized by the National Accreditation Council.
          </p>

          <h3>Our Accredited Standards</h3>
          <ul className="standards-list">
            <li>ISO 9001:2015 - Quality Management System</li>
            <li>ISO 14001:2015 - Environmental Management System</li>
            <li>ISO 45001:2018 - Occupational Health and Safety Management System</li>
            <li>ISO 22000:2018 - Food Safety Management System</li>
          </ul>

          <h3>Industries We Serve</h3>
          <p className="industries-intro">
            HORAS provides expert certification and audit services across diverse sectors:
          </p>
          <ul className="industries-grid">
            <li>Food Products, Beverages & Tobacco</li>
            <li>Agriculture, Forestry & Fishing</li>
            <li>Wholesale & Retail Trade</li>
            <li>Automotive Services</li>
            <li>Health & Safety</li>
            <li>Environmental Services</li>
            <li>Retail Chains</li>
            <li>Hotels & Restaurants</li>
            <li>Information Technology</li>
            <li>Education</li>
            <li>Financial Services</li>
            <li>Real Estate</li>
            <li>Machinery & Equipment</li>
            <li>Chemicals & Petrochemicals</li>
            <li>General Administration</li>
          </ul>

          <div className="countries-section">
            <h3>Our Global Presence</h3>

            <h4>Currently Operating in 4 Countries:</h4>
            <div className="current-countries">
              <span className="country-badge">🇪🇬 Egypt</span>
              <span className="country-badge">🇸🇦 Saudi Arabia</span>
              <span className="country-badge">🇦🇪 United Arab Emirates</span>
            </div>

            <h4>Expanding Soon to:</h4>
            <div className="expanding-countries">
              <span>Sudan</span>
              <span>Jordan</span>
              <span>Libya</span>
              <span>Iraq</span>
              <span>Kuwait</span>
              <span>Oman</span>
              <span>Tunisia</span>
              <span>Algeria</span>
              <span>Morocco</span>
              <span>Kenya</span>
              <span>Tanzania</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--light-gray)' }}>
        <div className="container">
          <h2 className="section-title">Accreditations and Registrations</h2>
          <div className="accreditations-grid">
            <div className="accreditation-card">
              <div className="accreditation-icon">🏆</div>
              <h3>EGAC Accredited</h3>
              <p>Accredited by the Egyptian Accreditation Council (EGAC) for ISO certification services</p>
            </div>
            <div className="accreditation-card">
              <div className="accreditation-icon">🌍</div>
              <h3>IAF Member</h3>
              <p>Internationally recognized through IAF (International Accreditation Forum) membership</p>
            </div>
            <div className="accreditation-card">
              <div className="accreditation-icon">✅</div>
              <h3>ISO/IEC 17021 Compliant</h3>
              <p>Operating in accordance with ISO/IEC 17021 requirements for certification bodies</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="policies-grid">
            <div className="policy-card">
              <h3>Quality Policy</h3>
              <p>
                We are committed to providing reliable, impartial, and value-added certification services that meet
                international standards and exceed customer expectations. Our quality policy ensures continuous
                improvement in all our processes and services.
              </p>
            </div>
            <div className="policy-card">
              <h3>Impartiality Policy</h3>
              <p>
                HORAS-Cert is committed to maintaining impartiality in all certification activities. We ensure
                that our certification decisions are based solely on objective evidence and are not influenced by
                commercial, financial, or other pressures.
              </p>
            </div>
            <div className="policy-card">
              <h3>Confidentiality Policy</h3>
              <p>
                We maintain strict confidentiality of all information obtained during the certification process.
                All client information is protected and used solely for certification purposes in accordance with
                applicable laws and regulations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

