import React from 'react';
import './TopBar.css';

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="container">
        <div className="top-bar-content">
          <div className="top-bar-item">
            <span className="icon">📞</span>
            <span>+20 123 456 7890</span>
            <span className="separator">|</span>
            <span>+20 123 456 7891</span>
            <span className="separator">|</span>
            <span>+20 123 456 7892</span>
          </div>
          <div className="top-bar-item">
            <span className="icon">✉️</span>
            <span>info@yourcompany.com</span>
          </div>
          <div className="top-bar-item">
            <span className="icon">🕐</span>
            <span>Sat-Thu: 9:00am - 5:00pm</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

