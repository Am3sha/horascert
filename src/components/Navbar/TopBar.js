import React from 'react';
import './TopBar.css';

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="container">
        <div className="top-bar-content">
          <div className="top-bar-item">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M18.3333 14.1V16.6C18.3333 17.1523 17.8856 17.6 17.3333 17.6H17.1667C9.34234 17.6 3 11.2577 3 3.43333V3.26667C3 2.71438 3.44772 2.26667 4 2.26667H6.5C6.96024 2.26667 7.35775 2.58034 7.46358 3.02775L8.15385 5.79231C8.24872 6.19178 8.09615 6.60833 7.76289 6.85833L6.5 7.8C7.5 10.3 9.7 12.5 12.2 13.5L13.1417 12.2371C13.3917 11.9038 13.8082 11.7513 14.2077 11.8462L16.9723 12.5364C17.4197 12.6423 17.7333 13.0398 17.7333 13.5V14.1H18.3333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>+20 123 456 7890</span>
            <span className="separator">|</span>
            <span>+20 123 456 7891</span>
            <span className="separator">|</span>
            <span>+20 123 456 7892</span>
          </div>
          <div className="top-bar-item">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3.33337 5.83333L9.16671 9.58333C9.69537 9.91667 10.3047 9.91667 10.8334 9.58333L16.6667 5.83333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="2.5" y="4.16667" width="15" height="11.6667" rx="2" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span>info@yourcompany.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

