import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './ServiceDetail.css';

const ServiceDetail = () => {
  const { serviceId } = useParams();

  // Map service IDs to certificate images
  const certificateImages = {
    'iso-9001': '/imges/ISO_9001-2015-1003x1024.jpg',
    'iso-14001': '/imges/ISO_9001-2015-1003x1024.jpg',
    'iso-45001': '/imges/iso 45001-2018.jpeg',
    'iso-22000': '/imges/ISO-22000-2018.webp',
    'haccp': '/imges/HACCP-Certification-Logo-for-News-webpage-1024x750.jpg',
    'gmp': '/imges/gmp-good-manufacturing-practice-certified-round-stamp-on-white-background-vector-e1731932642480.jpg'
  };

  const serviceDetails = {
    'iso-9001': {
      name: 'ISO 9001:2015',
      fullName: 'ISO 9001:2015 - Quality Management System',
      description: 'ISO 9001:2015 is an international standard that specifies the requirements for a quality management system (QMS). The standard provides guidelines for organizations to establish, implement, maintain, and continually improve their QMS to enhance customer satisfaction and meet applicable regulatory requirements.',
      benefits: [
        'Improved customer satisfaction',
        'Increased efficiency and productivity',
        'Enhanced reputation',
        'Compliance with regulatory requirements',
        'Helps identify and address risks and vulnerabilities in processes'
      ],
      industries: [
        'Manufacturing',
        'Service providers',
        'Healthcare organizations',
        'Educational institutions',
        'Government agencies',
        'Construction companies',
        'IT and software development',
        'Retail and distribution'
      ],
      requirements: [
        'A focus on customer satisfaction',
        'A commitment to continuous improvement',
        'Effective communication with interested parties',
        'The involvement of employees in the quality management process',
        'Leadership commitment',
        'Risk-based thinking',
        'Establishment of clear policies, objectives, and processes for achieving quality objectives'
      ]
    },
    'iso-14001': {
      name: 'ISO 14001:2015',
      fullName: 'ISO 14001:2015 - Environmental Management System',
      description: 'ISO 14001:2015 is an international standard that provides a framework for organizations to manage and improve their environmental performance.',
      benefits: [
        'Improved environmental performance',
        'Increased efficiency',
        'Reduced waste and costs',
        'Enhanced reputation and credibility'
      ],
      industries: [
        'Manufacturing',
        'Construction',
        'Energy and utilities',
        'Transportation and logistics',
        'Chemical and pharmaceutical',
        'Food and beverage',
        'Mining and extraction',
        'Any organization with environmental impact'
      ],
      requirements: [
        'A commitment to environmental management',
        'Identification of environmental aspects and impacts',
        'Establishment of objectives and targets',
        'Implementation of operational controls',
        'Monitoring and measurement of environmental performance'
      ]
    },
    'iso-45001': {
      name: 'ISO 45001:2018',
      fullName: 'ISO 45001:2018 - Occupational Health and Safety Management System',
      description: 'ISO 45001:2018 is an international standard that provides a framework for organizations to manage and improve their occupational health and safety performance.',
      benefits: [
        'Improved safety and health performance',
        'Increased efficiency',
        'Reduced accidents and costs',
        'Enhanced reputation and credibility'
      ],
      industries: [
        'Construction',
        'Manufacturing',
        'Mining and extraction',
        'Transportation',
        'Healthcare',
        'Oil and gas',
        'Chemical processing',
        'Any organization with workplace hazards'
      ],
      requirements: [
        'A commitment to occupational health and safety management',
        'Identification of hazards and risks',
        'Establishment of objectives and targets',
        'Implementation of operational controls',
        'Monitoring and measurement of safety and health performance'
      ]
    },
    'iso-22000': {
      name: 'ISO 22000:2018',
      fullName: 'ISO 22000:2018 - Food Safety Management System',
      description: 'ISO 22000:2018 is an international standard that provides a framework for organizations to manage and improve their food safety performance.',
      benefits: [
        'Improved food safety performance',
        'Increased efficiency',
        'Reduced risks and costs',
        'Enhanced reputation and credibility'
      ],
      industries: [
        'Food manufacturing',
        'Food processing',
        'Restaurants and catering',
        'Food retail',
        'Food packaging',
        'Agricultural production',
        'Food transportation and storage',
        'Feed production'
      ],
      requirements: [
        'A commitment to food safety management',
        'Identification of hazards and risks',
        'Establishment of objectives and targets',
        'Implementation of operational controls',
        'Monitoring and measurement of food safety performance',
        'Communication and collaboration throughout the food supply chain'
      ]
    },
    'haccp': {
      name: 'HACCP',
      fullName: 'HACCP - Hazard Analysis Critical Control Points',
      description: 'HACCP Certificate is a certificate for the analysis of critical hazards in the food industry. It helps companies working in the food sector to preserve and handle food and apply this system in all stages of food preparation and packaging methods, in addition to paying attention to monitoring the effectiveness of cleaning and disinfection operations in the stages of the food manufacturing process. HACCP is a preventive system that is primarily concerned with the food safety file. This is done by identifying the risks that threaten the public safety of individuals, whether biological, chemical or physical, and is concerned with controlling these risks so that the product is produced in a safe and healthy manner.',
      benefits: [
        'Developing systems that care about the safety of food products within manufacturing companies',
        'Establishing guarantees for analyzing food hazards',
        'Defining high-precision specifications and requirements for food safety management',
        'Establishing standards that cover all areas of activities related to the food sector',
        'Increasing customer confidence in this company to ensure that it achieves quality standards',
        'The company\'s ability to achieve a competitive advantage among companies in the food sector',
        'Ensuring product safety to the satisfaction of customers'
      ],
      industries: [
        'Food manufacturing',
        'Food processing',
        'Restaurants and food service',
        'Dairy processing',
        'Meat and poultry processing',
        'Seafood processing',
        'Beverage production',
        'Food packaging'
      ],
      requirements: [
        'Conduct hazard analysis',
        'Identify critical control points (CCPs)',
        'Establish critical limits',
        'Monitor CCPs',
        'Establish corrective actions',
        'Establish verification procedures',
        'Establish record-keeping procedures'
      ]
    },
    'gmp': {
      name: 'GMP',
      fullName: 'GMP - Good Manufacturing Practice',
      description: 'GMP Good Manufacturing Practices treats the enterprise from all aspects, the basic characteristics it must have and the different standards for each production process. It determines and controls the quality and reliability of the production site, environment, tool – equipment, production process, personnel and raw materials. GMP, which covers the pharmaceutical, cosmetics and food sectors, also covers this sector by adopting the Cosmetics Act.',
      benefits: [
        'Ensures compliance with legal requirements and reduces possibility of facing penalty cases',
        'Customer requests can be met more quickly',
        'Increases awareness of production safety among employees',
        'Products are produced in the most accurate way and under appropriate conditions',
        'Increases the company\'s reliability image in public opinion',
        'Creates an advantage in international trade',
        'All stages of production are followed and product reaches user in a healthy way',
        'Relevant processes and employees are kept under control to prevent confusion and errors',
        'Gains competitive advantage in the market and increases employee motivation'
      ],
      industries: [
        'Pharmaceutical manufacturing',
        'Food and beverage production',
        'Cosmetic manufacturing',
        'Medical device manufacturing',
        'Dietary supplement production',
        'Biotechnology',
        'Chemical manufacturing',
        'Any regulated manufacturing'
      ],
      requirements: [
        'Establishment of quality management',
        'Staff structure and organizational structure',
        'Ensuring the standard in buildings, machinery, equipment and materials',
        'Documentation of business processes and application instructions',
        'Definition of principles for the introduction, processing, storage and distribution of raw materials',
        'Quality and efficiency control tests',
        'Approval of all activities and identification of authorized persons',
        'Complaint and product recall systems',
        'Investigation of errors and taking precautions',
        'Storage of samples, destruction of problematic or defective products',
        'Providing internal and external audit'
      ]
    }
  };

  const service = serviceDetails[serviceId] || serviceDetails['iso-9001'];


  return (
    <div className="service-detail-page">
      <div
        className="page-header"
        style={{
          background: '#2C4F7C',
          color: '#ffffff',
          padding: '40px 20px',
          textAlign: 'center',
          minHeight: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          animation: 'shimmer 2s infinite'
        }} />
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '1.8rem', margin: '0 0 6px 0', color: '#ffffff', fontWeight: 700 }}>
            {service.fullName}
          </h1>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.9)', margin: 0 }}>
            Professional certification services for {service.name}
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="service-detail-content">
            <div className="service-main-content">
              <div className="service-intro">
                <h2>About {service.name}</h2>
                <p className="description-text">{service.description}</p>
              </div>

              <div className="service-benefits">
                <h2>Benefits of Certification</h2>
                <ul className="benefits-list">
                  {service.benefits.map((benefit, index) => (
                    <li key={index}>
                      <span className="check-icon">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="service-who">
                <h2>Who Needs It?</h2>
                <p>This certification is ideal for organizations in the following industries:</p>
                <div className="industries-grid">
                  {service.industries.map((industry, index) => (
                    <div key={index} className="industry-tag">{industry}</div>
                  ))}
                </div>
              </div>

              <div className="service-requirements">
                <h2>Key Requirements</h2>
                <ul className="requirements-list">
                  {service.requirements.map((requirement, index) => (
                    <li key={index}>
                      <span className="bullet-icon">•</span>
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="service-sidebar">
              <div className="certificate-image-card">
                <h3>Certificate</h3>
                <div className="certificate-image-container">
                  <img
                    src={certificateImages[serviceId] || certificateImages['iso-9001']}
                    alt={`${service.name} Certificate`}
                    className="certificate-image"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="certificate-image-fallback" style={{ display: 'none' }}>
                    <span className="cert-icon">📜</span>
                    <p>Certificate Image</p>
                  </div>
                </div>
              </div>

              <div className="service-cta-card">
                <h3>Ready to Get Certified?</h3>
                <p>Contact us today to learn more about our certification process and get a free quote.</p>
                <div className="cta-buttons">
                  <Link to="/contact" className="btn btn-primary">Get Free Quote</Link>
                  <Link to="/application" className="btn btn-secondary">Apply Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
