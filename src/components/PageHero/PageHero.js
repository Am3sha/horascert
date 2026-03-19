import React from 'react';
import { Link } from 'react-router-dom';
import './PageHero.css';

const PageHero = ({
  title,
  subtitle,
  breadcrumb
}) => {
  return (
    <section className="page-hero">
      <div className="page-hero-content">
        {breadcrumb && (
          <div className="breadcrumb">
            {breadcrumb.map((item, index) => (
              <span key={index}>
                {index > 0 && <span className="breadcrumb-divider"> / </span>}
                {item.isCurrent ? (
                  <span className="breadcrumb-current">{item.label}</span>
                ) : (
                  <Link to={item.path} className="breadcrumb-link">{item.label}</Link>
                )}
              </span>
            ))}
          </div>
        )}

        <h1>{title}</h1>

        {subtitle && <p>{subtitle}</p>}

        <div className="page-hero-divider"></div>
      </div>

      {/* Animated floating shapes */}
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
    </section>
  );
};

export default PageHero;
