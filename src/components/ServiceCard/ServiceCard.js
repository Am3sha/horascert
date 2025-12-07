import React from 'react';
import { Link } from 'react-router-dom';
import './ServiceCard.css';

const ServiceCard = ({ service }) => {
  return (
    <div className="service-card">
      <div className="service-image-container">
        <img src={service.icon} alt={service.name} className="service-image" />
      </div>
      <h3 className="service-name">{service.name}</h3>
      <p className="service-tagline">{service.tagline}</p>
      {service.description && (
        <p className="service-description">{service.description}</p>
      )}
      <Link to={`/services/${service.id}`} className="btn btn-secondary service-link">
        Learn More
      </Link>
    </div>
  );
};

export default ServiceCard;

